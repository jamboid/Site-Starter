// Site.images.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.images = (function ($) {
  "use strict";
  // Variables
  var defaults = { },
      $lazyLoadImages = $('.lazyLoader'),

      // LazyImage object
      LazyImage = function (elem) {
        var $thisSprite = $(elem),
            loadingMethod = $thisSprite.data('loading'),

            // Display a pre-loaded lazy image, adding atrributes set on
            // the sprite container
            displaySpriteImageInContainer = function (image) {
              var $thisContainer = $thisSprite,
                  $thisImage = $(image),
                  imageAlt = $thisContainer.data('alt') || 'image',
                  imageWidth = $thisContainer.data('width') || '';

              $thisImage.attr('width', imageWidth).attr('alt', imageAlt);
              $thisContainer.prepend($thisImage).addClass('imageLoaded');
              // Need to allow browser a moment to process the addition of the image before diplaying it
              window.setTimeout(function () {$thisContainer.addClass('imageDisplayed');}, 100);
            },

            // Create and preload a new image based on a sprite src
            // then call a function once the image is loaded into memory
            getSpriteImageFile = function () {
              var thisImageUrl = $thisSprite.data('src'),
                  imageToAdd = new Image();

                  imageToAdd.src = thisImageUrl;
                  $(imageToAdd).imagesLoaded(displaySpriteImageInContainer(imageToAdd));
            },

            loadSpriteImageIfInView = function () {
              if(Site.utils.isElementInView($thisSprite)){
                getSpriteImageFile($thisSprite);
              }
            },

            // lazyImage class
            buildLazyImage = function () {
              if(loadingMethod === 'click') {
                // Do nothing
              }
              // If image is set to display when container is in view
              else if (loadingMethod === 'view') {
                // Load image if it is in view
                loadSpriteImageIfInView($thisSprite);
              }
              // Otherwise load the image on page load
              else {
                getSpriteImageFile($thisSprite);
              }

              bindCustomMessageEvents();
              subscribeToEvents();
            },

            // Add event handler for main navigation toggle
            bindCustomMessageEvents = function () {
              $thisSprite.on('loadLazyImage', function (e) {
                e.preventDefault();
                if (!$thisSprite.hasClass('imageLoaded')) {
                  loadSpriteImageIfInView();
                }
              });
            },

            subscribeToEvents = function () {

              Site.utils.cl(loadingMethod);

              if(loadingMethod !== 'click') {
                $.subscribe('layoutChange', function () {$(this).trigger('loadLazyImage')},$thisSprite);
              }
            },

            delegateEvents = function () {
              Site.events.delegatedEventFactory('click', '.lazyLoader[data-loading=click]', 'loadLazyImage');
            };

        this.init = function () {
          buildLazyImage();
          delegateEvents();
          subscribeToEvents();
        };
      },

      setLazyLoadImages = function () {
        $lazyLoadImages.each(function () {
          var thisLazyImage = new LazyImage(this);
          thisLazyImage.init();
        });
      },

      init = function () {
        Site.utils.cl("Site.images initialised");
        setLazyLoadImages();
      };

  // Return Public API
  return {
    init: init
  };

}(jQuery));