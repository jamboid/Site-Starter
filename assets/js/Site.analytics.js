// Site.analytics.js

// Check if base namespace is defined
var Site = Site || {};

// Site.analytics namespace
Site.analytics = (function ($) {
    "use strict";
        // Track a virtual page view
        // - handles Asynchronous and Universal Analytics
    var trackPageView = function (url) {
          var thisURL = url;

          if (typeof ga != 'undefined'){ // Using Google Universal Analytics

            ga('send','pageview',url);

            /*
            Site.utils.cl("Page view tracked");
            Site.utils.cl('Tracked URL:');
            Site.utils.cl(thisURL);
            */

          } else if (typeof _gaq != 'undefined'){ // Using Asynchronous Analytics

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

              if(typeof ga != 'undefined'){ // Using Google Universal Analytics

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

              } else if (typeof _gaq != 'undefined'){ // Using Asynchronous Analytics

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
            trackPageView(thisURL)
          });
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
        trackPageEvent: trackPageEvent
    };

}(jQuery));
