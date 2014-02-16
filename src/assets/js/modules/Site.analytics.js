// Site.analytics.js

// Check if base namespace is defined
var Site = Site || {};

// Site.analytics namespace
Site.analytics = (function ($) {
    "use strict";
     var defaults = {},

        // Track a virtual page view
        // - handles Asynchronous and Universal Analytics
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

        // Track an in-page event
        // - handles Asynchronous and Universal Analytics
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

        // Track PDF views, passing the path to the PDF as the URL
        trackPDFLinks = function () {
          $("a[href$='pdf']").on('click', function () {
            Site.utils.cl('PDF link tracked');
            var thisURL = $(this).attr('href');
            trackPageView(thisURL);
          });
        },


        // Set Custom variable for Responsive Design layout
        trackPageLayout = function () {

          var screenWidth = $(window).width(),
              layoutCategory;

          //Site.utils.cl(screenWidth);

          // Custom set of conditions to set variable value
          if (screenWidth > 768 ) {
            layoutCategory = "Desktop";
          } else if (screenWidth > 520) {
            layoutCategory = "Tablet";
          } else {
            layoutCategory = "Phone";
          }

          //Site.utils.cl(layoutCategory);

          if (ga !== 'undefined') {
            // This needs to be configured to match the Custom Dimension setup
            // in your Universal Analytics account
            ga('set', 'dimension1', layoutCategory);
            //Site.utils.cl("Layout custom dimension set for this page view (Universal Analytics)");

          } else if (typeof _gaq !== 'undefined') {
            _gaq.push(['_setCustomVar', 1 , 'Layout', layoutCategory, 3]);
            //Site.utils.cl("Layout custom variable set for this page view (Trad Analytics)");
          } else {
            //Site.utils.cl('Google Analytics not available');
          }

          //Site.utils.cl("Breakpoint custom variable set for this page view");
        },

        // Call custom functions before standard Page View call is made
        // - e.g. Set Custom variables to pass to server with page view call
        // This function should be called before the default 'trackPageView' function
        // call in the on-page Google Analytics script
        trackPageLoadInformation = function () {
          // Call custom functions
          trackPageLayout();
        },

        // Delete custom variable
        deleteCustomVariable = function (index) {
          if (typeof ga !== 'undefined'){ // Using Google Universal Analytics

          } else if (typeof _gaq !== 'undefined'){ // Using Asynchronous Analytics
            _gaq.push(['_deleteCustomVar', index]);
          }
        },

        // Initialisation
        init = function () {
            Site.utils.cl("Site.analytics.init called");
            trackPDFLinks();
        };

    // Return Public API
    return {
      init: init,
      trackPageView: trackPageView,
      trackPageEvent: trackPageEvent,
      trackPageLoadInformation: trackPageLoadInformation,
      deleteCustomVariable: deleteCustomVariable
    };
}(jQuery));
