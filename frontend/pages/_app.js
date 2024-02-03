
import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { Footer, NavBar, StepNavigator } from './components';
import { useCallback, useEffect, useRef } from 'react';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'mumbai';

function MyApp({ Component, pageProps }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const loadModelAndPredict = useCallback(async (video) => {
    try {
      const model = await cocoSsd.load();
      const predictions = await model.detect(video);
      const isAcceptable = predictions.every(p => p.class === "person");
      setAcceptVote(isAcceptable);
    } catch (error) {
      console.error("Model prediction error:", error);
    }
  }, []);

  useEffect(() => {
    let video;
    let stream;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    const captureImage = () => {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the captured image to a data URL
      const imageData = canvas.toDataURL('image/png');
      console.log(imageData);
      dataUrl = canvas.toDataURL('image/png');

      // Make a POST request to your backend
      fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: dataUrl })
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the backend
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    function dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }

    const startVideoStream = async () => {
      try {
        video = document.getElementById("video");
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.onloadeddata = () => loadModelAndPredict(video);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    startVideoStream();
    startCamera();
    captureImage();

    const intervalId = setInterval(() => loadModelAndPredict(video), 60 * 1000);

    return () => {
      clearInterval(intervalId);
      if (video) {
        video.onloadeddata = null;
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [loadModelAndPredict]);
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={"fe976d6781818072a8ce5d941a20af"}
    >
      <div className="bg-gray-100 flex flex-col items-center min-h-screen w-screen">
        <video id="video" ref={videoRef} autoPlay className=""></video>
        <div className="flex-grow flex flex-col gap-8 m-5 max-w-xl w-full">
          <StepNavigator />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
