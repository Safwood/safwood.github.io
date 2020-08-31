const sections = $("section");
const display = $(".maincontent");
let inScroll = false;

sections.first().addClass("active");

const performTransform = sectionEq => {
  const position = sectionEq * -100;

  const currentSection = sections.eq(sectionEq);
        const menuTheme = currentSection.attr("data-sidemenu-theme");
        const sideMenu = $(".fixed-menu")

        if (menuTheme == "shadow") {
          sideMenu.addClass('fixed-menu--shadowed');
        } else {
          sideMenu.removeClass('fixed-menu--shadowed');
        }

  display.css({
    transform: `translateY(${position}%)`
  })

  sideMenu.find("fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");
}

const scrollViewport = direction => {

  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();


  if (direction == "next" && nextSection.length) {
    if (inScroll == false) {
      inScroll = true
      activeSection.removeClass("active")
      nextSection.addClass("active");
      performTransform(nextSection.index());
      setTimeout(() => {
        inScroll = false
      }, 1300)

    }
    
  }
  if (direction == "prev" && prevSection.length){
    if (inScroll == false) {
      inScroll = true
      activeSection.removeClass("active")
      prevSection.addClass("active");
      performTransform(prevSection.index());
      setTimeout(() => {
        inScroll = false

        sideMenu.find("fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");

      }, 1100)
    }
  }
}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollViewport("next");
  }

  if (deltaY < 0) {
    scrollViewport("prev");
  }
})

$(window).on("keydown", (e) =>{
const tagName = e.target.tagName.toLowerCase();

if (tagName !== "input" && tagName !=="textarea") {
  switch (e.keyCode) {
    case 38:
      scrollViewport("prev");
      break;
  
      case 40:
        scrollViewport("next");
      break;
  }
}
})

$("[data-scroll-to]").click(e =>{
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const targetSection = $(`[data-section-id=${target}]`);
  performTransform(targetSection.index());
})

//github.com/mattbryson/TouchSwipe-Jquery-Plugin
$("body").swipe({
  swipe:function (event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";

      if (direction == "up") {
        scrollDirection = "next"
      }
      if (direction == "down") {
        scrollDirection = "prev"
      }
      scroller[scrollDirection]();
    }
});
