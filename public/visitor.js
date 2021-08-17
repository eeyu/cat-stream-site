'use strict'
const myPeer = new Peer(undefined, {
    secure: true,
    host: 'peerjs-for-cat.herokuapp.com',
    port: 443,
    key: 'peerjs'
})

var peerId = 0;

const visitorVideo = document.createElement('video');
visitorVideo.muted = true;


function unmute() {
    visitorVideo.muted = !visitorVideo.muted;
}

const listText = document.getElementById("textedit");
const FBPostFeedback = document.getElementById("FB-post-feedback");
const FBread = document.getElementById("FB-read");

const keystrokeLogger = new KeystrokeLogger();
var numberKeySelect = 0;

/* 
    KEYCOUNTS
*/
document.addEventListener('keydown', (event) => {
    var name = event.key;
    console.log(event.code)

    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
    }

    if(["Digit1","Digit2","Digit3","Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0"].indexOf(event.code) > -1) {
        numberKeySelect = parseInt(name);
        console.log(numberKeySelect - 1);
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
    SOCKETS
*/
const socket = io();

myPeer.on('open', id => {
    socket.emit('user-joined', id);
    console.log("socket opened");

    peerId = id;
})

socket.on('user-connected', userId => {
     console.log("heard socket say user-connected");
    if (userId == hostId) {
        console.log("Host has connected");
    }
})

socket.on('host-is-ready', () => {
    console.log("host is ready");
    socket.emit('user-joined', peerId);
})

connectToHost();

socket.on('user-disconnected', (userId) => {
    if (userId == hostId) {
        console.log("Host has disconnected");
    }
})

// this doesn't distinguish between hosts...should call something else?
function connectToHost() {
    myPeer.on('call', call => {
        console.log("call has been detected");
        call.answer();
        call.on('stream', hostVideoStream => {
            console.log("Host video detected");
            addVideoStream(visitorVideo, hostVideoStream);
        });
    });
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

function recordNumberAndReset() {
    sendNumberSelectToDatabase(numberKeySelect);
    numberKeySelect = 0;
}

function sendNumberSelectToDatabase(number) {
    firebase.database().ref('number/').set({
        selection: number
    });
}

var keyLoggerRefreshRate = 500; // in ms
setInterval(recordKeysAndReset, keyLoggerRefreshRate);

var buttonRefreshRate = 100; // in ms
setInterval(recordNumberAndReset, buttonRefreshRate);






