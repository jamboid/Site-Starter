// Site.loading.js

/**
 * Site
 * @namespace
 */
var Site = Site || {};

/**
 * Site.loading
 * @namespace
 */
Site.loading = (function ($) {
  "use strict";

  ///////////////
  // Variables //
  ///////////////

    var $body = $('body'),
        loadDelay = 100,

  //////////////////
  // Constructors //
  //////////////////

      /**
       * Creates a LoadingManager object to manage display of the page once loaded.
       * @constructor
       */
      LoadingManager = function () {

        var

        /**
         * @function showPageContent
         * Adds a class to the HTML body tag to allow control display of the page
         */
        pageIsLoaded = function () {
          $body.addClass('pageLoaded');
          $.publish('page/loaded');
        };

        /**
         * @function this.init
         * init function for this object
         */
        this.init = function () {
          // Set flags that page has loaded after a defined delay
          var pageLoadTimeout = setTimeout(pageIsLoaded,loadDelay);
        };
      },

  ///////////////
  // Functions //
  ///////////////

      /**
       * @function init
       * init function for this module
       */
      init = function () {
        Site.utils.cl("Site.loading initialised");

        // Initialise LoadingManager object
        var thisLoadingManager = new LoadingManager(this);
        thisLoadingManager.init();
      };

  ///////////////////////
  // Return Public API //
  ///////////////////////

  return {
    init: init
  };

}(jQuery));