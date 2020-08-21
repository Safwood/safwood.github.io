const slider = $('.slider__list').bxSlider({
  pager: false,
  controls: false
});

$(".errow__right").on('click', e => {
  e.preventDefault();
  slider.goToNextSlide();
})

$(".errow__left").on('click', e => {
  e.preventDefault();
  slider.goToPrevSlide();
})