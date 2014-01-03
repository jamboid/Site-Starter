// Site.events.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.events = (function ($) {
    "use strict";
    // Variables
    var
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

          // Handle page scroll or (debounced) resize
          $(window).on('scroll debouncedresize', function () {
            // Load any lazy images that are now in view
            if(Site.images.updateLazyImages !== undefined) {
              Site.images.updateLazyImages();
            }
          });

          // Handle 'click' event on show/hide control
          $body.on('click','[data-plugin=showhide] [data-action=toggle]', function (e) {
            e.preventDefault();
            $(e.target).trigger('toggleShowHide');
          });

          // Handle click on 'click-to-load' lazy image
          $body.on('click','.lazyLoader[data-loading=click]', function (e) {
            e.preventDefault();
            $(e.target).trigger('loadLazyImage');
          });

          // Handle click on Carousel slide
          $body.on('click','[data-plugin=carousel] .slide a', function (e) {
            e.preventDefault();
            $(e.target).trigger('toggleAutoCycle');
          });

          // Handle click on Mobile Main Nav Menu toggle
          $body.on('click','.cpMainNav .navTitle a', function (e) {
            e.preventDefault();
            $(e.target).trigger('toggleMainNav');
          });

        },

        init = function () {
          Site.utils.cl("Site.events initialised");
          bindDelegatedEvents();
        };

    // Return Public API
    return {
      init: init
    };

}(jQuery));