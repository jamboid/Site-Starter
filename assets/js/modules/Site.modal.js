// Site.modal.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.modal = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var modalSel = ".modalSource",
        modalCloseSel = '.cp_Modal .close',
        modalContinueSel = '.cp_Modal .continueLink a',
        modalContentSel = '.modalContent',
        modalScreenSel = '.modalScreen',
        modalTemplate = '<div class="modalContent"><div id="confirmation-popup" class="cp_Modal"><div class="in modalContentContainer"><div class="close"><a href="#">Close</a></div></div></div></div>',
        modalScreenTemplate = "<div class='modalScreen'></div>",
        $window = $(window),
        $body = $('body'),

        modalLinkSel = ".modalLink",

  /////////////
  // Classes //
  /////////////

        /**
         * Constructor for a Modal object that manages modal dialog for displaying site information and external iframes
         * @constructor
         * @parameter element (Object)
         * @parameter modalTyle (String) - can be either 'inpage' or 'iframe'
         */
        Modal = function (element, modalType) {

          var $modalSource = $(element),
              thisModalType = modalType,
              $thisModal = $(modalTemplate),
              $modalScreen = $(modalScreenTemplate),
              $closeButton = $thisModal.find(modalCloseSel),

          /**
           * Display a piece of page content in a modal window
           * @function
           */
          displayContentInModal = function () {
            if (thisModalType === 'iframe'){
              $thisModal.addClass('iframeModal');
            }
            $thisModal.find('.modalContentContainer').append($modalSource);
            $body.append($thisModal).append($modalScreen);
            positionModal();
          },

          /**
           * Display a page link in an iframe as a modal
           * @function
           */
          displayPageLinkInModal = function () {
            $thisModal.addClass('iframeModal');
            $thisModal.find('.modalContentContainer').append($modalSource);
            $body.append($thisModal).append($modalScreen);
            positionModal();
          },

          /**
           * Positions the modal optimally within the viewport
           * @function
           */
          positionModal = function () {
            var windowWidth = $window.width(),
                windowHeight = $window.height(),
                modalWidth = $thisModal.width(),
                modalHeight = $thisModal.height(),
                scrollTop = $window.scrollTop(),
                topPos = (((windowHeight-modalHeight)/2)+scrollTop)-10,
                leftPos = ((windowWidth/2)-(modalWidth/2));


            if(topPos < 0){
              topPos = 0;
            }

            if(leftPos < 0){
              leftPos = 0;
            }

            $thisModal.css('top',topPos).css('left', leftPos).addClass('displayed');
          },

          /**
           * Close the modal
           * @function
           */
          closeModal = function () {
            $thisModal.fadeOut(function () {
              $thisModal.empty();
              $thisModal.remove();
            });

            $modalScreen.fadeOut(function () {
              $modalScreen.remove();
            });
          },

          /**
           * Add event handlers for this object
           * @function
           */
          bindCustomMessageEvents = function () {

            $thisModal.on('closeModal', function (e) {
              e.preventDefault();
              closeModal();
            });

            $thisModal.on('updatelayout', function (e) {
              e.preventDefault();
              positionModal();
            });

            $modalScreen.on('closeModal', function (e) {
              e.preventDefault();
              closeModal();
            });
          },

          /**
           * Subscribe object to Global Messages
           * @function
           */
          subscribeToEvents = function () {
            $.subscribe('page/resize', function () {$(this).trigger('updatelayout');},$thisModal);
            $.subscribe('page/scroll', function () {$(this).trigger('updatelayout');},$thisModal);
          };

          /**
           * Initialise this object
           * @function
           */
          this.init = function () {

            displayContentInModal();

            /*
if (thisModalType === 'inpage') {
              displayPageContentInModal();
            } else if (thisModalType === 'iframe') {
              displayPageLinkInModal();
            }
*/

            bindCustomMessageEvents();
            subscribeToEvents();
          };
        },


        /**
         * Creates a ModalLinkManager object to manage modal links
         * @constructor
         */
        ModalLinkManager = function () {

          var $modalLinkContent = $('<div class="iframe">'),

          /**
           * Display modal content
           * @function
           */
          createModalContent = function (data) {
            var $thisModalLink = $(data.target).closest(modalLinkSel),
                modalLinkURL = $thisModalLink.attr('href'),
                $iframeScaffold = $('<iframe></iframe>');

            $modalLinkContent.empty();
            $iframeScaffold.attr('src',modalLinkURL).attr('width',600).attr('height',400);
            Site.utils.cl($iframeScaffold);
            $modalLinkContent.append($iframeScaffold);
            createModal();
          },

          createModal = function () {
             var thisNewModal = new Modal($modalLinkContent, 'iframe');
             thisNewModal.init();
          },

          /**
           * Subscribe object to Global Messages
           * @function
           */
          subscribeToEvents = function () {
            $.subscribe('display/modal', function (topic,data) { createModalContent(data); });
          };

          /**
           * Initialise this object
           * @function
           */
          this.init = function () {
            subscribeToEvents();
            //initialiseNewModalLinks();

            Site.utils.cl('modal link initialised');
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
          Site.events.delegate('click', modalCloseSel, 'closeModal');
          Site.events.delegate('click', modalContinueSel, 'closeModal');
          Site.events.delegate('click', modalScreenSel, 'closeModal');

          Site.events.global('click',modalLinkSel,'display/modal', true);
        },

        /**
         * init function for this module
         * @function
         */
        init = function () {
          Site.utils.cl("Site.modal initialised");

          // Initialise Modal object for page-load content
          /*
          $(modalSel).each(function () {
            var thisModal = new Modal(this, 'inpage');
            thisModal.init();
          });
          */
          // Initialise ModalLinkManager object to manage current and future modal links

          var thisModalLinkManager = new ModalLinkManager(this);
          thisModalLinkManager.init();

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