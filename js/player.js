let player;
const playerContainer = $(".player");

let events = () => {
  $(".player__start").click(e => {
    e.preventDefault();

    const btn = $(e.currentTarget);
    
    if (playerContainer.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  })
}

$(".player__playback").click(e => {
  const bar = $(e.currentTarget);
  const clickedPosition = e.originalEvent.layerX;
  const clickedPercents = (clickedPosition / bar.width()) * 100;
  const newPositionSec = (player.getDuration() / 100 * clickedPercents);

  $(".player__playback-button").css({
    left: `${clickedPercents}%`
  })

  player.seekTo(newPositionSec);
});

$(".player__splash").click(() => {
  player.playVideo();
})

const formatTime = (timeSeconds) => {
  const roundTime = Math.round(timeSeconds);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero (num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes} : ${seconds}`;
}

const onPlayerStateChange = event => {
  switch (event.data) {
    case 1:
      playerContainer.addClass("paused");
      playerContainer.addClass("active");
      break;

    case 2:
      playerContainer.removeClass("paused");
      break;
  }
}

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== undefined) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = completedSec / durationSec * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    })
    $(".player__duration-completed").text(formatTime(completedSec))
  }, 1000);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '392',
    width: '660',
    videoId: '6eHN3daGoYQ',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 1
    }
  })
}

events();