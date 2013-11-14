// Site.showhide.js

// Check if base namespace is defined
var Site = Site || {};

// Site.layout namespace
Site.showhide = (function ($) {
    "use strict";
    // Variables
    var defaults = {
          selPlugin : "[data-plugin=showhide]",
          selAction : "[data-action=toggle]",
          selContent : "[data-content=showhide]"
        },

        bindShowHideEvents = function (component, config) {
          var thisComp = component,
              thisAction = $(thisComp).find(defaults.selAction).eq(0),
              thisContent = $(thisComp).find(defaults.selContent).eq(0),
              thisConfig = config || {},
              startState = thisConfig.open || false,
              animate = thisConfig.animate || false,
              speed = thisConfig.speed || 200,

          // Function called when show/hide transition is complete
          transitionComplete = function () {
            // Fire event to be heard by global delegate (Site.events.js)
            $(thisAction).trigger('layoutchange');
          };


          if (startState === false){
            $(thisComp).addClass('isClosed');
          }

          $(thisAction).bind('tap',function (e) {
            e.preventDefault();
            if($(thisComp).hasClass('isClosed')){
              if(animate === true){
                $(thisContent).slideDown(function () {
                  $(thisComp).removeClass('isClosed');
                  transitionComplete();
                });
              } else {
                $(thisContent).show();
                $(thisComp).removeClass('isClosed');
                transitionComplete();
              }

            } else {
              if(animate === true){
                $(thisContent).slideUp(function () {
                  $(thisComp).addClass('isClosed');
                  transitionComplete();
                });
              } else {
                $(thisContent).hide();
                $(thisComp).addClass('isClosed');
                transitionComplete();
              }

            }
          });
        },

        setActiveStates = function (component) {
          var thisComp = component;
          if($(thisComp).find('li a.active').length > 0){
            $(thisComp).addClass('isActive');
          }
        },

        setShowHideComponents = function () {
          var showHideComps = $(defaults.selPlugin);
          $(showHideComps).each(function () {

            var config = $(this).data('plugin-config');

            Site.utils.cl(config);
            setActiveStates(this);
            bindShowHideEvents(this, config);
          });
        },

        // Initialisation
        init = function () {
          Site.utils.cl("Site.showhide.init called");
          setShowHideComponents();
        };

    // Return Public API
    return {
        init: init
    };

}(jQuery));
