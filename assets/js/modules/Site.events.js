// Site.events.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.events = (function ($) {
    "use strict";
    // Variables
    var
        /* Use fastclick plugin to remove tap delay on touch devices */
        setFastTapEvents = function () {
          if(typeof FastClick !== undefined){
            //FastClick.attach(document.body);
          }
        },

        // Bind delegated events
        bindDelegatedEvents = function () {
          var $body = $('body');

          // Handle 'layoutChange' event bubbled to <body> element
          $body.on('layoutchange', function () {
            Site.utils.cl('layoutchange on body');

            // Update any lazy-load images that may now be visible
            if(Site.images.updateLazyImages !== undefined) {
              Site.images.updateLazyImages();
            }
          });

          // Handle 'click' event on show/hide control
          $body.on('click','[data-plugin=showhide] [data-action=toggle]', function (e) {
            e.preventDefault();
            var control = $(this).closest('[data-plugin=showhide]'),
                config = $(control).data('plugin-config');

            Site.showhide.toggleControl(control, config);
          });

          // Handle click on 'click-to-load' lazy image
          $body.on('click','.lazyLoader[data-loading=click]', function (e) {
            e.preventDefault();
            Site.images.loadClickedImage(this);
          });

          $body.on('click','[data-plugin=carousel] .slide a', function (e) {
            e.preventDefault();
            $(e.target).trigger('toggleCarousel');
          });

          // Handle page scroll or (debounced) resize
          $(window).on('scroll debouncedresize', function () {
            // Load any lazy images that are now in view
            if(Site.images.updateLazyImages !== undefined) {
              Site.images.updateLazyImages();
            }
          });
        },

        init = function () {
          Site.utils.cl("Site.events initialised");
          setFastTapEvents();
          bindDelegatedEvents();
        };

    // Return Public API
    return {
      init: init
    };

}(jQuery));