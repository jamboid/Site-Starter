// Site.helpers.js

// Check if base namespace is defined
var Site = Site || {};

// Site.helpers namespace
Site.utils = (function ($) {
    "use strict";
    // Variables
    var debugMode = true,
        // Console.log function with check for browsers that don't support it
        logMessage = function (logMessage) {
          if (debugMode === true) {
            if (window.console) {
              if (console.log) {
                console.log(logMessage);
              }
            }
          }
        },

        // Get maximum height of a set of elements
        getMaxHeight = function (elements) {
          var theseElements = elements,
              maxHeight = 0,
              currentHeight = 0;
          $(theseElements).css('min-height', 0);
          $(theseElements).each(function () {
            currentHeight = $(this).height();
            if (currentHeight > maxHeight){
              maxHeight = currentHeight;
            }
          });
          return maxHeight;
        },

        // Equalise the minimum heights of a set of elements
        equaliseMinHeights = function (elements) {
          var theseElements = elements,
              maxHeight = getMaxHeight(theseElements);

          getMaxHeight(theseElements);
          $(theseElements).css('min-height', maxHeight);
        },

        // Check if placeholder attribute is supported
        placeholderIsSupported = function () {
          var test = document.createElement('input');
          return ('placeholder' in test);
        },

        // Read a page's GET URL query string variables and return them as an associative array.
        getURLQueryString = function () {
          var vars = [], hash;
          var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
          for(var i = 0; i < hashes.length; i++)
          {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
          }
          return vars;
        },

        // Check if element is currently displayed in the viewport - returns bool
        isElementInView = function (element) {

          var $element = $(element),
              $window = $(window),
              windowHeight = $window.height(),
              scrollTop = $window.scrollTop(),
              elementOffset = $element.offset(),
              top = elementOffset.top;

              if ( (scrollTop + windowHeight) > (top) && (top + $element.height()) > scrollTop ) {
              return true;
            } else {
              return false;
            }
        },

        // Remove the style attribute from an element
        resetStyles = function (element) {
          $(element).removeAttr("style");
        },

        // Initialisation
        init = function () {
          Site.utils.cl("Site.utils.init called");
        };

    // Return Public API
    return {
      cl: logMessage,
      rs: resetStyles,
      equaliseMinHeights: equaliseMinHeights,
      placeholderIsSupported: placeholderIsSupported,
      getURLQueryString: getURLQueryString,
      isElementInView: isElementInView,
      init: init
    };

}(jQuery));
