// Site.carousel.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.carousel = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var carouselSel = "[data-plugin=carousel]",
        carouselSlideSel = ".slide",
        carouselSlideFirstSel = ".slide:first-child",
        carouselIndexContainerSel = '.controls .index',
        carouselControlsSel = ".controls",

        // Selectors for delegated events - need to include parent component to ensure specificity
        eventSelCarouselControl = '[data-plugin=carousel] [data-action]',
        eventSelCarouselSlide = '[data-plugin=carousel] .slide',
        eventSelCarouselIndexItem = '[data-plugin=carousel] .controls [data-index]',

        // Specific carousel type selectors
        // selIconIndex = ".cp_Carousel--icon",

  //////////////////
  // Constructors //
  //////////////////

        /**
         * Carousel object constructor
         * @constructor
         */
        Carousel = function (elem) {
          var $thisCarousel = $(elem),
              $slideContainer = $thisCarousel.find('.slides').eq(0),
              $slides = $thisCarousel.find('.slide'),
              numOfSlides = $slides.length,
              config = $thisCarousel.data('config'),
              interval = config.interval || 5000,
              mode = config.mode || "scroll",
              transition = config.transition || 1000,
              autoplay = config.autoplay || false,
              $currentSlide, $nextSlide, $firstSlide, $lastSlide, currentHeight, cycleTimeout,
              $slideToLoad,
              $carouselIndex = $thisCarousel.find(carouselIndexContainerSel).eq(0),
              inTransition = false,
              animate = true,
              maxScroll = config.maxScroll || 4,
              controlsActive = true,
              carouselWidth, slideWidth, slidesToScroll, moveWidth,


          /**
           * Set timeout to repeat autocycle of carousel is it isn't paused
           * @function
           */
          setCycle = function () {
            if(autoplay) {
              cycleTimeout = setTimeout(function(){ advanceCarousel('n'); }, interval);
            }
          },

          /**
           * Stop the carousel from autocycling
           * @function
           */
          stopCycle = function () {
            autoplay = false;
            clearTimeout(cycleTimeout);
          },

          /**
           * Update the carousel index
           * @function
           */
          setIndexControls = function () {
            if($carouselIndex) {

              var hasIcons = false;

              if($thisCarousel.hasClass(selIconIndex)) {
                hasIcons = true;
              }

              $slides.each(function (index) {
                var indexLink;

                $(this).attr('data-slide-index',index);

                // If Carousel is of the Icon Index variety
                if(hasIcons) {
                  var iconImage = $(this).find('.indexIcon').html();

                  if(iconImage !== undefined){
                    indexLink = $('<div class="indexItem"><span data-index="' + index + '">' + iconImage + '</span></div>');
                  } else {
                    indexLink = '';
                  }


                } else {
                  indexLink = $('<div class="indexItem"><span data-index="' + index + '">' + index + '</span></div>');
                }

                $carouselIndex.append(indexLink);
              });

              updateIndex(0);
              positionControls();
            }
          },


          /**
           * Position the carousel index based on the screen width
           * @function
           */
          positionControls = function () {
            if ( $thisCarousel.hasClass('cp_Carousel--button')) {
              var imageHeight = $thisCarousel.find('.slides .image img').eq(0).outerHeight(),
                  indexHeight = $thisCarousel.find('.index').eq(0).outerHeight(),
                  indexOffset = imageHeight - indexHeight,
                  buttonOffset;

              if(Site.layout.getResponsiveSize() === 'small'){
                buttonOffset = imageHeight;
              } else {
                buttonOffset = (imageHeight/2);
              }

              $thisCarousel.find('.controls .index').css('top',indexOffset);
              $thisCarousel.find('.controls .control').css('top',buttonOffset);
            }
          },

          /**
           * Update the carousel index
           * @function
           * @parameter index - int
           */
          updateIndex = function() {
            $carouselIndex.find('.indexItem').removeClass('current');

            if(mode === 'scroll'){
              $carouselIndex.find('.indexItem').eq($thisCarousel.find('.slide').eq(0).data('slide-index')).addClass('current');
            } else if (mode === 'fade') {
              $carouselIndex.find('.indexItem').eq($thisCarousel.find('.slide.current').eq(0).data('slide-index')).addClass('current');
            }
          },

          /**
           * Complete the transition of the carousel
           * @function
           */
          completeTransition = function () {
            inTransition = false;
            setCycle();
            updateIndex();
          },

          /**
           * Set dimensions and other parameters for the carousel transitions
           * Called on page-load and whenever window is resized
           * @function
           */
          setLayout = function () {
            //Site.utils.cl("setLayout called");
            carouselWidth = $slideContainer.width();
            slideWidth = $(carouselSlideSel, $thisCarousel).eq(0).width();
            // Set the number of items to scroll
            slidesToScroll = Math.round(carouselWidth / slideWidth);

            // Set maximum number of items to scroll
            if (slidesToScroll > maxScroll) {
              slidesToScroll = maxScroll;
            }

            // Set the width to scroll
            moveWidth = slidesToScroll * slideWidth;

            if (slidesToScroll > maxScroll) {
              slidesToScroll = maxScroll;
            }

            // Debug log
            //Site.utils.cl("maxScroll: " + maxScroll + ", " + "Slides to scroll: " + slidesToScroll);
            //Site.utils.cl("Carousel width: " + carouselWidth + ", " + "Slide Width: " + slideWidth);
            //Site.utils.cl("Items to scroll: " + slidesToScroll + ", " + "Number of items: " + $slides.length + ", " + "Distance to scroll: " + moveWidth);

            // If total number of items is greater than visible items, show controls...

            if (numOfSlides > slidesToScroll) {
              $(carouselControlsSel, $thisCarousel).show();
              controlsActive = true;
            } else {
              $(carouselControlsSel, $thisCarousel).hide();
              controlsActive = false;
            }

          },

          /**
           * Transition the carousel, using a scroll effect, to the next or previous slide(s)
           * @function
           * @parameter direction - string
           */
          scrollToNextSlide = function (direction) {

            var slidesToClone;

            if (inTransition === false) {
              inTransition = true;
              if (direction === 'n') {
                slidesToClone = $(carouselSlideSel, $thisCarousel).slice(0, slidesToScroll).clone();

                $.publish('content/change', slidesToClone);

                $slideContainer.append(slidesToClone);

                if (animate === false) {
                  $(carouselSlideSel, $thisCarousel).slice(0, slidesToScroll).remove();
                  completeTransition();
                } else {
                  $(carouselSlideFirstSel, $slideContainer).animate({ marginLeft: [-moveWidth, "easeInOutQuad"]}, transition, function () {
                    $(this).css("margin-left", "auto");
                    $(carouselSlideSel, $thisCarousel).slice(0, slidesToScroll).remove();
                    completeTransition();
                  });
                }
              } else if (direction === 'p') {
                slidesToClone = $(carouselSlideSel, $thisCarousel).slice(-slidesToScroll).clone();

                $.publish('content/change', slidesToClone);

                if (animate === false) {
                  $slideContainer.prepend(slidesToClone);
                  $(carouselSlideSel, $thisCarousel).slice(-slidesToScroll).remove();
                  completeTransition();
                } else {
                  $(slidesToClone).eq(0).css("margin-left", -moveWidth);
                  $slideContainer.prepend(slidesToClone);
                  $(carouselSlideFirstSel, $slideContainer).animate({ marginLeft: [0,"easeInOutQuad"] }, transition, function () {
                    $(this).css("margin-left", "auto");
                    $(carouselSlideSel, $thisCarousel).slice(-slidesToScroll).remove();
                    completeTransition();
                  });
                }
              }
            }
          },

          /**
           * Transition the carousel, using a fade-in effect, to the next or previous slide(s)
           * @function
           * @parameter direction - string
           */
          fadeToNextSlide = function (direction) {
            var thisDirection = direction,
                currentPos = $slides.index($currentSlide);


            if (inTransition === false) {
              inTransition = true;
              // Set next slide based on direction
              if (direction === 'n'){

                if((currentPos+1) < numOfSlides){
                  $nextSlide = $currentSlide.next();
                  $nextSlide.addClass('next');
                } else {
                  $nextSlide = $firstSlide;
                  $nextSlide.addClass('next');
                }

              } else if (direction === 'p') {

                if(currentPos > 0){
                  $nextSlide = $currentSlide.prev();
                  $nextSlide.addClass('next');
                } else {
                  $nextSlide = $lastSlide;
                  $nextSlide.addClass('next');
                }
              }

              // Fade in next slide to sit over current slide
              $nextSlide.fadeIn(transition, function () {
                $currentSlide.removeClass('current');
                $nextSlide.addClass('current').removeClass('next');
                Site.utils.resetStyles($nextSlide);
                $currentSlide = $nextSlide;
                completeTransition();
              });
            }
          },

          /**
           * Generic function to advance the carousel to the next or previous slide(s)
           * @function
           * @parameter direction - string
           */
          advanceCarousel = function (direction) {
            //Site.utils.cl("advanceCarousel called...");
            if(!inTransition){
              if(mode === 'fade'){
                fadeToNextSlide(direction);
              } else if (mode === 'scroll') {
                scrollToNextSlide(direction);
              }
            }
          },

          /**
           * Switch the auto-cycling of the carousel on and off
           * @function
           */
          toggleAutoCycle = function () {
            if(autoplay) {
              autoplay = false;
              clearTimeout(cycleTimeout);
            } else {
              autoplay = true;
              setCycle ();
            }
          },

          /**
           * Bind Custom Events to allow Object messaging
           * @function
           */
          bindCustomMessageEvents = function () {
            $thisCarousel.on('toggleautocycle', function (e) {
              e.preventDefault();
              toggleAutoCycle();
            });

            $thisCarousel.on('controlclicked', function (e) {
              e.preventDefault();

              // Clear autoscroll
              stopCycle();

              // If event target is a control and has a "data-action" attribute,
              // advance the scroller in the direction the attribute states
              if($(e.target).attr('data-action') !== undefined) {
                advanceCarousel($(e.target).attr('data-action'));
              }
            });

            // Event listener for 'nextslide' event that cycles to next slide
            $thisCarousel.on('nextslide', function (e) {
              e.preventDefault();
              if(controlsActive){
                advanceCarousel("n");
                stopCycle();
              }
            });

            // Event listener for 'nextslide' event that cycles to previous slide
            $thisCarousel.on('prevslide', function (e) {
              e.preventDefault();
              if(controlsActive){
                advanceCarousel("p");
                stopCycle();
              }
            });

            $thisCarousel.on('indexclicked', function (e) {
              e.preventDefault();
              advanceCarousel($(e.target).data('index'));
            });

            $thisCarousel.on('updateLayout', function (e) {
              e.preventDefault();
              setLayout();
              positionControls();
            });


            $thisCarousel.hammer();
          },

          /**
           * Subscribe object to Global Messages
           * @function
           */
          subscribeToEvents = function () {
            // Subscrive to layoutchange event to trigger scroller's updateLayout method
            $.subscribe('page/resize', function () {$(this).trigger('updateLayout');} , $thisCarousel);
            $.subscribe('page/loaded', function () {$(this).trigger('updateLayout');} , $thisCarousel);
            $.subscribe('layout/change', function () {$(this).trigger('updateLayout');} , $thisCarousel);
          },

          /**
           * Setup the carousel to an initial state
           * @function
           */
          setInitialState = function () {
            // Set class for carousel type
            $thisCarousel.addClass(mode);

            if(mode === 'fade'){
              $firstSlide = $slides.eq(0);
              $lastSlide = $slides.eq($slides.length-1);
              $currentSlide = $firstSlide;
              $nextSlide = $currentSlide.next();
              currentHeight = $currentSlide.height();
              $currentSlide.addClass('current');
              $nextSlide.addClass('next');
              setIndexControls();
              updateIndex();
            }

            // If in scroll mode
             else if(mode === 'scroll'){
              setLayout();
              setIndexControls();
              updateIndex();
            }

            //$slideContainer.css('height',currentHeight);
            bindCustomMessageEvents();
            subscribeToEvents();
            setCycle();
            $.publish('page/resize');
          };

          /**
           * Initialise this object
           * @function
           */
          this.init = function () {
            setInitialState();
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
          // Delegate 'click' event to start/stop cycling of carousel
          //Site.events.delegateEventFactory('click', '[data-plugin=carousel] .slide', 'toggleautocycle');

          // Delegate 'click' event on next/prev controls
          Site.events.delegate('click', eventSelCarouselControl, 'controlclicked');

          // Delegate 'click' event on carousel index links
          //Site.events.delegate('click', eventSelCarouselIndexItem, 'indexclicked');

          // Delegate 'swipeleft' event to move back
          Site.events.delegate('swipeleft', eventSelCarouselSlide, 'nextslide');

          // Delegate 'swiperight' event to move forward
          Site.events.delegate('swiperight', eventSelCarouselSlide, 'prevslide');
        },

        /**
         * Initialise this module
         * @function
         */
        init = function () {
          Site.utils.cl("Site.carousel initialised");

          $(carouselSel).each(function () {
            var thisCarousel = new Carousel(this);
            thisCarousel.init();
          });

          delegateEvents();
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
      init: init
    };

}(jQuery));