// Site namespace
//
// Base namespace for the Site framework
var Site = Site || {};

// Base init function that calls itself and then initialises the modules
Site.init = (function ($) {
    "use strict";

  ///////////////
  // Polyfills //
  ///////////////

  ////////////////////////
  // Initialise Modules //
  ////////////////////////

    // Modules object
    var Modules = {};

    /**
     * Initialise the modules used in this project
     * @function
     */
    Modules.init = function () {
      $(document).ready(function () {
        Site.utils.init();
        Site.events.init();
        Site.showhide.init();
        Site.navigation.init();
        Site.images.init();
        Site.media.init();
        Site.carousel.init();
        Site.scroller.init();
        Site.filter.init();
        Site.analytics.init();
        Site.loading.init();
      });
    };

    // Automatically call Modules.init function
    return Modules.init();

}(jQuery));