const hostVideo = document.createElement('video');
hostVideo.muted = true;
const myPeer = new Peer(hostId, {
    secure: true,
    host: 'cat-stream.herokuapp.com',
    port: 3001,
    key: 'peerjs'
})

const socket = io();
socket.emit('user-joined', hostId);

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
        }
    })
})

function connectToNewVisitor(userId, stream) {
    const call = myPeer.call(userId, stream);
    console.log("call has been attempted to: " + userId);
}



