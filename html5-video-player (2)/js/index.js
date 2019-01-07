var baseVideoURL = "http://philhuffstickler.com/html5video/videos/";
var baseVideoPosterURL = "http://philhuffstickler.com/html5video/posters/poster_";
//var baseVideoTrackURL = "http://philhuffstickler.com/html5video/tracks/track_"
var baseVideoTrackURL = "http://philhuffstickler.com/media/track_";
//var baseLiveVideoURL = "192.168.1.197:1935/livedemo/";
//var baseLiveVideoURL = "http://52fa2e.entrypoint.cloud.wowza.com/app-32cd/ngrp:075194e3_all/playlist.m3u8";


/* Video Player Variables */
var videoComponent = document.getElementById("videoComponent");
var videoPlayerMenu = document.getElementById("videoPlayerMenu");
var videoPlayer = document.getElementById("videoPlayer");
var videoPreloader = document.getElementById("videoPreloader");
var curVideoPoster;

/* Video States Variables */
var isVideoPaused = true;
var videoCaptionsEnabled = false;
var videoClosedCaptions;
var curTextTrack;
var curAudioLevel = .5;
var isVideoLive = false;

/* Video Control Variables */
var videoControls = document.getElementById("videoControls");
var videoProgressScrubber = document.getElementById("videoProgressScrubber");
var videoProgressFill = document.getElementById("videoProgressFill");
var videoBufferProgressFill = document.getElementById("videoBufferProgressFill");
var videoPlayPauseBtn = document.getElementById("playPauseBtn");
var videoProgressText = document.getElementById("videoProgressText");
var videoClosedCaptionsBtn = document.getElementById("closedCaptionsBtn");
var videoVolumeBtn = document.getElementById("videoVolumeBtn");
var videoVolumeSlider = document.getElementById("videoVolumeSlider");
var videoExternalDisplayBtn = document.getElementById("videoExternalDisplayBtn");
var videoFullscreenBtn = document.getElementById("fullscreenBtn");

/* Device Variables */
var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
var isSafari = /Safari/.test(navigator.userAgent);
var isIE11Below = /Trident/.test(navigator.userAgent);
//console.log("user agent: " + navigator.userAgent);
//console.log("is IE 11 or below: " + isIE11Below);
var isAndroid = /Android/.test(navigator.userAgent) && !window.MSStream;
var supportsHTML5Video = !!videoPlayer.canPlayType;

function init(){

  if (supportsHTML5Video) {
    videoPlayer.controls = false;
    videoPlayerMenu.removeAttribute('disabled');
    videoProgressScrubber.value = 0;
    videoClosedCaptionsBtn.style.visibility = 'hidden';

    if(isiOS || isAndroid){
      videoPlayer.muted = true;
      videoPlayer.autoplay = true;
      videoVolumeBtn.className = "icon-volume-eks";
    }

    if (window.WebKitPlaybackTargetAvailabilityEvent) {
      videoPlayer.addEventListener('webkitplaybacktargetavailabilitychanged', function(event) {
        switch (event.availability) {
          case "available":
            videoExternalDisplayBtn.style.display = 'inline-block';
            break;

          default:
            videoExternalDisplayBtn.style.display = 'none';
                                  }

        videoExternalDisplayBtn.addEventListener('click', function() {
          videoPlayer.webkitShowPlaybackTargetPicker();
        });
      });
    } else {
      videoExternalDisplayBtn.style.display = 'none';
    }

  }
}
init();


/* Player Methods --------------------------------------- */
function togglePlayPause(){
  videoPlayPauseBtn.className = videoPlayer.paused ? 'icon-pause' : 'icon-play';
  if (videoPlayer.paused || videoPlayer.ended) {
    isVideoPaused = false; 
    videoPlayer.play();
  }
  else {
    isVideoPaused = true; 
    videoPlayer.pause();
  }
}

function toggleVolumeMute(){
  //alert('toggle volume')
  videoPlayer.muted = !videoPlayer.muted;
  videoVolumeBtn.className = !videoPlayer.muted ? 'icon-volume-high' : 'icon-volume-eks';
  // if(videoPlayer.volume == 0) {
  //   videoPlayer.volume = curAudioLevel;
  //   videoVolumeSlider.value = curAudioLevel;
  // }
  // else {
  //   videoPlayer.volume = 0;
  //   videoVolumeSlider.stepDown(+100);
  //   curAudioLevel = 0;
  // }
}

