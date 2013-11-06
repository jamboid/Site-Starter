var Site = Site || {};

// Site namespace
Site.scroller = (function ($) {
    "use strict";

    var defaults = {
        // Selectors for scroller plugin
        selControls: ".scrollControls",
        selControl : "[data-action]",
        selScrollerContent : ".scrollContent",
        selPlugin : "[data-plugin=scroller]"
        },
        
        buildScroller = function (scroller, config) {
          var thisScroller = scroller,
              scrollerConfig = config || {},
              timeUnit = scrollerConfig.timeUnit || 250, // Set in data-config attribute, or use default
              maxScroll = scrollerConfig.maxScroll || 4, // Set in data-config attribute, or use default
              scrlItemContainer = $("ul", thisScroller),
              scrlItems = $("li", thisScroller),
              inTransition = false,
              animate = true,
              controls = $(defaults.selControls, thisScroller),
              scrlWidth,
              itemWidth,
              itemsToScroll,
              scrollTime,
              moveWidth,
              timeOut = false, 

              // Set dimensions and other parameters for scroll. Called on page load and whenever window is resized
              setupLayout = function () {
                scrlWidth = scrlItemContainer.width();
                itemWidth = $(thisScroller).find("li").eq(0).width();
                // Set the number of items to scroll
                itemsToScroll = Math.round(scrlWidth / itemWidth);

                // Set maximum number of items to scroll
                if (itemsToScroll > maxScroll) {
                  itemsToScroll = maxScroll;
                }

                // Set the scroll time, based on the number of items being scrolled
                scrollTime = itemsToScroll * timeUnit;
                // Set the width to scroll
                moveWidth = itemsToScroll * itemWidth;

                if (itemsToScroll > maxScroll) {
                  itemsToScroll = maxScroll;
                }

                // Debug log
                Site.utils.cl("maxScroll: " + maxScroll + ", " + "Items to scroll: " + itemsToScroll);
                Site.utils.cl("Scroll width: " + scrlWidth + ", " + "Item Width: " + itemWidth);
                Site.utils.cl("Items to scroll: " + itemsToScroll + ", " + "Number of items: " + scrlItems.length + ", " + "Distance to scroll: " + moveWidth);

                // If total number of items is greater than visible items, show controls...
                if (scrlItems.length > itemsToScroll) {
                  $(config.selControl, controls).show();
                } else {
                  $(config.selControl, controls).hide();
                }
              },

              // Animate/Move the scroller in the desired direction
              moveScroller = function (direction) {

                var itemsToClone;

                if (inTransition === false) {
                  inTransition = true;
                  if (direction === 'next') {
                    itemsToClone = $("li", thisScroller).slice(0, itemsToScroll).clone();
                    scrlItemContainer.append(itemsToClone);

                    if (animate === false) {
                      $("ul li", thisScroller).slice(0, itemsToScroll).remove();
                      inTransition = false;
                    } else {
                      $("li:first-child", scrlItemContainer).animate({ marginLeft: -moveWidth }, scrollTime, function () {
                        $(this).removeAttr("style");
                        $("ul li", thisScroller).slice(0, itemsToScroll).remove();
                        inTransition = false;
                      });
                    }
                  } else {
                    itemsToClone = $("li", thisScroller).slice(-itemsToScroll).clone();
                    if (animate === false) {
                      scrlItemContainer.prepend(itemsToClone);
                      $("ul li", thisScroller).slice(-itemsToScroll).remove();
                      inTransition = false;
                    } else {
                      $(itemsToClone).eq(0).css("margin-left", -moveWidth);
                      scrlItemContainer.prepend(itemsToClone);
                      $("li:first-child", scrlItemContainer).animate({ marginLeft: 0 }, scrollTime, function () {
                        $(this).removeAttr("style");
                        $("ul li", thisScroller).slice(-itemsToScroll).remove();
                        inTransition = false;
                      });
                    }
                  }
                }
              },

              // Bind user-controlled events to scroller
              bindScrollerEvents = function () {
                $(defaults.selControl, controls).on('click', function (event) {
                  event.preventDefault();
                  var direction = $(this).attr('data-action');
                  moveScroller(direction);
                });

                // Touch events - using jQuery touchwipe plugin
               $(defaults.selScrollerContent).touchwipe({
                  wipeLeft: function () { moveScroller('next'); },
                  wipeRight: function () { moveScroller('previous'); }
                });
              };

            // Debug log for configuration
            Site.utils.cl(scrollerConfig);
            Site.utils.cl(scrollerConfig.timeUnit);
            Site.utils.cl("timeUnit: " + timeUnit);

            // Rules for animating scroller:
            // If browser is IE7, don't animate transitions
            if ($("html.ie7").length > 0) {
              animate = false;
            }

            // Reset layout if window is resized
            $(window).resize(function(){
              if(timeOut !== false){
                clearTimeout(timeOut);
              }
              timeOut = setTimeout(setupLayout, 200);
            });

            // Set layout on page load
            setupLayout();
            // Bind scroller events
            bindScrollerEvents();
        },
        setupScrollers = function () {
          $(defaults.selPlugin).each(function () {
            var config = $(this).data("config");
            buildScroller(this, config);
          });
        },
        // Initialisation
        init = function () {
          setupScrollers();
          Site.utils.cl("Site.Scroller.init called");
        };

    // Return the public api
    return {
        init: init
    };

}(jQuery));