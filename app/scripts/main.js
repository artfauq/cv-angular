$(document).ready(function() {
    $(window).on('scroll', function() {
        $('.cv-timeline-block').each(function() {
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cv-timeline-img').hasClass('is-hidden')) {
                $(this).find('.cv-timeline-img, .cv-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            }
        });
    });
});