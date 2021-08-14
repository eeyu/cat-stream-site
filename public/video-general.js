const visitorId = 2;
const hostId = 1;

const videoGrid = document.getElementById('video-grid');

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}