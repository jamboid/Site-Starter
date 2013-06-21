// Site.tabs.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.tabs = (function ($) {
    "use strict";
    // Variables
    var tabContainerSel = '[data-plugin=tabs]',
        tabPanelSel = '[data-tabs=panel]',
        tabControlSel = '[data-tabs=control]',
        tabControlCurrentSel = '.current[data-tabs=control]',

        buildTabs = function (tabbedComponent) {
          var thisTabbedComponent = tabbedComponent,
              tabPanels = $(tabPanelSel, thisTabbedComponent),
              tabControls = $('<div class="tabControls"><ul class="controlsList itemList"></ul></div>'),

              bindControlEvents = function (control) {
                $(control).on('click', function (e) {
                  e.preventDefault();
                  Site.utils.cl('Tab control clicked');

                  if(!$(this).hasClass('current')) {
                    var newPos = $(this).index();
                    $('.current',tabControls).removeClass('current');
                    $(tabControlCurrentSel, thisTabbedComponent).removeClass('current');

                    $(tabControlSel,tabControls).eq(newPos).addClass('current');
                    $(tabPanelSel, thisTabbedComponent).eq(newPos).addClass('current');
                  }
                });
              };

          $(tabPanels).each(function () {
            var thisTitle = $(this).data('title'),
                tabControl = $('<li class="tabControl"><a href="#" class="tabLink"></a></li>');
                $('.tabLink',tabControl).text(thisTitle);
                $('.controlsList', tabControls).append(tabControl);
                bindControlEvents(tabControl);
          });

          $('.in', thisTabbedComponent).eq(0).prepend(tabControls);

          $(thisTabbedComponent).addClass('tabbed');
          $(tabPanels).eq(0).addClass('current');
          $('li:first-child', tabControls).addClass('current');
        },

        setupTabbedPanels = function () {
          $(tabContainerSel).each(function(){
            buildTabs(this);
          });
        },

        init = function () {
          Site.utils.cl("Site.tabs initialised");
          setupTabbedPanels();
        };

    // Return Public API
    return {
      init: init
    };

}(jQuery));



