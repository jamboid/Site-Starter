// Site.namespace.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.namespace = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var objectSel = "",

  /////////////
  // Classes //
  /////////////

        Object = function () {

          var
          // Add event handler for staff profiles
          bindCustomMessageEvents = function () {
            $thisMainNav.on('', function (e) {
              e.preventDefault();
            });
          },

          // Subscribe object to Global Messages
          subscribeToEvents = function () {

          };

          this.init = function () {
            bindCustomMessageEvents();
            subscribeToEvents();
          };
        },

  ///////////////
  // Functions //
  ///////////////

        // Create delegate event listeners for this module
        delegateEvents = function () {
          //Site.events.delegateEventFactory('click', sel, 'toggleMainNav');

        },

        init = function () {
          Site.utils.cl("Site.namespace initialised");

          // Initialise Objects objects
          $(objectSel).each(function () {
            var thisObject = new Object(this);
            thisObject.init();
          });

          // Add delegate event listeners for this module
          delegateEvents();
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
      init: init
    };

}(jQuery));