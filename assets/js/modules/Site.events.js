// Site.events.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.events = (function ($) {
    "use strict";
    // Variables
    var $body = $('body'),

        // Bind delegated events
        bindGlobalEvents = function () {
          // Handle 'layoutChange' event bubbled to <body> element
          $body.on('layoutchange', function () {
            $.publish('layoutChange');
          });

          // Handle page scroll or (debounced) resize
          $(window).on('scroll debouncedresize', function () {
            $.publish('layoutChange');
          });
        },

        // Simple factory function to bind delegated event listeners to the <body> element
        delegatedEventFactory = function (event, selector, triggerEvent) {
          $body.on(event, selector, function (e) {
            e.preventDefault();
            $(e.target).trigger(triggerEvent);
          });
        },

        init = function () {
          Site.utils.cl("Site.events initialised");
          bindGlobalEvents();
        };

    // Return Public API
    return {
      init: init,
      delegatedEventFactory: delegatedEventFactory
    };

}(jQuery));