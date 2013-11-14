// Site.images.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.images = (function ($) {
  "use strict";
  // Variables
  var defaults = { },
      $lazyLoadImages = $('.lazyLoader'),

      // Display a pre-loaded lazy image, adding atrributes set on
      // the sprite container
      displaySpriteImageInContainer = function (container, image) {
        var $thisContainer = $(container),
            $thisImage = $(image),
            imageAlt = $thisContainer.data('alt') || 'image',
            imageWidth = $thisContainer.data('width') || '';

        $thisImage.attr('width', imageWidth).attr('alt', imageAlt);
        $thisContainer.prepend($thisImage).addClass('imageLoaded');
        // Need to allow browser a moment to process the addition of the image before diplaying it
        window.setTimeout(function () {$thisContainer.addClass('imageDisplayed');}, 100);
        Site.utils.cl("Image loaded and displayed");
      },

      // Create and preload a new image based on a sprite src
      // then call a function once the image is loaded into memory
      getSpriteImageFile = function (sprite) {
        var $thisSprite = sprite,
            thisImageUrl = $thisSprite.data('src'),
            imageToAdd = new Image();

            imageToAdd.src = thisImageUrl;
            $(imageToAdd).imagesLoaded(displaySpriteImageInContainer($thisSprite, imageToAdd));
      },

      loadSpriteImageIfInView = function (sprite) {
        var $thisSprite = sprite;
        if(Site.utils.isElementInView($thisSprite)){
          getSpriteImageFile($thisSprite);
        }
      },

      // lazyImage class
      buildLazyImage = function (sprite) {
        var $thisSprite = $(sprite),
            loadingMethod = $thisSprite.data('loading');

        if(loadingMethod === 'click') {
          $thisSprite.bind('tap', function () {
            if (!$thisSprite.hasClass('imageLoaded')) {
              getSpriteImageFile($thisSprite);
            }
          });
        }
        // If image is set to display when container is in view
        else if (loadingMethod === 'view') {
          // Load image if it is in view
          loadSpriteImageIfInView($thisSprite);

          // Load image if it comes into view on scroll or window resize
          $(window).on('scroll debouncedresize', function () {
            if (!$thisSprite.hasClass('imageLoaded')) {
              loadSpriteImageIfInView($thisSprite);
            }
          });
        }
        // Otherwise load the image on page load
        else {
          getSpriteImageFile($thisSprite);
        }

        // Bind to custom event so we can load any images moved into view when e.g. a show/hide control is closed/opened
        $thisSprite.on('layoutUpdate', function () {
          Site.utils.cl('listening for layoutUpdate event');
          loadSpriteImageIfInView($thisSprite);
        });
      },

      // Set up all lazy images on the page
      buildLazyImages = function () {
        $lazyLoadImages.each(function () {
          buildLazyImage(this);
        });
      },

      // Exposed function to update images when the page layout changes
      // - checks if image is loaded already
      updateLazyImages = function () {
        $lazyLoadImages.each(function () {
          var $thisSprite = $(this);
          if(!$thisSprite.hasClass('imageLoaded') && $thisSprite.data('loading') === 'view' ) {
            $thisSprite.trigger('layoutUpdate');
          }
        });
      },

      init = function () {
        Site.utils.cl("Site.images initialised");
        buildLazyImages();
      };

  // Return Public API
  return {
    init: init,
    updateLazyImages: updateLazyImages
  };

}(jQuery));