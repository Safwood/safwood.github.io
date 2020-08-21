const teamNames = document.querySelectorAll(".team-member__title");

$(document).ready(() => {
  $('.team-member__title').on('click', function (e) {
    $(this).siblings('.team-member__job').toggleClass('team-member__job--active');

    $(this).css('color', "yellow");
    $(this).children('.errow-up-down').css("transform", "rotate(180deg)");

    if ($('.team-member__job').hasClass('team-member__job--active')) {
      $(this).css('color', "#292929;");
    }
    

  });
});


