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

        // Show/Hide "Nipper" object
        // NOTE: The term "Nipper" is Copyright Rob Graham (@restlesslake)
        Nipper = function (elem) {
          var $thisNipper = $(elem),
              $thisContent = $thisNipper.find(defaults.selContent).eq(0),
              config = $thisNipper.data('plugin-config'),
              animate = config.animate || false,
              speed = config.speed || 200,
              startState = config.open || false,

              // Toggle Show/Hide control
              toggleControl = function () {
                var
                // Function called when show/hide transition is complete
                transitionComplete = function () {
                  // Fire event to be heard by global delegate (Site.events.js)
                  $thisNipper.trigger('layoutchange');
                };


                if($thisNipper.hasClass('isClosed')){
                  if(animate === true){
                    $thisContent .slideDown(speed, function () {
                      $thisNipper.removeClass('isClosed');
                      transitionComplete();
                    });
                  } else {
                    $thisContent.show();
                    $thisNipper.removeClass('isClosed');
                    transitionComplete();
                  }

                } else {
                  if(animate === true){
                    $thisContent.slideUp(speed, function () {
                      $thisNipper.addClass('isClosed');
                      transitionComplete();
                    });
                  } else {
                    $thisContent.hide();
                    $thisNipper.addClass('isClosed');
                    transitionComplete();
                  }
                }
              },

              setInitialState = function () {
                if (startState === false){
                  $thisNipper.addClass('isClosed');
                }
              },

              bindCustomMessageEvents = function () {
                $thisNipper.on('toggleShowHide', function (e) {
                  e.preventDefault();
                  toggleControl();
                });
              },

              delegateEvents = function () {
                Site.events.delegatedEventFactory('click', '[data-plugin=showhide] [data-action=toggle]', 'toggleShowHide');
              };

          this.init = function () {
            bindCustomMessageEvents();
            delegateEvents();
          };
        },

        setShowHideComponents = function () {
          var showHideComps = $(defaults.selPlugin);
          $(showHideComps).each(function () {

            var thisNipper = new Nipper(this);
            thisNipper.init();
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
