// Site.tabs.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.tabs = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var tabContainerSel = '[data-plugin=tabs]',
        tabPanelSel = '[data-tabs=panel]',
        tabControlSel = '[data-tabs=control]',
        tabControlCurrentSel = '.current[data-tabs=control]',

        tabGlobalControlSel = '[data-plugin=tabs] [data-tabs=control]',
        tabGlobalControlInnerSel = '[data-plugin=tabs] [data-tabs=control] span',

        // Template contains show/hide data attributes
        tabControlsContainerTemplate = '<div class="tabControls" data-plugin="showhide" data-plugin-config=\'{"animate": false, "open": false}\'><a class="tabToggle" href="#" data-showhide-action="toggle"></a><div class="tabs"></div></div>',
        tabControlTemplate = '<a href="#" class="tabLink" data-tabs="control"><span class="inner"></span></a>',


  //////////////////
  // Constructors //
  //////////////////


        TabbedContent = function (elem) {
          var $thisTabbedContent = $(elem),
              $tabPanels = $thisTabbedContent.find(tabPanelSel),
              $tabControls = $(tabControlsContainerTemplate),

          /**
           * Setup tabbed content and controls
           * @function
           */
          setupTabs = function () {

            $tabPanels.each(function () {
              var thisTitle = $(this).data('title'),
                  $tabControl = $(tabControlTemplate);

              $tabControl.find('span').text(thisTitle);
              $('.tabs',$tabControls).append($tabControl);
            });

            $('.tabContainer', $thisTabbedContent).eq(0).prepend($tabControls);

            $thisTabbedContent.addClass('tabbed');
            $tabPanels.eq(0).addClass('current');
            $('.tabLink:first-child', $tabControls).addClass('current');

          },


          /**
           * Change active tab and panel of content
           * @function
           */
          updateCurrentTab = function (tab) {
            var $tabTarget = $(tab),
                $actualTab, indexOfClickedTab;

            if($(tab).hasClass('inner')){
              $actualTab = $tabTarget.parent();
            } else {
              $actualTab = $tabTarget
            }

            indexOfClickedTab = $actualTab.index();

            $('.current', $tabControls).removeClass('current');
            $tabPanels.removeClass('current');

            $actualTab.addClass('current');
            $tabPanels.eq(indexOfClickedTab).addClass('current');
          },

          /**
           * Bind custom message events for this object
           * @function
           */
          bindCustomMessageEvents = function () {
            $thisTabbedContent.on('updatestate', function (e) {
               e.preventDefault();
               updateCurrentTab(e.target);
            });
          },

          /**
           * Subscribe object to Global Messages
           * @function
           */
          subscribeToEvents = function () {

          };

          /**
           * Initialise this object
           * @function
           */
          this.init = function () {
            bindCustomMessageEvents();
            subscribeToEvents();
            setupTabs();
          };
        },


  ///////////////
  // Functions //
  ///////////////

        /**
         * Create delegate event listeners for this module
         * @function
         */
        delegateEvents = function () {
          Site.events.delegate('click', tabGlobalControlSel, 'updatestate');
          Site.events.delegate('click', tabGlobalControlInnerSel, 'updatestate');
        },

        init = function () {
          Site.utils.cl("Site.tabs initialised");
          //initialiseTabbedPanels();
          delegateEvents();

          $(tabContainerSel).each(function() {
            var thisTabbedContent= new TabbedContent(this);
            thisTabbedContent.init();
          })
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
      init: init
    };

}(jQuery));



