var tag = document.createElement('script');
  tag.id = 'iframe-api';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;
  var embedded_id;

  embedded_id = document.getElementById('yt-player').src;


  function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        playerVars: { 'autoplay': 1, 'controls': 0 },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onPlayerError': onPlayerError
        }
    });
  }
  function onPlayerReady(event) {
    document.getElementById('yt-player').style.borderColor = '#FF6D00';
  }
  function changeBorderColor(playerStatus) {
    var color;
    if (playerStatus == -1) {
      color = "#37474F"; // unstarted = gray
    } else if (playerStatus == 0) {
      color = "#FFFF00"; // ended = yellow
    } else if (playerStatus == 1) {
      color = "#33691E"; // playing = green
    } else if (playerStatus == 2) {
      color = "#DD2C00"; // paused = red
    } else if (playerStatus == 3) {
      color = "#AA00FF"; // buffering = purple
    } else if (playerStatus == 5) {
      color = "#FF6DOO"; // video cued = orange
    }
    if (color) {
      document.getElementById('yt-player').style.borderColor = color;
    }
  }
  function onPlayerStateChange(event) {
    changeBorderColor(event.data);
  }

  function onPlayerReady(event) {
  event.target.setVolume(10);
  event.target.playVideo();
}

  function onPlayerError(event) {

}