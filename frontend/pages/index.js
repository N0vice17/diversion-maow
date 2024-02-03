import Router, { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import SurveillancePopup, { AadharInputComponent, Card, Input, VoterIdInputComponent } from "./components";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import cocoSsd from '@tensorflow-models/coco-ssd';
import { useAdharContext } from "./AdharContext";
import { useVoterContext } from "./VoterContext";

export default function Home() {
  const [panNumber, setPanNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fullName, setFullName] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [acceptVote, setAcceptVote] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const { aadhar } = useAdharContext()
  const { voterId } = useVoterContext()

  const router = useRouter();

  const handleClose = () => {
    setIsPopupOpen(false);
  };


  return (
    <>
      <SurveillancePopup isOpen={isPopupOpen} onClose={handleClose} />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Verify Your PAN</h1>
        <div className="text-gray-600 text-sm">
          <span className="text-red-900">*</span> Indicates mandatory fields
        </div>
      </div>
      <Card className="flex flex-col gap-4">
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
        <SuperButton />
      </div>
    </>
  );
}

function SuperButton() {
  const { aadhar } = useAdharContext()
  const { voterId } = useVoterContext()
  const [enable, setEnable] = useState(false)
  const router = useRouter()
  useEffect(() => {
    console.log(aadhar,voterId);
    if (aadhar!=="" && voterId !=="") {
      setEnable(true)
    }
  }, [aadhar, voterId])

  const handelButtonLogin = () => {

    if (enable) {
      router.push("/verification")
    }
  }

  return (
    <button
      onClick={handelButtonLogin}
      className="rounded bg-gray-400 text-gray-200 shadow shadow-gray-500 font-bold p-2"
    >
      Continue
    </button>
  )

}