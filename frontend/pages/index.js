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
      <Card className={"flex-col xl:flex-row "}>
        <div className="flex flex-col xl:basis-28 justify-evenly gap-1 xl:gap-4">
          <Input label={"Pan"} type={"tel"} />
          <Input label={"Date of birth"} type={"date"} />
        </div>
        <div className="flex flex-col w-full xl:basis-60 justify-evenly gap-1 xl:gap-4">
          <Input className={"w-full"} label={"Full Name"} type={"tel"} />
          <Input className={"w-full"} label={"Adhar Numer"} type={"text"} />
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

