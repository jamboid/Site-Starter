// Site.namespace.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.namespace = (function ($) {
    "use strict";
    // Variables
    var init = function () {
          Site.utils.cl("Site.namespace initialised");
        };

    // Return Public API
    return {
      init: init
    };

}(jQuery));