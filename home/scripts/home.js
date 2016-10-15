// @codekit-prepend "slick.js"

$('.slick-slider').slick({
    dots: true,
    speed: 600,
    fade: false,
    adaptiveHeight: false,
    infinite: true,
    swipe: false,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"></button>',
    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"></button>',
    responsive: [
    {
      breakpoint: 640,
      settings: {
        infinite: true,
        swipe: true
      }
    }]
});

$(".slick-list").focus();

$('.slick-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    $(".bg." + currentSlide).fadeOut();
    $(".bg." + nextSlide).fadeIn();
});
