import { QRCode } from 'jsqr';
import {useEffect} from "react";

function processVideo(videoElement) {
    const canvasElement = document.createElement('canvas');
    const canvas = canvasElement.getContext('2d');

    function tick() {
        canvas.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
        const imageData = canvas.getImageData(0, 0, videoElement.videoWidth, videoElement.videoHeight);
        const code = QRCode(imageData.data, imageData.width, imageData.height);

        if (code) {
            console.log('Mã QR đã quét được:', code);
            // Xử lý mã QR ở đây (ví dụ: hiển thị lên giao diện, xử lý logic, ...)
        }

        requestAnimationFrame(tick);
    }

    tick();
}

// Ví dụ cách sử dụng trong React component
function QRScanner() {
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                const videoElement = document.createElement('video');
                videoElement.srcObject = stream;
                videoElement.play();
                document.body.appendChild(videoElement);

                processVideo(videoElement);
            })
            .catch(function (err) {
                console.error('Lỗi truy cập camera: ', err);
            });
    }, []);

    return (
        <div>
            {/* Giao diện của ứng dụng quét QR */}
        </div>
    );
}

export default QRScanner;
