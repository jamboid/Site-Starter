// Site.images.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.images = (function ($) {
  "use strict";
  // Variables
  var defaults = { },
      $lazyLoadImages = $('.lazyLoader'),

      // lazyImage class
      lazyImage = function (sprite) {
        var $thisSprite = $(sprite),
            loadingMethod = $thisSprite.data('loading'),
            $spriteImageDataSource = $thisSprite.find('noscript').eq(0),
            $spriteImageHolder = $spriteImageDataSource.parent(),
            imageSrc = $spriteImageDataSource.data('src'),
            imageWidth = $spriteImageDataSource.data('width'),
            imageAlt = $spriteImageDataSource.data('alt'),
            imageToAdd = new Image(),

            displayImage = function () {
              if (imageAlt === "") {
                imageAlt = "gallery image";
              }
              $(imageToAdd).attr('width', imageWidth).attr('alt', imageAlt);
              $spriteImageHolder.prepend(imageToAdd).addClass('imageLoaded');
              // Need to allow browser a moment to process the addition of the image before diplaying it
              window.setTimeout(function () {$spriteImageHolder.addClass('imageDisplayed');}, 100);
              Site.utils.cl("Image loaded and displayed");
            },

            getImageFile = function () {
              imageToAdd.src = imageSrc;
              $(imageToAdd).imagesLoaded(displayImage);
            },

            loadImageIfInView = function () {
              if(Site.utils.isElementInView($thisSprite)){
                getImageFile();
              }
            };

            this.bindViewEvents = function () {
              // If image is set to load/display on user click/tap
              if(loadingMethod === 'click') {
                $thisSprite.bind('tap', function () {
                  if (!$thisSprite.hasClass('imageLoaded')) {
                    getImageFile();
                  }
                });
              }
              // If image is set to display when container is in view
              else if (loadingMethod === 'view') {

                // Check image is in view on page load
                   // Check if image comes into view on scroll
                $(window).on('scroll debouncedresize', function () {
                  if (!$thisSprite.hasClass('imageLoaded')) {
                    loadImageIfInView();
                  }
                });
              }
              // Otherwise load the image on page load
              else {
                getImageFile();
              }

              // Bind to custom event so we can load any images moved into view when e.g. a show/hide control is closed/opened
              $thisSprite.on('layoutUpdate', function () {
                Site.utils.cl('listening for layoutUpdate event');
                loadImageIfInView();
              });
            };
      },


      // Load any images that are wrapped in <noscript> tags and marked for loading after page load
      // Dependency: ImagesLoaded jQuery plugin
      buildLazyImages = function () {
        $lazyLoadImages.each(function () {
          var newLazyImage = new lazyImage(this);
          newLazyImage.bindViewEvents();
        });
      },

      // Exposed function to update images when the page layout changes
      updateLazyImages = function () {
        $lazyLoadImages.trigger('layoutUpdate');
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