import { useRouter } from "next/router";
import { Card, OtpInput } from "../components";

export default function Verification() {
  const router = useRouter()
  return (
    <>
      <div className="flex gap-0.5">
        <h1 className="text-2xl w-full">Otp Verification</h1>
        <div className="flex w-full justify-end items-end text-gray-600 text-sm gap-0.5">
          <a className="text-red-900">*</a>
          Indicates mandatory fields
        </div>
      </div>
      <Card>
        <div className="flex flex-col basis-28 justify-evenly gap-10">
          <OtpInput />
        </div>
      </Card>
      <div className="flex justify-between p-2">
        <button className="rounded border-blue-900 border text-blue-900 font-bold p-2">cancel</button>
        <button className="rounded bg-gray-400 text-gray-200 shadow shadow-gray-500 font-bold p-2" onClick={() => { router.push("connect") }}>continue</button>
      </div>
    </>
  )
}


