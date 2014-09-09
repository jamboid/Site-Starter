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


  //////////////////
  // Constructors //
  //////////////////

      /**
       * Creates a ResponsiveLayoutManager object to manage general layout state
       * @constructor
       */
      ResponsiveLayoutManager = function () {
        var

        /**
         * Set and update the responsiveSize variable based on current screen width
         * @function
         */
        updateResponsiveSize = function () {
          var screenWidth = $(window).width(),
              screenSizeIs = {
                "small": 600,
                "medium": 800,
                "large": 1200,
                "xlarge": 1600
              };

          switch(true) {
            // Case for static (non-media query) browsers, using Modernizr MQ test
            // - use this if you want to load static-specific images
            //   (e.g. correctly sized background images that can't be scaled with CSS)
            case(!Modernizr.mq('only all')):
              responsiveSize = 'static';
              break;
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

        /**
         * Subscribe object to Global Messages
         * @function
         */
        subscribeToEvents = function () {
          $.subscribe('debouncedresize', function () { updateResponsiveSize(); });
        };

        /**
         * Initialise this object
         * @function
         */
        this.init = function () {
          subscribeToEvents();
          updateResponsiveSize();
        };
      },

      /**
       * Creates a ResponsiveTextManager object to manage responsive text
       * - uses the FitText jQuery plugin so make sure this is included in the src/assets/js/libs folder
       * @constructor
       */
      ResponsiveTextManager = function () {
        var fitTextSel = '.cpResult .result',

        setFitText = function () {
          $(fitTextSel).fitText(0.4, { minFontSize: '100px', maxFontSize: '180px' });
        };


        /**
         * Initialise this object
         * @function
         */
        this.init = function () {
          setFitText();
        };
      },

      /**
       * Creates a ScrollManager object to manage scrolling events
       * @constructor
       */
      ScrollManager = function () {

        var $pageFooter = $('.stFooter').eq(0),
            footerReached = false,

        /**
         * Check if the page footer has been reached when the page is scrolled
         * @function
         */
        checkIfFooterHasBeenReached = function () {

          if(Site.utils.isElementInView($pageFooter) && !footerReached){
            footerReached = true;
            Site.analytics.trackPageEvent('Page Navigation','scroll','Footer reached');
          }
        },

        /**
         * Subscribe object to Global Messages
         * @function
         */
        subscribeToEvents = function () {
          $.subscribe('scroll', function () { checkIfFooterHasBeenReached(); });
        };

        /**
         * Initialise this object
         * @function
         */
        this.init = function () {
          subscribeToEvents();
        };
      },

      /**
       * Creates a HeightManager object to manage component heights
       * @constructor
       */
      HeightManager = function () {

        var

        // JSON object that holds group (groupSel) and item (itemSel) selectors for height equalisation,
        // along with a group name for reference (although the function below simply loops through them all)
        groups = {
                  "minireviews": {
                    "groupSel": ".gp_MiniReviews",
                    "itemSel": ".reviewText"
                  }
                },

        /**
         * Match the heights of all the groups of elements in the groups var
         * @function
         */
        updateHeights = function () {
          $.each(groups,function(i,v) {
            $(v.groupSel).each(function() {
              var $thisGroup = $(this),
                  items = $thisGroup.find(v.itemSel);

              Site.utils.equaliseMinHeights(items);
            });
          });
        },

        /**
         * Subscribe object to Global Messages
         * @function
         */
        subscribeToEvents = function () {
          $.subscribe('page/resize', function () { updateHeights(); });
        };

        /**
         * Initialise this object
         * @function
         */
        this.init = function () {
          subscribeToEvents();
          updateHeights();
        };
       },

  ///////////////
  // Functions //
  ///////////////

      /**
       * Return the value of the responsiveSize variable
       * @function
       */
      getResponsiveSize = function () {
        return responsiveSize;
      },

      /**
       * Initialise this module
       * @function
       */
      init = function () {
        Site.utils.cl("Site.layout initialised");

        // Create a new ResponsiveLayoutManager object
        var thisResponsiveLayoutManager = new ResponsiveLayoutManager();
        thisResponsiveLayoutManager.init();

        // Create a new ResponsiveTextManager object
        var thisResponsiveTextManager = new ResponsiveTextManager();
        thisResponsiveTextManager.init();

        // Create a new ScrollManager object
        var thisScrollManager = new ScrollManager();
        thisScrollManager.init();

        // Create a new HeightManager object
        var thisHeightManager = new HeightManager();
        thisHeightManager.init();
      };

  ///////////////////////
  // Return Public API //
  ///////////////////////

  return {
    init: init,
    getResponsiveSize: getResponsiveSize
  };
}(jQuery));