$(document).ready(() => {
  $(window).on('load', () => {
    // Initialize
    $('.container').fadeIn();
    $('#timeline').fadeIn();

    // Timeline blocks
    hideBlocks();
    blocksBounce();

    // When the user changes the timeline order
    $('.order-by').on('click', () => {
      hideBlocks();
      blocksBounce();
    });

    $(window).on('scroll', () => {
      blocksBounce();
    });

    // Timeline Modals
    $('.timeline-block-content').on('click', function() {
      const modal = $(this).next('.timeline-block-modal');
      if (modal.css('visibility') === 'hidden') {
        modal.find('.modal-close').fadeIn();
        modal.css('visibility', 'visible').fadeTo(400, 1);
      }
    });

    $('.modal-close').click(function() {
      $(this).fadeOut(150);
      // eslint-disable-next-line angular/timeout-service
      setTimeout(() => {
        hideModal();
      }, 150);
    });

    $(document).keyup(e => {
      // ESC key
      if (e.keyCode === 27) {
        hideModal();
      }
    });

    // Functions
    function hideModal() {
      $('.timeline-block-content').each(function() {
        const modal = $(this).next('.timeline-block-modal');
        if (modal.css('visibility') === 'visible') {
          modal.fadeTo(300, 0);
          // eslint-disable-next-line angular/timeout-service
          setTimeout(() => {
            modal.css('visibility', 'hidden');
          }, 500);
        }
      });
    }

    function hideBlocks() {
      $('.timeline-block, .cv-element').each(function() {
        $(this).addClass('is-hidden');

        if ($(this).hasClass('bounce-in')) {
          $(this).removeClass('bounce-in');
        }
      });
    }

    function blocksBounce() {
      $('.timeline-block, .cv-element').each(function() {
        const offsetTop = $(this).offset().top;
        const windowScroll = $(window).scrollTop();
        const windowHeight = $(window).height();

        if ($(this).hasClass('is-hidden')) {
          if (offsetTop <= windowScroll + windowHeight) {
            $(this)
              .removeClass('is-hidden')
              .addClass('bounce-in');
          }
        }
      });
    }
  });
});
