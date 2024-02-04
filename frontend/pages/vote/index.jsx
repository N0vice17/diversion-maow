import React, { useEffect, useState } from 'react';
import { Card, SucessFullPopup } from "../components";
import { Web3Button, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import Image from 'next/image';
import { useAdharContext } from '../../components/AdharContext';
import { useVoterContext } from '../../components/VoterContext';

export default function Vote() {
  const { contract } = useContract("0x621409d3b093eCa38428635D8622F343c315b44d")
  const { aadhar } = useAdharContext()
  const { voterId } = useVoterContext()
  // const { mutateAsync: addVote, isLoading: isLoadingWrite, error: writeError } = useContractWrite(contract, "castVote")
  const { mutateAsync: castvote, isLoading: isLoadingWrite } = useContractWrite(contract, "castvote")
  const [done, setDone] = useState(false)

  const handelOnclick1 = () => {
    try {
      castvote({ args: ["421972343125", "Adarsh Kumar", 0] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  }
  const handelOnclick2 = () => {
    try {
      castvote({ args: ["421972343125", "Adarsh Kumar", 1] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  }
  const handelOnclick3 = () => {
    try {
      castvote({ args: ["421972343125", "Adarsh Kumar", 2] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  }
  const handelOnclick4 = () => {
    try {
      castvote({ args: ["421972343125", "Adarsh Kumar", 3] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  }
  const handleAddVoter2 = async () => {
    setDone(true)
    try {
      await addVote({ args: [aadhar, voterId, 1] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  };
  const handleAddVoter3 = async () => {
    setDone(true)
    try {
      await addVote({ args: [aadhar, voterId, 2] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  };
  const handleAddVoter4 = async () => {
    setDone(true)
    try {
      await addVote({ args: [aadhar, voterId, 3] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  };

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
            action={handelOnclick1}
            onSuccess={() => setDone(true)}
          >
            <Image alt='tmc' src={"/tmc.svg"} width={50} height={50} />
          </Web3Button>
          <Web3Button
            contractAddress="0x621409d3b093eCa38428635D8622F343c315b44d"
            isDisabled={isLoadingWrite}
            onSuccess={() => setDone(true)}
            action={handelOnclick2}
          >
            <Image alt='bjp' src={"/BJP.svg"} width={50} height={50} />
          </Web3Button>
          <Web3Button
            contractAddress="0x621409d3b093eCa38428635D8622F343c315b44d"
            isDisabled={isLoadingWrite}
            onSuccess={() => setDone(true)}
            action={handelOnclick3}
          >
            <Image alt='cpi' src={"/CPI(ML).svg"} width={50} height={50} />
          </Web3Button>
          <Web3Button
            contractAddress="0x621409d3b093eCa38428635D8622F343c315b44d"
            isDisabled={isLoadingWrite}
            onSuccess={() => setDone(true)}
            action={handelOnclick4}
          >
            <Image alt='congress' src={"/congress.svg"} width={50} height={50} />
          </Web3Button>
        </div>
        {/* {writeError && <p className="text-red-500">Failed to add voter: {writeError.message}</p>} */}
        {/* {readError && <p className="text-red-500">Failed to load voters: {readError.message}</p>} */}
      </Card>
    </>
  );
}

