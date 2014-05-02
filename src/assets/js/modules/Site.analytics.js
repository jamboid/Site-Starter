// Site.analytics.js

// Check if base namespace is defined
var Site = Site || {};

// Site.analytics namespace
Site.analytics = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

     var defaults = {},

  ///////////////
  // Functions //
  ///////////////

        /**
         * Track a virtual page view
         * @function
         * @parameter {string} url - The url you want to track as a page view
         */
        trackPageView = function (url) {
          var thisURL = url;

          if (typeof ga !== 'undefined'){ // Using Google Universal Analytics

            ga('send','pageview',thisURL);

            /*
            Site.utils.cl("Page view tracked");
            Site.utils.cl('Tracked URL:');
            Site.utils.cl(thisURL);
            */

          } else if (typeof _gaq !== 'undefined'){ // Using Asynchronous Analytics

            _gaq.push(['trackPageview'], url);

            /*
            Site.utils.cl("Page view tracked");
            Site.utils.cl('Tracked URL:');
            Site.utils.cl(thisURL);
            */

          } else {

            /*
            Site.utils.cl('Tracked URL:');
            Site.utils.cl(thisURL);
            */

            Site.utils.cl("Google Analytics not available");
          }
        },

        /**
         * Track an in-page event as a Google Analytics Page Event
         * @function
         * @parameter {string} category
         * @parameter {string} eventType
         * @parameter {string} detail
         */
        trackPageEvent = function (category, eventType, detail) {
          var thisCategory = category,
              thisEventType = eventType,
              thisDetail = detail;

              if(typeof ga !== 'undefined'){ // Using Google Universal Analytics

                ga('send', 'event' , thisCategory, thisEventType, thisDetail);

                /*
                Site.utils.cl("Page Event tracked");
                Site.utils.cl('Event Category:');
                Site.utils.cl(thisCategory);
                Site.utils.cl('Event Type:');
                Site.utils.cl(thisEventType);
                Site.utils.cl('Event Detail:');
                Site.utils.cl(thisDetail);
                */

              } else if (typeof _gaq !== 'undefined'){ // Using Asynchronous Analytics

                _gaq.push(['_trackEvent', thisCategory, thisEventType, thisDetail]);

                /*
                Site.utils.cl("Page Event tracked");
                Site.utils.cl('Event Category:');
                Site.utils.cl(thisCategory);
                Site.utils.cl('Event Type:');
                Site.utils.cl(thisEventType);
                Site.utils.cl('Event Detail:');
                Site.utils.cl(thisDetail);
                */

              } else {

                /*
                Site.utils.cl("Page Event tracked");
                Site.utils.cl('Event Category:');
                Site.utils.cl(thisCategory);
                Site.utils.cl('Event Type:');
                Site.utils.cl(thisEventType);
                Site.utils.cl('Event Detail:');
                Site.utils.cl(thisDetail);
                */

                Site.utils.cl("Google Analytics not available");
              }
        },

        /**
         * Track PDF views, passing the path to the PDF as the URL
         * @function
         */
        trackPDFLinks = function () {
          $("a[href$='pdf']").on('click', function () {
            Site.utils.cl('PDF link tracked');
            var thisURL = $(this).attr('href');
            trackPageView(thisURL);
          });
        },


        /**
         * Set Custom variable for Responsive Design layout
         * @function
         * @param {int} customVarNumber - set the number of the custom variable slot to use
         */
        trackPageLayout = function (customVarNumber) {

          var screenWidth = $(window).width(),
              layoutCategory;

          //Site.utils.cl(screenWidth);

          // Custom set of conditions to set variable value
          // ** CUSTOMISE THIS BASED ON EACH SITE'S BREAKPOINTS **
          if (screenWidth > 768 ) {
            layoutCategory = "Desktop";
          } else if (screenWidth > 520) {
            layoutCategory = "Tablet";
          } else {
            layoutCategory = "Phone";
          }

          if (typeof ga !== 'undefined') {
            // This needs to be configured to match the Custom Dimension setup
            // in your Universal Analytics account
            ga('set', 'dimension1', layoutCategory);
            //Site.utils.cl("Layout custom dimension set for this page view (Universal Analytics)");

          } else if (typeof _gaq !== 'undefined') {
            _gaq.push(['_setCustomVar', customVarNumber , 'Layout', layoutCategory, 3]);
            //Site.utils.cl("Layout custom variable set for this page view (Trad Analytics)");
          } else {
            //Site.utils.cl('Google Analytics not available');
          }

          //Site.utils.cl("Breakpoint custom variable set for this page view");
        },

        /**
         * Call custom functions before standard Page View call is made
         * - e.g. Set Custom variables to pass to server with page view call
         * This function should be called before the default 'trackPageView' function
         * call in the on-page Google Analytics script
         * @function
         */
        trackPageLoadInformation = function () {
          // Call custom functions
          trackPageLayout(1); // Set parameter to number of custom variable configured in Google Analytics
        },

        /**
         * Delete a Google Analytics custom variable
         * @function
         * @parameter {int} variablePosition - The position of the custom variable (1-5)
         */
        deleteCustomVariable = function (variablePosition) {
          if (typeof ga !== 'undefined'){ // Using Google Universal Analytics

          } else if (typeof _gaq !== 'undefined'){ // Using Asynchronous Analytics
            _gaq.push(['_deleteCustomVar', variablePosition]);
          }
        },

        /**
         * Initialise this module
         * @function
         */
        init = function () {
            Site.utils.cl("Site.analytics.init called");
            trackPDFLinks();
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
      init: init,
      trackPageView: trackPageView,
      trackPageEvent: trackPageEvent,
      trackPageLoadInformation: trackPageLoadInformation,
      deleteCustomVariable: deleteCustomVariable
    };
}(jQuery));
