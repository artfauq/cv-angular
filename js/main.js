"use strict";

function hideModal() {
  $('.timeline-block-content').each(function () {
    var modal = $(this).next('.timeline-block-modal');

    if (modal.css('visibility') === 'visible') {
      modal.fadeTo(300, 0); // eslint-disable-next-line angular/timeout-service

      setTimeout(function () {
        modal.css('visibility', 'hidden');
      }, 500);
    }
  });
}

function hideBlocks() {
  $('.timeline-block, .cv-element').each(function () {
    $(this).addClass('is-hidden');

    if ($(this).hasClass('bounce-in')) {
      $(this).removeClass('bounce-in');
    }
  });
}

function blocksBounce() {
  $('.timeline-block, .cv-element').each(function () {
    var offsetTop = $(this).offset().top;
    var windowScroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    if ($(this).hasClass('is-hidden')) {
      if (offsetTop <= windowScroll + windowHeight) {
        $(this).removeClass('is-hidden').addClass('bounce-in');
      }
    }
  });
}

$(document).ready(function () {
  $(window).on('load', function () {
    // Initialize
    $('.container').fadeIn();
    $('#timeline').fadeIn(); // Timeline blocks

    hideBlocks();
    blocksBounce(); // When the user changes the timeline order

    $('.order-by').on('click', function () {
      hideBlocks();
      blocksBounce();
    });
    $(window).on('scroll', function () {
      return blocksBounce();
    }); // Timeline modals

    $('.timeline-block-content').on('click', function () {
      var modal = $(this).next('.timeline-block-modal');

      if (modal.css('visibility') === 'hidden') {
        modal.find('.modal-close').fadeIn();
        modal.css('visibility', 'visible').fadeTo(400, 1);
      }
    });
    $('.modal-close').click(function () {
      $(this).fadeOut(150);
      setTimeout(function () {
        return hideModal();
      }, 150);
    });
    $(document).keyup(function (e) {
      // ESC key
      if (e.keyCode === 27) {
        hideModal();
      }
    });
  });
});