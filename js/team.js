$(document).ready(() => {

  const openItem = (elem) => {
    const item = elem.closest(".team-members__item");
    const hidingBlock = item.find(".team-member__block");
    const contentBlock = hidingBlock.find(".team-member__desc");
    const height = contentBlock.height();

    hidingBlock.height(height);
    item.addClass('active');

  }

  const closeAllItems = (container) => {
    const items = container.find('.team-member__block');
    items.height(0);

  }

  $('.team-member__title').on('click', function (e) {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const container = $this.closest('.team-members__list');
    const wrapper = $this.closest('.team-members__item');

    if (wrapper.hasClass('active')) {
      closeAllItems(container);
      wrapper.removeClass('active');
    } else {
      closeAllItems(container);
      openItem($this);
    }
    
  });
});


