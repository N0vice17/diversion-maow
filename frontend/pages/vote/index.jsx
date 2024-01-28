import React from 'react';
import { Card } from "../components";
import { Web3Button, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";

export default function Vote() {
  const { contract } = useContract("0x621409d3b093eCa38428635D8622F343c315b44d")
  const { mutateAsync: addVoter, isLoading: isLoadingWrite, error: writeError } = useContractWrite(contract, "add_voter")
  const { data: voterList, isLoading: isLoadingRead, error: readError } = useContractRead(contract, "get_voter_list", [])

  const handleAddVoter = async () => {
    try {
      await addVoter({ args: ["421972343125", "Adarsh Kumar"] });
    } catch (error) {
      console.error("Error adding voter:", error);
    }
  };

  return (
    <>
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
            onClick={handleAddVoter}
          >
            Candidate 1
          </Web3Button>
          {isLoadingRead ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin h-6 w-6 border-4 rounded-full border-t-transparent border-blue-500"></div>
              <span>Loading...</span>
            </div>
          ) : (
            voterList?.map((voter, index) => (
              <div key={index}>
                <ul>
                  <li>{voter.aadhar}</li>
                  <li>{voter.pan}</li>
                </ul>
              </div>
            ))
          )}
        </div>
        {writeError && <p className="text-red-500">Failed to add voter: {writeError.message}</p>}
        {readError && <p className="text-red-500">Failed to load voters: {readError.message}</p>}
      </Card>
    </>
  );
}

