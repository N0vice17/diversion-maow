import { useEffect, useState } from "react";
import { Card, Input } from "../components";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

export default function() {
  const { contract } = useContract("0x79B7E29f08710F8430799441DDba53f83A5E0fF2");
  const { mutateAsync: setdata, isLoading } = useContractWrite(contract, "setdata")
  const call = async () => {
    try {
      const data = await setdata({ args: ["10", "A"] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  useEffect(() => {
    if(isLoading) {
      console.log("loading")
      return
    }
    console.log("yes")
    const data = setdata({ args: ["1", "10"] });
    data.then(e => {
      console.log(e)
    }).catch(e => console.log("error" + e))
  }, [setdata,isLoading])



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


