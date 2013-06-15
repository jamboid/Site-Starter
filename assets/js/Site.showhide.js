// Site.showhide.js

// Check if base namespace is defined
var Site = Site || {};

// Site.layout namespace
Site.showhide = (function ($) {
    "use strict";
    // Variables
    var defaults = {
          selPlugin : "[data-plugin=showHide]",
          selAction : "[data-action=toggle]",
          selContent : "[data-content=showHide]"
        },

        bindShowHideEvents = function (component) {
          var thisComp = component,
              thisAction = $(thisComp).find(defaults.selAction).eq(0),
              thisContent = $(thisComp).find(defaults.selContent).eq(0);
              $(thisAction).click(function (e) {
                e.preventDefault();
                if($(thisComp).hasClass('isShowing')){
                  $(thisContent).slideUp();
                  $(thisComp).removeClass('isShowing');
                } else {
                  $(thisContent).slideDown();
                  $(thisComp).addClass('isShowing');
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
            setActiveStates(this);
            bindShowHideEvents(this);
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
