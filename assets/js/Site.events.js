// Site.events.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.events = (function ($) {
    "use strict";
    // Variables
    var setFastTapEvents = function () {
          if(FastClick){
            FastClick.attach(document.body);
          }
        },

        init = function () {
          Site.utils.cl("Site.events initialised");
          setFastTapEvents();
        };

    // Return Public API
    return {
      init: init
    };

}(jQuery));