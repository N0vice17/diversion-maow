
import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { Footer, NavBar, StepNavigator } from './components';
import { useCallback, useEffect } from 'react';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'mumbai';

function MyApp({ Component, pageProps }) {
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
        <video id="video" autoPlay className="hidden"></video>
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
