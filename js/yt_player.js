var tag = document.createElement('script');
  tag.id = 'iframe-api';
  tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        playerVars: { 'autoplay': 0, 'controls': 1},
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onPlayerError': onPlayerError
        }
    });
  }
function onPlayerReady(event) {
  if (is_playlist_active == true){
    var videoList = [];
    
    Object.keys(youtube_playlist).forEach(function(key) {
    var value = youtube_playlist[key].video_id; 
    console.log(value);
    videoList.push(value);
    });
    event.target.setVolume(10);
    event.target.cuePlaylist(videoList);
  } 
}

var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      //setTimeout(stopVideo, 6000);
      done = true;
    } 
    console.log("video playing?" + done);
  }

  function stopVideo() {
    player.stopVideo();
  }

function onPlayerError(event) {
}
