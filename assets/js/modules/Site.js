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
        Site.layout.init();
        Site.events.init();
        Site.showhide.init();
        Site.forms.init();
        Site.images.init();
        Site.carousel.init();
        Site.analytics.init();
      });
    };

    // Automatically call init function
    return modules.init();

}(jQuery));