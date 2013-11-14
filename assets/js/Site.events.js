// Site.events.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.events = (function ($) {
    "use strict";
    // Variables
    var defaults = {},
        /* Use fastclick plugin to remove tap delay on touch devices */
        setFastTapEvents = function () {
          if(FastClick){
            FastClick.attach(document.body);
          }
        },

        // Bind delegate events
        bindDelegateEvents = function () {
          var $body = $('body');

          // Handle 'layoutChange' event bubbled to <body> element
          $body.on('layoutchange', function () {
            Site.utils.cl('layoutchange on body');

            // Update any lazy-load images that may now be visible
            if(Site.images.updateLazyImages !== undefined) {
              Site.images.updateLazyImages();
            }
          });
        },

        init = function () {
          Site.utils.cl("Site.events initialised");
          //setFastTapEvents();
          bindDelegateEvents();
        };

    // Return Public API
    return {
      init: init
    };

}(jQuery));