import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Input } from "./components";


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

