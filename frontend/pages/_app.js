import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { Faq, Footer, StepNavigator } from './components';
import { useCallback, useEffect, useRef } from 'react';
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import { AadharProvider } from '../components/AdharContext';
import { VoterIdProvider } from '../components/VoterContext';
import { AcceptVoterContextProvider, useAcceptVoterContext } from '../components/AccptVoterContext';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'mumbai';

function MyApp({ Component, pageProps }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { setAcceptVoter } = useAcceptVoterContext()
  const loadModelAndPredict = useCallback(async (video) => {
    try {
      const model = await cocoSsd.load();
      const predictions = await model.detect(video);
      const isAcceptable = predictions.every(p => p.class === "person");
      console.log("LOG: cocossd -> ", isAcceptable);
      setAcceptVoter(isAcceptable)
    } catch (error) {
      console.error("Model prediction error:", error);
    }
  }, []);

  const captureImageAndSend = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the captured image to a data URL
    const dataUrl = canvas.toDataURL('image/png');

    if (dataUrl === "data:") {
      console.log("LOG: camera not read");
      return
    }

    // Make a POST request to your backend
    // fetch('http://127.0.0.1:5000/upload', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ image: dataUrl })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle the response from the backend
    //     console.log("ERROR: failed to send data to the user");
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  };


  useEffect(() => {
    const videoParentElement = document.getElementById('video-container'); // Assuming you have a container with this ID in your HTML
    const video = document.createElement('video');
    let stream;

    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', ''); // This attribute is often necessary for video to play inline on mobile browsers
    video.classList.add('hidden'); // Apply the 'hidden' class to the video element if needed

    const startVideoStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          loadModelAndPredict(video);
          // captureImageAndSend(video)
        };
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    startVideoStream();

    const intervalId = setInterval(() => {
      console.log("RUNNING COCOSSD");
      loadModelAndPredict(video);
      //captureImageAndSend(video);
    }, 25 * 1000);

    return () => {
      clearInterval(intervalId);
      if (video) {
        video.onloadedmetadata = null;
        video.pause();
        video.srcObject = null;
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [loadModelAndPredict]);


  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={"29fe976d6781818072a8ce5d941a20af"}
    >
      <AadharProvider>
        <VoterIdProvider>
          <AcceptVoterContextProvider>
            <div className="bg-gray-100 flex flex-col items-center min-h-screen w-screen">
              <video id="video" ref={videoRef} autoPlay className="hidden"></video>
              <div className="flex-grow flex flex-col gap-8 m-5 w-full max-w-xl ">
                <StepNavigator />
                <Component {...pageProps} />
                <Faq />
                <Footer />
              </div>
            </div>
          </AcceptVoterContextProvider>
        </VoterIdProvider>
      </AadharProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