function loadVideo(videoFileName,hasCaptions){
  //console.log("hasCaptions: " + hasCaptions);
  curTextTrack = hasCaptions ? baseVideoTrackURL + videoFileName + (isIE11Below ? '.ttml' : '.vtt') : null;
  //videoPlayer.autoplay = true;
  isLive = videoFileName.search('.live') > -1;
  console.log("isLive: " + isLive);
  videoProgressFill.className = !isLive ? "video-progress-fill" : "video-progress-fill live";
  videoClosedCaptionsBtn.style.display = !isLive ? "inline-block" : "none";
  if(isLive){
    //console.log("LIVE: " + videoFileName.replace(".live",""));
    var streamName = videoFileName.replace(".live","");
    videoProgressText.innerHTML = "LIVE";
    if(isSafari){
      //videoPlayer.src = baseLiveVideoURL;
      //videoPlayer.src = "http://"+ baseLiveVideoURL + streamName +"/playlist.m3u8"; //ios and safari
      videoPlayer.src = "http://52fa2e.entrypoint.cloud.wowza.com/" + streamName + "/ngrp:075194e3_all/playlist.m3u8";
    }else{ 
      videoPlayer.src = "rtsp://" + baseLiveVideoURL + streamName; //android and others
    }

    videoProgressScrubber.style.display = 'none';
    isVideoLive = true;

  }else{
    videoPlayer.type = "video/mp4";
    videoPlayer.poster = baseVideoPosterURL + videoFileName + ".jpg";
    videoPlayer.src = baseVideoURL + videoFileName + ".mp4";
    videoClosedCaptionsBtn.removeAttribute('disabled');
    videoProgressScrubber.style.display = 'inline-block';
    isVideoLive = false;
  }

  resetVideoProgress();
  videoPlayer.play();
  isVideoPaused = false;
  videoPlayPauseBtn.removeAttribute('disabled');
  videoProgressScrubber.removeAttribute('disabled');
  videoVolumeBtn.removeAttribute('disabled');
  videoFullscreenBtn.removeAttribute('disabled');

  videoPlayer.removeAttribute('disabled');
  videoProgressText.removeAttribute('disabled');
  videoExternalDisplayBtn.removeAttribute('disabled');
}

function simulateClick() {
  var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  var canceled = !videoPlayer.dispatchEvent(event);
  if (canceled) {
    // A handler called preventDefault.
    alert("canceled");
  } else {
    // None of the handlers called preventDefault.
    //alert("not canceled");
    videoPlayer.play();
  }
}


function disableVideoPlayer(){
  videoPlayer.pause();
  videoProgressText.innerHTML = "0:00 / 0:00";
  videoProgressFill.style.width = 0 + '%';
  videoProgressScrubber.value = "0";
  videoPlayPauseBtn.setAttribute('disabled','disabled');
  videoProgressScrubber.setAttribute('disabled','disabled');
  videoVolumeBtn.setAttribute('disabled','disabled');
  videoFullscreenBtn.setAttribute('disabled','disabled');
  videoClosedCaptionsBtn.setAttribute('disabled','disabled');
  videoPlayer.setAttribute('disabled','disabled');
  //videoPlayer.src = null;
  videoProgressText.setAttribute('disabled','disabled');
}

function resetVideoProgress(){
  videoProgressFill.style.width = 0 + '%';
  videoProgressScrubber.value = 0;
}

function loadTextTrack(){
  console.log('curTextTrack--------------- ' + curTextTrack) 
  videoClosedCaptionsBtn.style.visibility = curTextTrack == null ? 'hidden' : 'visible';

  // if(!curTextTrack){
  //   console.log('text track null')
  //   if(videoClosedCaptions !== null) videoClosedCaptions.parentNode.removeChild(videoClosedCaptions);
  // }
  // if(!videoClosedCaptions){
  //   console.log('videoClosedCaptions null')
  //   videoClosedCaptions.parentNode.removeChild(videoClosedCaptions);
  // }
  if(videoClosedCaptions) videoClosedCaptions.parentNode.removeChild(videoClosedCaptions);
  if(curTextTrack != null){
    //console.log("add track");
    videoClosedCaptions = document.createElement("track");
    videoClosedCaptions.kind = "captions"; //subtitles, captions, chapters, descriptions, metadata
    videoClosedCaptions.srclang = "en"; //language code required if kind="subtitles"
    videoClosedCaptions.label = "English"; //unique reference for the text track
    videoClosedCaptions.src = curTextTrack;
    videoPlayer.appendChild(videoClosedCaptions);
  }else{
    videoClosedCaptions = null;
  }

  // var videoClosedCaptionsCanada = document.createElement("track");
  // videoClosedCaptionsCanada.kind = "captions"; //subtitles, captions, chapters, descriptions, metadata
  // videoClosedCaptionsCanada.srclang = "ca"; //language code required if kind="subtitles"
  // videoClosedCaptionsCanada.label = "Canadian Track Name"; //unique reference for the text track
  // videoClosedCaptionsCanada.src = curTextTrack;
  // videoPlayer.appendChild(videoClosedCaptionsCanada);

  //console.log(videoPlayer.textTracks)
}

