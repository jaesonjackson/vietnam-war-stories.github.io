// Add sortable list

Sortable.create(simpleList, {
    onRemove: function (evt) {
        // console.log('Playlist items(s) removed');
    },
    onUpdate: function (evt) {
        // console.log('Playlist re-sorted');
        var newTopId = document.getElementById("simpleList").childNodes;
        var topic_id = newTopId[0].id;
        openTopicModal (topic_id);  
        updateSidebarPlaylist(); 
    },
  });

//Create playlist array
var videoPlayList = [];

//Add yt_player script
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
    video_find();
    event.target.setVolume(10);
    event.target.cuePlaylist(videoPlayList);
  } 
  // console.log("Player ready");
}

var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      //setTimeout(stopVideo, 6000);
      done = true;
    } 
    console.log("Player state changed")
  }

function stopVideo() {
    player.stopVideo();
  }

function onPlayerError(event) {
}

//Add to playlist array
function video_find() {
    var videos = document.getElementsByClassName("results-sidebar-media");
    videoPlayList = [];
    for (var i = 0; i < videos.length; i++) {
      var playListItems = videos[i].dataset.videoId;
      videoPlayList.push(playListItems);
    }
    return videoPlayList;
};

function updateSidebarPlaylist(){
  if (is_playlist_active){
      var sidebar_playlist = document.getElementById("simpleList").childNodes;
      youtube_playlist = [];
            for (var i = 0; i < sidebar_playlist.length; i++) {
                var j = sidebar_playlist[i].id;
                youtube_playlist.splice(i, 0, topics[j]);
            }
  } 
     savePlaylist();
}