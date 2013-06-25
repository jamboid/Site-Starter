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
              animate = thisConfig.animate || false;

          Site.utils.cl(thisConfig);

          if (startState === "closed"){
            $(thisComp).addClass('isHiding');
          }

          $(thisAction).click(function (e) {
            e.preventDefault();
            if($(thisComp).hasClass('isHiding')){
              if(animate === true){
                $(thisContent).slideDown();
              } else {
                $(thisContent).show();
              }
              $(thisComp).removeClass('isHiding');
            } else {
              if(animate === true){
                $(thisContent).slideUp();
              } else {
                $(thisContent).hide();
              }
              $(thisComp).addClass('isHiding');
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

            var config = $(this).attr('data-plugin-config');
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
