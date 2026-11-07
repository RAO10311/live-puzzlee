

const camera = document.getElementById("camera");
const startBtn = document.getElementById("startBtn");
const captureBtn = document.getElementById("captureBtn");
const stopBtn = document.getElementById("stopBtn");

const statusText = document.getElementById("status");
const photoCanvas = document.getElementById("photoCanvas");

const context = photoCanvas.getContext("2d");

let stream = null;

// Start Camera
startBtn.addEventListener("click", async function () {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        camera.srcObject = stream;
        statusText.textContent = "Camera is running!";
    } catch (error) {
        statusText.textContent = "Camera access failed!";
        console.error(error);
    }
});

// Capture Photo
captureBtn.addEventListener("click", function () {
    if (!stream) {
        statusText.textContent = "Please start camera first!";
        return;
    }

    photoCanvas.width = camera.videoWidth;
    photoCanvas.height = camera.videoHeight;

    context.drawImage(
        camera,
        0,
        0,
        photoCanvas.width,
        photoCanvas.height
    );

    statusText.textContent = "Photo captured successfully!";
});

// Stop Camera
stopBtn.addEventListener("click", function () {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());

        camera.srcObject = null;
        stream = null;

        statusText.textContent = "Camera stopped.";
    }
});
