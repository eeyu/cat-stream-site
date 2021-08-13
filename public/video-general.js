const visitorId = 0;
const hostId = 1;

const videoGrid = document.getElementById('video-grid');
var liveStream;

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}