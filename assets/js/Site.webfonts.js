// Site.webfonts.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.webfonts = (function ($) {
    "use strict";
    var // Set a body class to override the wf-loader script hiding the content
        setDisplayOverride = function () {
          $('body').addClass('showText');
        },

        // Give the wf-loader script 5 seconds to begin loading any webfonts used
        // and then call the setDisplayOverride function
        setLoadedFlag = function (delay) {
          setTimeout(setDisplayOverride, delay);
        },

        init = function () {
          Site.utils.cl("Site.webfonts initialised");
          setLoadedFlag(5000);
        };

    // Return Public API
    return {
      init: init
    };

}(jQuery));