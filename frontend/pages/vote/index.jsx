import { Card, Input } from "../components";

export default function() {
  return (
    <>
      <div className="flex gap-0.5">
        <h1 className="text-2xl w-full">Opt Verification</h1>
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
    </>
  )
}


