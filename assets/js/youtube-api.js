// Youtube API
//  This code loads the IFrame Player API code asynchronously.
var battleButton = document.querySelector("#battle");

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  var numPl = Math.floor(Math.random() * 50 + 1);
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    // videoId: "l-EH6r9sSmQ",
    playerVars: {
      playsinline: 1,
      listType: "playlist",
      list: "PLcEun0ol29M1UipcIEScuBucnwaxQKVJb",
      index: numPl,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

// on video load, sets volume to 5/100
function onPlayerReady(event) {
  player.setVolume(5);
  player.setShuffle(true);
  document.querySelector("#mute-button").addEventListener("click", muteBGM);
}

// function to mute video
function muteBGM() {
  if (player.isMuted()) {
    player.unMute();
  } else {
    player.mute();
  }
}

// function to start the bgm
function startBGM(event) {
  if (YT.PlayerState.PAUSED) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }
}

battleButton.addEventListener("click", startBGM);
