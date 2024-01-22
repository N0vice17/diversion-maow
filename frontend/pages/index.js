import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Card({ children, className }) {
  return (
    <div className={`${className} rounded flex bg-white border-gray-300 border p-12 gap-10 drop-shadow`}>{children}</div>
  )
}

function Input({ className, label, type }) {
  return (
    <div className={className}>
      <p>{label} <a className="text-red-900">*</a></p>
      <input title="ankan" type={type} className="rounded w-full text-md p-2 border-red-700 border" />
    </div>
  )
}

export function StepNavigator({ step }) {
  const current_style_up = "rounded text-black font-bold flex border-blue-700 border-2 bg-white max-h-8 justify-center items-center max-w-8 p-1"
  const default_style_up = "flex border-gray-300  border-2 bg-gray-100 text-gray-400 max-h-8 justify-center items-center max-w-8 p-1"
  const current_style_down = "text-black"
  return (
    <div className="flex gap-10 text-gray-400">
      <div id="1">
        <div id="t" className={step === 1 ? current_style_up : default_style_up}>1</div>
        <div className={step === 1 ? current_style_down : ""}>Enter Details</div>
      </div>
      <div id="2">
        <div id="t" className={step === 2 ? current_style_up : default_style_up}>2</div>
        <div className={step === 2 ? current_style_down : ""}>Verification</div>
      </div>
      <div id="3">
        <div id="t" className={step === 3 ? current_style_up : default_style_up}>3</div>
        <div className={step === 3 ? current_style_down : ""}>Connect Wallet</div>
      </div>
      <div id="4">
        <div id="t" className={step === 4 ? current_style_up : default_style_up}>4</div>
        <div className={step === 4 ? current_style_down : ""}>Vote</div>
      </div>
    </div>
  )
}

export function NavBar() {
  return (
    <>
      <nav className="h-10 bg-white"></nav>
      <div className="h-5 bg-blue-700 shadow shadow-neutral-300"></div>
    </>
  )
}

export function Footer() {
  return (
    <footer className="flex relative bg-blue-900 h-full w-full">
    </footer>
  )
}

function Otp() {
  return (
    <></>
  )
}

export default function Home() {
  const [adharNumber, setAdharNumber] = useState("")
  const [voterId, setVoterId] = useState("")
  const router = useRouter()
  useEffect(() => {
    if ("111" === adharNumber &&
      "111" === voterId) {
      router.push("vote")
    }
  }, [adharNumber, voterId])
  return (
    <>
      <div className="flex gap-0.5">
        <h1 className="text-2xl w-full">Verify Your PAN</h1>
        <div className="flex w-full justify-end items-end text-gray-600 text-sm gap-0.5">
          <a className="text-red-900">*</a>
          Indicates mandatory fields
        </div>
      </div>
      <Card>
        <div className="flex flex-col basis-28 justify-evenly gap-10">
          <Input label={"Pan"} type={"tel"} />
          <Input label={"Bob"} type={"date"} />
        </div>
        <div className="flex flex-col basis-72 justify-evenly gap-10">
          <Input label={"Full Name"} type={"text"} />
          <Input label={"Mobile Number"} type={"tel"} />
        </div>
      </Card>
      <div className="flex justify-between p-2">
        <button
          className="rounded border-blue-900 border text-blue-900 font-bold p-2">cancel</button>
        <button
          onClick={_ => { router.push("verification") }}
          className="rounded bg-gray-400 text-gray-200 shadow shadow-gray-500 font-bold p-2">continue</button>
      </div>
    </>
  );
}

