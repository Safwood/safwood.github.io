const link = $('.interactive-avatar__link');
const currentItem = $(link).closest(".reviews__switcher-item");

$('.interactive-avatar__link').on('click', e => {
  e.preventDefault();

  $(currentItem).addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
})