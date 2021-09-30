const hostVideo = document.createElement('video');
hostVideo.muted = true;
const myPeer = new Peer(hostId, {
    secure: true,
    host: 'peerjs-for-cat.herokuapp.com',
    port: 443,
    key: 'peerjs'
})

const socket = io();
socket.emit('user-joined', hostId);

const refreshInterval = 10 * 60 * 1000;
var refresher = setTimeout(refresh, refreshInterval);

function refresh() {
    location.reload();
}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    liveStream = stream;
    addVideoStream(hostVideo, stream);
    socket.emit('host-is-ready');
    socket.on('user-connected', userId => {
        if (userId != hostId) {
            connectToNewVisitor(userId, stream);
            clearTimeout(refresher);
            refresher = setTimeout(refresh, refreshInterval);
        }
    })
})

function connectToNewVisitor(userId, stream) {
    const call = myPeer.call(userId, stream);
    console.log("call has been attempted to: " + userId);
}


function resetKeylog() {
    firebase.database().ref('keystrokes/').set({
        up: 0,
        down: 0,
        left: 0,
        right: 0
    });
}






