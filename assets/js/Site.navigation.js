// Site.navigation.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child navigation
Site.navigation = (function ($) {
    "use strict";
    // Variables
    var selNav = ".cpMainNav",
        selNavToggle = ".cpMainNav .navTitle a",
        selNavMenu = ".menu",
        transitionTime = 200,

        // Show/Hide main navigation menu when in mobile/small-screen configuration
        // NOTES: This uses a jQuery-powered animation
        toggleMainNav = function (mainNav, navMenu) {
          if ($(mainNav).hasClass("isVisible") === true) {
            $('html, body').animate({
              scrollTop: $('html, body').offset().top
            }, transitionTime);
            $(navMenu).slideUp(transitionTime, function () {
              $(mainNav).removeClass("isVisible");
              Site.utils.resetStyles(navMenu);
            });
          } else {
            $(navMenu).slideDown(transitionTime, function () {
              $(mainNav).addClass("isVisible");
              Site.utils.resetStyles(navMenu);
            });
          }
        },

        // Add event handler for main navigation toggle
        bindMainNavEvents = function () {
          $(selNavToggle).on("click", function (event) {
            event.preventDefault();
            var mainNav = $(this).closest(selNav),
                navMenu = $(mainNav).find(selNavMenu).eq(0);
            toggleMainNav(mainNav, navMenu);
          });
        },

        init = function () {
          Site.utils.cl("Site.navigation initialised");
          bindMainNavEvents();
        };

    // Return Public API
    return {
      init: init
    };
}(jQuery));