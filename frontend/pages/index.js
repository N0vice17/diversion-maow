import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { AadharInputComponent, Card, Input, VoterIdInputComponent } from "./components";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import cocoSsd from '@tensorflow-models/coco-ssd';

export default function Home() {
  const [panNumber, setPanNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fullName, setFullName] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [acceptVote, setAcceptVote] = useState(true);
  const router = useRouter();

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
    <>
      <video id="video" autoPlay className="hidden"></video>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Verify Your PAN</h1>
        <div className="text-gray-600 text-sm">
          <span className="text-red-900">*</span> Indicates mandatory fields
        </div>
      </div>
      <Card className="flex flex-col xl:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <VoterIdInputComponent />
        </div>
        <div className="flex flex-col gap-4">
      <AadharInputComponent />
        </div>
      </Card>
      <div className="flex justify-between p-2">
        <button className="rounded border-blue-900 border text-blue-900 font-bold p-2">
          Cancel
        </button>
        <button
          onClick={() => router.push("/verification")}
          className="rounded bg-gray-400 text-gray-200 shadow shadow-gray-500 font-bold p-2"
          disabled={!acceptVote}
        >
          Continue
        </button>
      </div>
    </>
  );
}

