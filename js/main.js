$(document).ready(function() {
    $(window).on('load', function() {
        // Initialize
        $('#timeline').fadeIn();
        hideBlocks();
        blocksBounce();

        $('.order-by').on('click', function() {
            hideBlocks();
            blocksBounce();
        });

        $(window).on('scroll', function() {
            blocksBounce();

        });

        function hideBlocks() {
            $('.cv-timeline-block, .cv-element').each(function() {
                var offsetTop = $(this).offset().top;
                var offsetBottom = offsetTop + $(this).outerHeight();
                var windowScroll = $(window).scrollTop();
                var windowHeight = $(window).height();

                $(this).addClass('is-hidden');

                if ($(this).hasClass('bounce-in')) {
                    $(this).removeClass('bounce-in');
                }
            });
        }

        function blocksBounce() {
            $('.cv-timeline-block, .cv-element').each(function() {
                var offsetTop = $(this).offset().top;
                var offsetBottom = offsetTop + $(this).outerHeight();
                var windowScroll = $(window).scrollTop();
                var windowHeight = $(window).height();

                if ($(this).hasClass('is-hidden')) {
                    if (offsetTop <= (windowScroll + windowHeight)) {
                        $(this).removeClass('is-hidden').addClass('bounce-in');
                    }
                }
            });
        }
    });
});