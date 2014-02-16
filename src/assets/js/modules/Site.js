// Site namespace
//
// Base namespace for the Site framework
var Site = Site || {};

// Base init function that calls itself and then initialises the modules
Site.init = (function ($) {
    "use strict";

    // Initialise Modules
    var modules = {};

    modules.init = function () {
      $(document).ready(function () {
        Site.utils.init();
        Site.events.init();
        Site.showhide.init();
        Site.images.init();
        Site.media.init();
        Site.carousel.init();
        Site.scroller.init();
        Site.analytics.init();
      });
    };

    // Automatically call init function
    return modules.init();

}(jQuery));