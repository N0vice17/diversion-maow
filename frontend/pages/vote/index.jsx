import React, { useEffect, useState } from 'react';
import { Card, SucessFullPopup } from "../components";
import { Web3Button, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import Image from 'next/image';
import { log } from '@tensorflow/tfjs';

export default function Vote() {
  const { contract } = useContract("0x621409d3b093eCa38428635D8622F343c315b44d")
  const { mutateAsync: addVoter, isLoading: isLoadingWrite, error: writeError } = useContractWrite(contract, "add_voter")
  const { data: voterList, isLoading: isLoadingRead, error: readError } = useContractRead(contract, "get_voter_list", [])
  const [done, setDone] = useState(false)

  const handleAddVoter1 = async () => {
    setDone(true)
    try {
      await addVoter({ args: ["421972343125", "Adarsh Kumar"] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  };
  const handleAddVoter2 = async () => {
    setDone(true)
    try {
      await addVoter({ args: ["421972343125", "Adarsh Kumar"] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  };
  const handleAddVoter3 = async () => {
    setDone(true)
    try {
      await addVoter({ args: ["421972343125", "Adarsh Kumar"] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  };
  const handleAddVoter4 = async () => {
    setDone(true)
    try {
      await addVoter({ args: ["421972343125", "Adarsh Kumar"] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  };
  useEffect(() => console.log("true"),[done]);
  

  return (
    <>
      {done ? <SucessFullPopup /> : ""}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Vote</h1>
        <div className="text-sm text-gray-600">
          <span className="text-red-900">*</span> Indicates mandatory fields
        </div>
      </div>
      <Card>
        <div className={"flex flex-row justify-evenly gap-10 flex-wrap"}>
          <Web3Button
            contractAddress="0x621409d3b093eCa38428635D8622F343c315b44d"
            isDisabled={isLoadingWrite}
            onClick={handleAddVoter1}
          >
            <Image src={"/tmc.svg"} width={50} height={50} />
          </Web3Button>
          <Web3Button
            contractAddress="0x621409d3b093eCa38428635D8622F343c315b44d"
            isDisabled={isLoadingWrite}
            onClick={handleAddVoter2}
          >
            <Image src={"/BJP.svg"} width={50} height={50} />
          </Web3Button>
          <Web3Button
            contractAddress="0x621409d3b093eCa38428635D8622F343c315b44d"
            isDisabled={isLoadingWrite}
            onClick={handleAddVoter3}
          >
            <Image src={"/CPI(ML).svg"} width={50} height={50} />
          </Web3Button>
          <Web3Button
            contractAddress="0x621409d3b093eCa38428635D8622F343c315b44d"
            isDisabled={isLoadingWrite}
            onClick={handleAddVoter4}
          >
            <Image src={"/congress.svg"} width={50} height={50} />
          </Web3Button>
        </div>
        {writeError && <p className="text-red-500">Failed to add voter: {writeError.message}</p>}
        {readError && <p className="text-red-500">Failed to load voters: {readError.message}</p>}
      </Card>
    </>
  );
}

