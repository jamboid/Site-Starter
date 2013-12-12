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

        // ShowHide object
        ShowHider = function (elem) {
          var $thisShowHider = $(elem),
              $thisContent = $(thisComp).find(defaults.selContent).eq(0),
              config = $thisShowHider.data('plugin-config'),
              animate = config.animate || false,
              speed = config.speed || 200,
              startState = thisConfig.open || false,

              // Toggle Show/Hide control
              toggleControl = function () {
                var
                // Function called when show/hide transition is complete
                transitionComplete = function () {
                  // Fire event to be heard by global delegate (Site.events.js)
                  $thisShowHider.trigger('layoutchange');
                };


                if($thisShowHider.hasClass('isClosed')){
                  if(animate === true){
                    $thisContent .slideDown(function () {
                      $thisShowHider.removeClass('isClosed');
                      transitionComplete();
                    });
                  } else {
                    $thisContent.show();
                    $thisShowHider.removeClass('isClosed');
                    transitionComplete();
                  }

                } else {
                  if(animate === true){
                    $thisContent.slideUp(function () {
                      $thisShowHider.addClass('isClosed');
                      transitionComplete();
                    });
                  } else {
                    $thisContent.hide();
                    $thisShowHider.addClass('isClosed');
                    transitionComplete();
                  }
                }
              },

              setInitialState = function () {
                if (startState === false){
                  $thisShowHider.addClass('isClosed');
                }
              },

              bindCustomMessageEvents = function () {
                $thisShowHider.on('toggleShowHide', function (e) {
                  e.preventDefault();
                  toggleControl();
                });
              },

          this.init = function () {

          };
        },

        setShowHideComponents = function () {
          var showHideComps = $(defaults.selPlugin);
          $(showHideComps).each(function () {

            var thisShowHider = new ShowHider(this);
            thisShowHider.init();
          });
        },

        // Initialisation
        init = function () {
          Site.utils.cl("Site.showhide.init called");
          setShowHideComponents();
        };

    // Return Public API
    return {
        init: init,
        toggleControl: toggleControl
    };

}(jQuery));
