// Site.modal.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.modal = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var modalTriggerSel = "",

  //////////////////
  // Constructors //
  //////////////////

        /**
         * Creates an Object object
         * @constructor
         */
        Modal = function () {

          var
          // Add event handler for staff profiles
          bindCustomMessageEvents = function () {
            // $thisMainNav.on('', function (e) {
            //   e.preventDefault();
            // });
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
          //Site.events.createDelegatedEventListener('click', sel, 'toggleMainNav');

        },

        /**
         * init function for this module
         * @function
         */
        init = function () {
          Site.utils.cl("Site.modal initialised");

          // Initialise Objects objects based on DOM objects
          $(modalTriggerSel).each(function () {
            var thisModal = new Modal(this);
            thisModal.init();
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