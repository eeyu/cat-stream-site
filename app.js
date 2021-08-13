'use strict'

const listText = document.getElementById("textedit");
const FBPostFeedback = document.getElementById("FB-post-feedback");
const FBread = document.getElementById("FB-read");

const keystrokeLogger = new KeystrokeLogger();

var retrievedName = '';

/* 
    KEYCOUNTS
*/
document.addEventListener('keydown', (event) => {
    var name = event.key;

    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
    }
    
    switch (name) {
        case "ArrowUp":
            keystrokeLogger.incrementUp();
            break;
        case "ArrowDown":
            keystrokeLogger.incrementDown();
            break;
        case "ArrowLeft":
            keystrokeLogger.incrementLeft();
            break;
        case "ArrowRight":
            keystrokeLogger.incrementRight();
            break;
        default:
            listText.textContent = "Last Key: " + name;
            break;
    }
    updateKeyCounts(keystrokeLogger);
    
}, false);

function updateKeyCounts(keyLog) {
    document.getElementById("upkeys").textContent = "Up Counts: " + keyLog.upKey;
    document.getElementById("downkeys").textContent = "Down Counts: " + keyLog.downKey;
    document.getElementById("leftkeys").textContent = "Left Counts: " + keyLog.leftKey;
    document.getElementById("rightkeys").textContent = "Right Counts: " + keyLog.rightKey;
}

/* 
    LIVESTREAM
*/
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('existing-iframe-example', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });
}
function onPlayerReady(event) {
  player.playVideo();
}

function onPlayerStateChange(event) {
//   changeBorderColor(event.data);
}
 
/* 
    DATABASE
*/
function recordKeysAndReset() {
    sendKeysToDatabase(keystrokeLogger);
    keystrokeLogger.resetCounts();
    updateKeyCounts(keystrokeLogger);
}

function sendKeysToDatabase(keyLog) {
    firebase.database().ref('keystrokes/').set({
        up: keyLog.upKey,
        down: keyLog.downKey,
        left: keyLog.leftKey,
        right: keyLog.rightKey
    });
}

var keyLoggerRefreshRate = 500; // in ms
setInterval(recordKeysAndReset, keyLoggerRefreshRate);






