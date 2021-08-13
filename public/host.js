const hostVideo = document.createElement('video');
hostVideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    liveStream = stream;
    addVideoStream(hostVideo, stream);
    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream);
    })
})


