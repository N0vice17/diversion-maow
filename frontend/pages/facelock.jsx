// FaceDetectionComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const FaceDetectionComponent = () => {
    const webcamRef = useRef(null);
    const [isFaceVisible, setIsFaceVisible] = useState(true);

    useEffect(() => {
        const loadModelsAndDetectFaces = async () => {
            // Load face-api.js models
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

            // Get webcam video element
            const video = webcamRef.current.video;

            // Perform face detection on each video frame
            const detectFaces = async () => {
                const result = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

                if (result.length === 0) {
                    // No face detected
                    setIsFaceVisible(false);
                    // You can implement the logic to block the website here
                    // For example, redirect to a blocked page or display a blocking overlay
                    document.body.innerHTML = '<h1>Website Blocked: Face Not Visible</h1>';
                } else {
                    setIsFaceVisible(true);
                }
            };

            // Set up video event listener for face detection
            video.addEventListener('play', detectFaces);
        };

        loadModelsAndDetectFaces();
    }, []);

    return (
        <div>
            {isFaceVisible ? (
                <Webcam
                    audio={false}
                    height={480}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={640}
                />
            ) : null}
        </div>
    );
};

export default FaceDetectionComponent;
