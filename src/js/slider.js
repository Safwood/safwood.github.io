const slider = $('.slider__list').bxSlider({
  pager: false,
  controls: false
});

$('.errow__left').click(e => {
  e.preventDefault();

  slider.goToPrevSlide();
})

$('.errow__right').click(e => {
  e.preventDefault();

  slider.goToNextSlide();
})