function toggleCaptions(){
  /* If Canada is available, textTracks[1] should exists*/
  //console.log("texttracks[0] : " + videoPlayer.textTracks[0])
  if(videoPlayer.textTracks[0]){
    videoCaptionsEnabled = videoPlayer.textTracks[0].mode == "showing" ? false : true;
    videoClosedCaptionsBtn.style.color = videoCaptionsEnabled ? "#3485e7" : "#fff";
    videoPlayer.textTracks[0].mode = videoPlayer.textTracks[0].mode == "showing" ? "hidden" : 'showing';
  }
}

function fullscreenHandler(){
  var isFullscreen = document.fullScreen || document.msfullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement; // msFullscreenElement is for IE
  //console.log('exitFullscreenHandler: ' + isFullscreen);
  videoFullscreenBtn.className = isFullscreen ? 'fullscreen-btn icon-pinch' : 'fullscreen-btn icon-pinch-out';
}

function toggleFullScreen(){
  var isFullscreen = document.fullScreen || document.msfullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement; // msFullscreenElement is for IE 11

  //alert('isFullscreen: ' + isFullscreen)
  if(isiOS) {
    videoPlayer.pause();
    videoPlayer.removeAttribute('playsinline');
    videoPlayer.play();
    return;
  }

  if(isFullscreen){
    //alert('close fullscreen');
    videoFullscreenBtn.className = 'fullscreen-btn icon-pinch-out';
    if(document.cancelFullScreen) {
      document.cancelFullScreen();

    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();

    }else if(document.msCancelFullScreen) {
      document.msCancelFullScreen();

    } else if(document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();

    } else if(document.msExitFullscreen) {
      document.msExitFullscreen(); //IE11
    }

  }else{
    //alert('open fullscreen');
    if(videoComponent.requestFullScreen) {
      videoComponent.removeEventListener('fullscreenchange', fullscreenHandler, false);
      videoComponent.addEventListener('fullscreenchange', fullscreenHandler, false);
      videoComponent.requestFullScreen();

    } else if(videoComponent.mozRequestFullScreen) {
      //Firefox uses document instead of element for event listener
      document.removeEventListener('mozfullscreenchange', fullscreenHandler, false);
      document.addEventListener('mozfullscreenchange', fullscreenHandler, false);
      videoComponent.mozRequestFullScreen();

    }else if(videoComponent.webkitRequestFullScreen) {
      videoComponent.removeEventListener('webkitfullscreenchange', fullscreenHandler, false);
      videoComponent.addEventListener('webkitfullscreenchange', fullscreenHandler, false);
      videoComponent.webkitRequestFullScreen(); 

    } else if(videoComponent.msRequestFullscreen){
      //IE 11 uses document instead of element for event listener
      document.removeEventListener('MSFullscreenChange', fullscreenHandler, false);
      document.addEventListener('MSFullscreenChange', fullscreenHandler, false);
      videoComponent.msRequestFullscreen(); //IE11
    }
  }
}

/* Menu Controls ------------------------------- */

videoPlayerMenu.addEventListener('change', function(event) { 
  var hasCaptions = this.options[this.options.selectedIndex].title == "closed captions available";
  loadVideo(this.value,hasCaptions ? this.value : null );
}, false);


/* Video Controls Events ------------------------------- */

videoPlayPauseBtn.addEventListener('click', function(event) { 
  togglePlayPause();
}, false);

videoClosedCaptionsBtn.addEventListener('click', function(event) { 
  toggleCaptions();
}, false);

videoVolumeBtn.addEventListener('click', function(event) { 
  toggleVolumeMute();
}, false);

videoFullscreenBtn.addEventListener('click', function(event) { 
  toggleFullScreen();
}, false);

// videoVolumeSlider.oninput = function(){
//   var curVol = this.value / 100;
//   //console.log(curVol)
//   if(curVol == 0){
//     videoVolumeBtn.className = 'icon-volume-eks'; 
//   }
//   else if(curVol >= 0 && curVol < .35 ) {
//     videoVolumeBtn.className = 'icon-volume-low';
//   }
//   else if(curVol >= .35 && curVol < .75){
//     videoVolumeBtn.className = 'icon-volume-medium';
//   }else{
//     videoVolumeBtn.className = 'icon-volume-high';
//   }
//   videoPlayer.volume = curVol;
//   curAudioLevel = curVol;
// }


/* Video Scrubber Events -------------------------------------------- */

