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

        // Main Navigation Menu Object
        MainNavMenu = function (elem) {
          var $thisMainNav = $(elem),
              $menu = $thisMainNav.find('ul.menu').eq(0),

              // Show/Hide main navigation menu when in mobile/small-screen configuration
              // NOTES: This uses a jQuery-powered animation
              toggleMainNav = function () {
                if ($thisMainNav.hasClass("isVisible") === true) {
                  $('html, body').animate({
                    scrollTop: $('html, body').offset().top
                  }, transitionTime);
                  $menu.slideUp(transitionTime, function () {
                    $thisMainNav.removeClass("isVisible");
                    Site.utils.resetStyles(navMenu);
                  });
                } else {
                  $menu.slideDown(transitionTime, function () {
                    $thisMainNav.addClass("isVisible");
                    Site.utils.resetStyles(navMenu);
                  });
                }
              },

              // Add event handler for main navigation toggle
              bindCustomMessageEvents = function () {
                $thisMainNav.on('toggleMainNav', function () {
                  e.preventDefault();
                  toggleMainNav();
                };
              };

          this.init = function () {
            bindCustomMessageEvents();
          };
        },

        init = function () {
          Site.utils.cl("Site.navigation initialised");
          $(selNav).each(function () {
            var newNav = new MainNavMenu(this);
            newNav.init();
          });
        };

    // Return Public API
    return {
      init: init
    };
}(jQuery));