const hamburger = document.querySelector('#hamburger');
const overlay = document.querySelector('.overlay-menu');
const closeBtn = document.querySelector('.overlay-menu__btn');
const overlayLinks = document.querySelectorAll(".overlay-menu__link");

hamburger.addEventListener('click', function () {
  overlay.style.display === 'none' ? overlay.style.display = 'flex' : overlay.style.display = "none";
});

closeBtn.addEventListener('click', function() {
  overlay.style.display === "flex" ? overlay.style.display = "none" : overlay.style.display = 'flex';
});

overlayLinks.forEach (currentItem => {
    currentItem.addEventListener("click", e => {
    e.preventDefault();
    overlay.style.display = "none";
})
});

