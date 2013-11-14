// Site.layout.js

// Check if base layout is defined so it isn't overwritten
var Site = Site || {};

// Create child layout
Site.layout = (function ($) {
  "use strict";
  // Variables
  var defaults = {},
      init = function () {
        Site.utils.cl("Site.layout initialised");
      };

  // Return Public API
  return {
    init: init,
  };
}(jQuery));