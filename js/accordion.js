const mesureWidth = item => {
  const screenWidth = $(window).width();
  const container = item.closest(".product-menu__list");
  const titleBlocks = container.find(".product-menu__item-link");
  const titlesWidth = titleBlocks.width() * titleBlocks.length;

  const isMobile = window.matchMedia("(max-width:768px").matches;

  if (isMobile) {
    return screenWidth - titlesWidth;
  } else {
    return 500;
  }
}

const openItem = (link) =>{
  const wrapper = link.closest(".product-menu__item");
  const text = wrapper.find(".product-menu__item-desc");
  const reqWidth = mesureWidth(link);
  text.width(reqWidth);
  wrapper.addClass("active");
}

const closeAllItems = (container) => {
  const items = container.find(".product-menu__item");
  const content = items.find(".product-menu__item-desc");
  content.width('0');
}

$(".product-menu__item-link").click(e => {
  e.preventDefault();

  const link = $(e.currentTarget);
  const container = link.closest(".product-menu__list");
  const AllItems = link.closest('.product-menu__item');

  if (AllItems.hasClass('active')) {
    closeAllItems(container);
    AllItems.removeClass('active');
  } else {
    closeAllItems(container);
    openItem(link);
  }
})