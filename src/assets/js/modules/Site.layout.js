// Site.layout.js

// Check if base layout is defined so it isn't overwritten
var Site = Site || {};

// Create child layout
Site.layout = (function ($) {
  "use strict";

  ///////////////
  // Variables //
  ///////////////

  var responsiveSize = 'small',


  /////////////
  // Classes //
  /////////////

      // Responsive Layout Manager
      ResponsiveLayoutManager = function () {
        var

        updateResponsiveSize = function () {
          var screenWidth = $(window).width(),
              screenSizeIs = {
                "small": 600,
                "medium": 800,
                "large": 1200,
                "xlarge": 1600
              };

          switch(true) {
            case(screenWidth <= screenSizeIs.small):
              responsiveSize = 'small';
              break;
            case(screenWidth <= screenSizeIs.medium):
              responsiveSize = 'medium';
              break;
            case(screenWidth <= screenSizeIs.large):
              responsiveSize = 'large';
              break;
            case(screenWidth <= screenSizeIs.xlarge):
              responsiveSize = 'xlarge';
              break;
            case(screenWidth > screenSizeIs.xlarge):
              responsiveSize = 'xxlarge';
              break;
          }
        },

        // Subscribe object to Global Messages
        subscribeToEvents = function () {
          $.subscribe('debouncedresize', function () { updateResponsiveSize(); });
        };

        this.init = function () {
          subscribeToEvents();
          updateResponsiveSize();
        };
      },

      // Responsive Layout Manager class
      ResponsiveTextManager = function () {
        var fitTextSel = '.cpResult .result',

        setFitText = function () {
          $(fitTextSel).fitText(0.4, { minFontSize: '100px', maxFontSize: '180px' });
        };

        this.init = function () {
          setFitText();
        };
      },

      // Scroll Manager class
      ScrollManager = function () {

        var $pageFooter = $('.stFooter').eq(0),
            footerReached = false,

        checkForElementsInView = function () {

          if(Site.utils.isElementInView($pageFooter) && !footerReached){
            footerReached = true;
            Site.analytics.trackPageEvent('Page Navigation','scroll','Footer reached');
          }
        },

        // Subscribe object to Global Messages
        subscribeToEvents = function () {
          $.subscribe('scroll', function () { checkForElementsInView(); });
        };

        this.init = function () {
          subscribeToEvents();
        };
      },


  ///////////////
  // Functions //
  ///////////////

      // Get screen size

      getResponsiveSize = function () {
        return responsiveSize;
      },

      init = function () {
        Site.utils.cl("Site.layout initialised");
        var thisResponsiveLayoutManager = new ResponsiveLayoutManager();
        thisResponsiveLayoutManager.init();

        var thisResponsiveTextManager = new ResponsiveTextManager();
        thisResponsiveTextManager.init();

        var thisScrollManager = new ScrollManager();
        thisScrollManager.init();
      };

  ///////////////////////
  // Return Public API //
  ///////////////////////

  return {
    init: init,
    getResponsiveSize: getResponsiveSize
  };
}(jQuery));