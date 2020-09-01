const mesureWidth = item => {
  let reqItemsWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".product-menu__list");
  const titleBlocks = container.find(".product-menu__item-link");
  const titlesWidth = titleBlocks.width() * titleBlocks.length;
  const oneTitleWidth = titleBlocks.width();
  const textContainer = container.find(".product-menu__item-text");
  const paddingRight = parseInt(textContainer.css("padding-right"));
  const paddingLeft = parseInt(textContainer.css("padding-left"));

  const isTablet = window.matchMedia("(max-width:768px").matches;
  const isMobile = window.matchMedia("(max-width:480px").matches;

  if (isTablet) {
    reqItemsWidth = screenWidth - titlesWidth;
  } if (isMobile) {
    reqItemsWidth = screenWidth - oneTitleWidth;

  } 
  else {
    reqItemsWidth = 320;
  }

  return {
    container: reqItemsWidth,
    textContainer: reqItemsWidth - paddingRight - paddingLeft
  }
}

const openItem = (link) =>{
  const wrapper = link.closest(".product-menu__item");
  const text = wrapper.find(".product-menu__item-desc");
  const reqWidth = mesureWidth(link);
  const textBlock = wrapper.find(".product-menu__item-text")
  text.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
  wrapper.addClass("product-menu__item--active");
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

  if (AllItems.hasClass('product-menu__item--active')) {
    closeAllItems(container);
    AllItems.removeClass('product-menu__item--active');
  } else {
    closeAllItems(container);
    openItem(link);
  }
})