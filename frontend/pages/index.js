import Router, { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import SurveillancePopup, { AadharInputComponent, Card, Input, VoterIdInputComponent } from "./components";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { useAdharContext } from "../components/AdharContext";
import { useVoterContext } from "../components/VoterContext";
import { useAcceptVoterContext } from "../components/AccptVoterContext";
import PleaseComeBackPopup from "./components";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const { acceptVoter } = useAcceptVoterContext()

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      {(!acceptVoter) ? <PleaseComeBackPopup /> : ""}
      <SurveillancePopup isOpen={isPopupOpen} onClose={handleClose} />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Verification</h1>
        <div className="text-gray-600 text-sm">
          <span className="text-red-900">*</span> Indicates mandatory fields
        </div>
      </div>
      <Card className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <VoterIdInputComponent />
          {/* <DotLottiePlayer autoplay style={{zIndex:1}} src={"/type.lottie"} /> */}
        </div>
        <div className="flex flex-col gap-4">
          <AadharInputComponent />
        </div>
      </Card>
      <div className="flex justify-between p-2">
        <button type="button" className="rounded border-blue-900 border text-blue-900 font-bold p-2">
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
    console.log(aadhar, voterId);
    if (aadhar !== "" && voterId !== "") {
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
      type="button"
      onClick={handelButtonLogin}
      className={`rounded bg-gray-400 text-gray-200 shadow shadow-gray-500 font-bold p-2 ${enable ? "bg-blue-400" : ""}`}
    >
      Continue
    </button>
  )

}