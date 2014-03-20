// Site.events.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.events = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var $body = $('body').eq(0),

  ///////////////
  // Functions //
  ///////////////

        // Bind custom Global events that will result in a "Publish" message being broadcast
        bindGlobalEvents = function () {
          // Handle 'layoutchange' event bubbled to <body> element
          $body.on('layoutchange', function () {
            $.publish('layout/change');
          });

          // Handle page scroll or (debounced) resize
          $(window).on('scroll', function () {
            $.publish('page/scroll');
          });

          $(window).on('debouncedresize', function () {
            $.publish('page/resize');
          });

          // Register Hammer touch events on body
          // This lets you treat these touch events as the normal delegate events
          $body.hammer();

        },

        // Simple factory function to bind delegated event listeners to the <body> element
        delegateEventFactory = function (eventType, selector, eventToTrigger) {
          $body.on(eventType, selector, function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(e.target).trigger(eventToTrigger);
          });
        },

        init = function () {
          Site.utils.cl("Site.events initialised");
          bindGlobalEvents();
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
      init: init,
      delegateEventFactory: delegateEventFactory
    };

}(jQuery));