videoProgressScrubber.addEventListener('input', function(event) { 
  videoPlayer.currentTime = this.value;  
}, false);

videoProgressScrubber.addEventListener('change', function(event) { 
  videoPlayer.currentTime = this.value;  
}, false);


/* Video Element Events --------------------------------------------  */

videoPlayer.addEventListener('timeupdate', function(event) { 
  videoPreloader.style.display = 'none';
  //console.log(curTextTrack);
  videoProgressFill.className = isLive == true ? "video-progress-fill live" : "video-progress-fill";



  // var videoBuffer = this.buffered;
  // var videoBufferStart = videoBuffer.start(0);
  // var videoBufferEnd = videoBuffer.end(0);
  // var videoBufferedProgressTime = (this.buffered.end(0) / this.duration) *100;
  // videoBufferProgressFill.style.width = Math.round(videoBufferedProgressTime) + '%';
  //console.log('time update');
  videoProgressFill.style.width = isVideoLive ? '100%' : (Math.floor((this.currentTime / this.duration) * 100)) + "%";
  videoProgressScrubber.value = Math.floor(this.currentTime);

  var curTime = Math.round(this.currentTime);
  var curH = Math.floor(curTime / 3600);
  var curM = Math.floor(curTime % 3600 / 60);
  var curS = Math.floor(curTime % 3600 % 60);

  var durTime = Math.round(this.duration);
  var durH = Math.floor(durTime / 3600);
  var durM = Math.floor(durTime % 3600 / 60);
  var durS = Math.floor(durTime % 3600 % 60);
  if(isVideoLive){
    videoProgressText.innerHTML = "LIVE";
  }else{
    if(durH > 0){
      videoProgressText.innerHTML = videoProgressText.innerHTML = ("00"+curH).slice(-2) + ("00"+curM).slice(-2) + ":" + ("00"+curS).slice(-2) + " / " + ("00"+durM).slice(-2) + ":" + ("00"+durS).slice(-2);
    }else{
      videoProgressText.innerHTML = ("00"+curM).slice(-2) + ":" + ("00"+curS).slice(-2) + " / " + ("00"+durM).slice(-2) + ":" + ("00"+durS).slice(-2);
    } 
  }

}, false);


videoPlayer.addEventListener('click', function(event) { 
  togglePlayPause();
}, false);

if(isiOS){
  videoPlayer.addEventListener('webkitendfullscreen', function() { 
    videoPlayer.controls = false;
  }, false);

  videoPlayer.addEventListener('webkitbeginfullscreen', function() {
    console.log('webkitbeginfullscreen');
    videoFullscreenBtn.className = 'fullscreen-btn icon-pinch-out';
    videoPlayer.setAttribute('playsinline','true');
  }, false);
}

videoPlayer.addEventListener('ended', function(event) { 
  videoPlayPauseBtn.className = 'icon-play';
}, false);

videoPlayer.addEventListener('waiting', function(event) { 
  videoPreloader.style.display = 'block';
}, false);

videoPlayer.addEventListener('suspend', function(event) { 
  // console.log('suspend')
  videoPreloader.style.display = 'hidden';
}, false);

videoPlayer.addEventListener('loadedmetadata', function(event) { 
  //console.log("Video Duration: " + this.duration)
  videoProgressScrubber.max = Math.floor(this.duration);
  loadTextTrack();
}, false);

videoPlayer.addEventListener('error', function(event) {
  //console.log(event.target.error);
  switch (event.target.error.code){
    case 4:
      console.log("Video src format not supported")
      return;
    case 3:
      console.log("Video src decoding error")
      return;
    case 2:
      console.log("Network error when attempting to connect to video src")
      return;
    case 1:
      console.log("Connection to video src aborted")
      return;
    default:
      console.log("Unknown video error")
                                 }
}, false);




/* Keyboard Event -------------------------------------------- */

document.addEventListener("keydown", function(e) {
  //console.log(e.keyCode);
  var isFullscreen = document.fullScreen || document.msfullScreen || document.mozFullScreen || document.webkitIsFullScreen;

  switch(e.keyCode){
    case 80: //P
      //togglePlayPause();
    case 70: //F
      //toggleFullScreen();
    case 32: //SPACEBAR
      //having this on causes issues with keyboard usability
      //       alert(videoPlayPauseBtn === document.activeElement)
      //       if(videoPlayPauseBtn === document.activeElement){

      //       }else{
      //         togglePlayPause();
      //       }

      //       if(isFullscreen){
      //         if(videoFullscreenBtn !== document.activeElement){
      //           togglePlayPause();
      //         }
      //       }

    case 13: //ENTER/RETURN

    default:
                  }
}, false);