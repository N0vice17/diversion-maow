// import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Card({ children, className }) {
  return (
    <div className={`${className} drop-shadow`}>{children}</div>
  )
}

function Input({ className, label, type }) {
  return (
    <div className={className}>
      <p>{label} <a className="text-red-900">*</a></p>
      <input title="ankan" type={type} className="rounded w-full text-xl p-2 border-red-700 border" />
    </div>
  )
}

function Navigator({ id }) {
  return (
    <div className="flex gap-10">
      <div>
        <div id="1" className="rounded font-bold flex border-blue-700 border-2 bg-white max-h-8 justify-center items-center max-w-8 p-1">1</div>
        <div>Enter Details</div>
      </div>
      <div>
        <div id="2" className="flex border-gray-300  border-2 bg-gray-100 text-gray-400 max-h-8 justify-center items-center max-w-8 p-1">2</div>
        <div className="text-gray-400">Verification</div>
      </div>
      <div>
        <div id="2" className="flex border-gray-300  border-2 bg-gray-100 text-gray-400 max-h-8 justify-center items-center max-w-8 p-1">3</div>
        <div className="text-gray-400">Vote</div>
      </div>
    </div>
  )
}

function NavBar() {
  return (
    <>
      <nav className="z-1 relative h-10 bg-white"></nav>
      <div className="z-1 relative h-5 bg-blue-700 shadow shadow-neutral-300"></div>
    </>
  )
}

function Footer() {
  return (
    <footer className="z-1 flex relative bg-blue-900 h-full w-full">
    </footer>
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
      <NavBar />
      <div className="bg-gray-100 z-1 flex flex-col items-center h-screen">
        <div className="relative flex flex-col gap-8 m-5 max-w-xl">
          <Navigator />
          <div className="flex gap-0.5">
            <h1 className="text-2xl w-full">Verify Your PAN</h1>
            <div className="flex w-full justify-end items-end text-gray-600 text-sm gap-0.5">
              <a className="text-red-900">*</a>
              Indicates mandatory fields
            </div>
          </div>
          <Card className="rounded flex bg-white border-gray-300 border p-12 gap-10">
            <div className="flex flex-col basis-28 justify-evenly gap-10">
              <Input label={"Pan"} type={"tel"} />
              <Input label={"Bob"} type={"tel"} />
            </div>
            <div className="flex flex-col basis-72 justify-evenly gap-10">
              <Input label={"Full Name"} type={"text"} />
              <Input label={"Mobile Number"} type={"tel"} />
            </div>
          </Card>
          <div className="flex justify-between p-2">
            <button className="rounded border-blue-900 border text-blue-900 font-bold p-2">cancel</button>
            <button className="rounded bg-gray-400 text-gray-200 shadow shadow-gray-500 font-bold p-2">continue</button>
          </div>
        </div>
      <Footer />
      </div>
    </>
  );
}

