// Site.js

// Check if namespace is defined
var Site = Site || {};

// Site namespace
//
// Base namespace for the Site framework
Site.init = (function ($) {
    "use strict";

    var modules = {};
    // Initialisation
    modules.init = function () {
      $(document).ready(function () {
        Site.utils.init();
      });
    };

    // Automatically call init function
    return modules.init();

}(jQuery));