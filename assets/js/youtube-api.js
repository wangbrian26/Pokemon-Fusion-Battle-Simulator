// Youtube API
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "1",
    width: "1",
    // videoId: "l-EH6r9sSmQ",
    playerVars: {
      playsinline: 1,
      listType: "playlist",
      list: "PLcEun0ol29M1UipcIEScuBucnwaxQKVJb",
    },
    events: {
      onReady: onPlayerReady,
      // onStateChange: onPlayerStateChange,
    },
  });
}

// on video load, sets volume to 5/100
function onPlayerReady(event) {
  player.setVolume(5);
  player.setShuffle(true);
  event.target.playVideo();
  document.querySelector(".mute-button").addEventListener("click", muteBGM);
  document.querySelector(".start-bgm").addEventListener("click", startBGM);
}

// timeout function
// var done = false;
// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.PLAYING && !done) {
//     // setTimeout(muteBGM, 6000);
//     done = true;
//   }
// }
// function stopVideo() {
//   player.stopVideo();
// }

// function to mute video
function muteBGM() {
  if (player.isMuted()) {
    player.unMute();
  } else {
    player.mute();
  }
}

// function to start the bgm in case it doesn't load on startup
function startBGM(event) {
  if (YT.PlayerState.PAUSED) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }
}
