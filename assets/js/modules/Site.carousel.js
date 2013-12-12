// Site.carousel.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.carousel = (function ($) {
    "use strict";
    // Variables
    var defaults = {},
        carouselSel = "[data-plugin=carousel]",

        getNextSlide = function (carousel) {
          var $thisCarousel = $(carousel);
        },

        getPreviousSlide = function (carousel) {
          var $thisCarousel = $(carousel);
        },

        getCarouselSlides = function (carousel) {
          var $slides = $(carousel).find('.slide');
          return $slides;
        },

        setAutoAdvance = function () {

        },

        advanceCarousel = function (carousel, nextSlide) {
          var $thisCarousel = $(carousel),
              $slides = getCarouselSlides($thisCarousel),
              $currentSlide = $thisCarousel.find('.slide.current'),
              $nextSlide = $thisCarousel.find('.slide.next'),
              $firstSlide = $slides.eq(0),
              numOfSlides = $slides.length,
              config = $thisCarousel.data('config'),
              interval = config.interval || 5000,
              transition = config.transition || 1000;

          // Fade in next slide to sit over current slide
          $nextSlide.fadeIn(transition, function () {
            $currentSlide.removeClass('current');
            $nextSlide.addClass('current').removeClass('next');
            Site.utils.resetStyles($nextSlide);
            $currentSlide = $nextSlide;

            // Set next slide
            var currentPos = $slides.index($currentSlide);
            if((currentPos+1) < numOfSlides){
              $nextSlide = $currentSlide.next();
              $nextSlide.addClass('next');
            } else {
              $nextSlide = $firstSlide;
              $nextSlide.addClass('next');
            }

            // Set the carousel to loop through the slides
            setTimeout(function(){ advanceCarousel($thisCarousel, $nextSlide) }, interval);
          });
        },

        buildCarousel = function (carousel) {
          var $thisCarousel = $(carousel),
              $firstSlide = getCarouselSlides($thisCarousel).eq(0),
              $currentSlide = $firstSlide,
              $nextSlide = $currentSlide.next(),
              config = $thisCarousel.data('config'),
              interval = config.interval || 5000;

          $currentSlide.addClass('current');
          $nextSlide.addClass('next');

          setTimeout(function(){ advanceCarousel($thisCarousel, $nextSlide) }, interval);
        },

        buildCarousels = function () {
          $(carouselSel).each(function () {
            buildCarousel(this);
          })
        },

        init = function () {
          Site.utils.cl("Site.carousel initialised");
          buildCarousels();
        }

    // Return Public API
    return {
      init: init
    };

}(jQuery));