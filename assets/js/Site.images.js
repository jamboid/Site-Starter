// Site.images.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.images = (function ($) {
  "use strict";
  // Variables
  var defaults = { },

      // Load any images that are wrapped in <noscript> tags and marked for loading after page load
      // Dependency: ImagesLoaded jQuery plugin
      loadLazyImages = function () {

        $('.lazyLoader').each(function () {
          var $thisSprite = $(this),
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
              };

          // If image is set to load/display on user click/tap
          if(loadingMethod === 'click') {

            $thisSprite.bind('tap', function () {
              if (!$thisSprite.hasClass('imageLoaded')) {
                imageToAdd.src = imageSrc;
                $(imageToAdd).imagesLoaded(displayImage);
              }
            });
          }
          // If image is set to display when container is in view
          else if (loadingMethod === 'view') {

            // Check image is in view on page load
            if(Site.utils.isElementInView($thisSprite)){
              imageToAdd.src = imageSrc;
              $(imageToAdd).imagesLoaded(displayImage);
            }

            // Add event listener for page loading to check if image is in view
            $(window).on('scroll', function () {
              if (!$thisSprite.hasClass('imageLoaded')) {
                if(Site.utils.isElementInView($thisSprite)){
                  imageToAdd.src = imageSrc;
                  $(imageToAdd).imagesLoaded(displayImage);
                } else {
                  //Site.utils.cl("Image not in view");
                }
              }
            });
          }
          // Otherwise load the image on page load
          else {
            imageToAdd.src = imageSrc;
            $(imageToAdd).imagesLoaded(displayImage);
          }
        });
      },

      init = function () {
        Site.utils.cl("Site.images initialised");
        loadLazyImages();
      };

  // Return Public API
  return {
    init: init
  };

}(jQuery));