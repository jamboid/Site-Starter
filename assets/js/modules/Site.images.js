// Site.images.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.images = (function ($) {
  "use strict";

  ///////////////
  // Variables //
  ///////////////

  var defaults = { },
      smartImageSel = '[data-image-load]',

  //////////////////
  // Constructors //
  //////////////////

      /**
       * Creates a SmartImage object to manage a lazy-loaded image component
       * @constructor
       */
      SmartImage = function (elem) {
        var $thisSprite = $(elem),
            $placeholderImage = $thisSprite.find('> img').eq(0),
            loadingMethod = $thisSprite.data('image-load'),
            imageType = $thisSprite.data('image-type') || 'inline',
            imageTargetSel = $thisSprite.data('image-target') || null,
            imageLoaded = false,
            imageReloader = false,
            imageToAdd = new Image(),

            // Display a pre-loaded lazy image, adding atrributes set on
            // the sprite container
            displaySpriteImageInContainer = function (image) {
              var $thisImage = $(image),
                  imageAlt = $thisSprite.data('alt') || 'image';

              $thisImage.attr('alt', imageAlt);

              if($placeholderImage.length > 0) {
                $placeholderImage.attr('src', $thisImage.attr('src')).removeClass('placeholder').removeAttr('width').removeAttr('height');
              } else {

                if(imageTargetSel !== null){
                  $thisSprite.parent().find(imageTargetSel).eq(0).append($thisImage);
                } else {
                  $thisSprite.prepend($thisImage);
                }

                $placeholderImage = $thisImage;
              }

              $thisSprite.addClass('imageLoaded');
              // Need to allow browser a moment to process the addition of the image before displaying it
              window.setTimeout(function () {$thisSprite.addClass('imageDisplayed');}, 100);
              imageLoaded = true;
            },

            /**
             * Display a lazy-loading image as a CSS background image
             * @function
             * @parameter path (String)
             */
            displaySpriteImageAsBackground = function (path) {
              var spriteImage = 'url(' + path + ')',
                  spriteBackgroundPos = $thisSprite.data('position'),
                  spriteBackgroundColor = $thisSprite.data('background-color');

              $thisSprite.addClass('imageLoaded').css('background-image', spriteImage).addClass('flexImage').addClass(spriteBackgroundPos).css('background-color', spriteBackgroundColor) ;
              imageLoaded = true;
            },

            /**
             * Create and preload a new image based on a sprite src
             * then call a function once the image is loaded into memory
             * @function
             */
            getSpriteImageFile = function () {
              var thisImageData = 'src-' + Site.layout.getResponsiveSize(),
                  thisImageUrl = $thisSprite.data(thisImageData);

                  imageToAdd.src = thisImageUrl;

                if(imageType === 'inline') {
                  $(imageToAdd).imagesLoaded(displaySpriteImageInContainer(imageToAdd)).done(function() { $.publish('layout/change'); });
                } else if (imageType === 'background') {
                  $(imageToAdd).imagesLoaded(displaySpriteImageAsBackground(thisImageUrl)).done(function() { $.publish('layout/change'); });
                }
            },

            /**
             * Check if a sprite is in view, and if so load and display it
             * @function
             */
            loadSpriteImageIfInView = function () {
              if(imageType === 'inline') {
                if(Site.utils.isElementInView($thisSprite) && (imageLoaded === false || imageReloader === true)){
                  getSpriteImageFile($thisSprite);
                }
              } else if (imageType === 'background') {
                if(Site.utils.isElementInView($thisSprite.parent()) && (imageLoaded === false || imageReloader === true)){
                  getSpriteImageFile($thisSprite);
                }
              }
            },

            /**
             * Bind custom message events for this object
             * @function
             */
            bindCustomMessageEvents = function () {
              // Load lazy images
              $thisSprite.on('loadLazyImage', function (e) {
                e.preventDefault();
                if(imageLoaded === false){
                  loadSpriteImageIfInView($thisSprite);
                }
              });

              $thisSprite.on('reloadImage', function (e) {
                e.preventDefault();
                if(imageLoaded === true && imageReloader === true){
                  getSpriteImageFile($thisSprite);
                }
              });
            },

            /**
             * Subscribe object to Global Messages
             * @function
             */
            subscribeToEvents = function () {
              if(loadingMethod !== 'click' && loadingMethod !== 'pageload') {
                $.subscribe('page/scroll', function () {$(this).trigger('loadLazyImage');},$thisSprite);
                $.subscribe('page/resize', function () {$(this).trigger('loadLazyImage');},$thisSprite);
                $.subscribe('layout/change', function () {$(this).trigger('loadLazyImage');},$thisSprite);
                $.subscribe('page/load', function () {$(this).trigger('loadLazyImage');},$thisSprite);
              }

              $.subscribe('breakpoint/change', function () {$(this).trigger('reloadImage');},$thisSprite);
            };

        /**
         * Initialise this object
         * @function
         */
        this.init = function () {

          if($thisSprite.hasClass('reLoader')) {
            imageReloader = true;
          }

          if(loadingMethod === 'click') {
            // Do nothing
          }
          // If image is set to display when container is in view
          else if (loadingMethod === 'view') {

            loadSpriteImageIfInView($thisSprite);

            // Do nothing - message on pageload will handle these
            // if(Modernizr.touch){
            //   getSpriteImageFile($thisSprite);
            // } else {
            //   getSpriteImageFile($thisSprite);
            // }

          }
          // Otherwise load the image on page load
          else if (loadingMethod === 'pageload') {
            getSpriteImageFile($thisSprite);
          }

          bindCustomMessageEvents();
          subscribeToEvents();
        };
      },

      /**
       * Creates an SmartImageManager object to manage dynamic creation of SmartImage objects
       * @constructor
       */
      SmartImageManager = function () {

        var

        /**
         * Initalise new SmartImage objects to manage newly created smart image components
         * @function
         */
        createNewSmartImageObjects = function (elems) {
          var newSmartImages = $(elems).find(smartImageSel);
          $(newSmartImages).each(function () {
            var thisSmartImage = new SmartImage(this);
            thisSmartImage.init();
          });
        },

        /**
         * Subscribe object to Global Messages
         * @function
         */
        subscribeToEvents = function () {
          $.subscribe('content/change', function (topic,data) { createNewSmartImageObjects(data); });
        };

        /**
         * Initialise this object
         * @function
         */
        this.init = function () {
          subscribeToEvents();
        };
      },



  ///////////////
  // Functions //
  ///////////////

      /**
       * Create delegate event listeners for this module
       * @function
       */
      delegateEvents = function () {
        Site.events.delegate('click', '.lazyLoader[data-image-load=click]', 'loadLazyImage');
      },

      /**
       * init function for this module
       * @function
       */
      init = function () {
        Site.utils.cl("Site.images initialised");

        $(smartImageSel).each(function () {
          var thisSmartImage = new SmartImage(this);
          thisSmartImage.init();
        });

        // Create a new SmartImageManager object
        var thisSmartImageManager = new SmartImageManager();
        thisSmartImageManager.init();

        delegateEvents();
      };

  ///////////////////////
  // Return Public API //
  ///////////////////////

  return {
    init: init
  };

}(jQuery));