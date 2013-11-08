// Site.images.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.images = (function ($) {
    "use strict";
    // Variables
    var defaults { },

        // Load any images that are wrapped in <noscript> tags and marked for loading
        // after page load
        // Dependency: ImagesLoaded jQuery plugin
        loadLazyImages = function () {

          $('.lazyLoader').each(function () {
            var $thisSprite = $(this),
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
                  $spriteImageHolder.prepend(imageToAdd);
                  $thisSprite.removeClass('lazyLoader');
                  Site.utils.cl("Image loaded and displayed");
                };

            imageToAdd.src = imageSrc;
            $(imageToAdd).imagesLoaded(displayImage);

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