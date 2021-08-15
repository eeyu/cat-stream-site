const hostVideo = document.createElement('video');
hostVideo.muted = true;
const myPeer = new Peer(hostId, {
    host: "/",
    port: "9000",
    path: "/myapp",
    // host: '/',
    // port: '3001'
})

const socket = io('/');
socket.emit('user-joined', hostId);

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    liveStream = stream;
    addVideoStream(hostVideo, stream);
    socket.on('user-connected', userId => {
        if (userId != hostId) {
            connectToNewVisitor(userId, stream);
        }
    })
    socket.emit('host-is-ready');

})

function connectToNewVisitor(userId, stream) {
    const call = myPeer.call(userId, stream);
    console.log("call has been attempted to: " + userId);
}



