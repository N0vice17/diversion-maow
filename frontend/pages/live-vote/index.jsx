import React, { useEffect, useState } from 'react';
import { Card, SucessFullPopup } from "../components";
import { Web3Button, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import Image from 'next/image';

export default function Vote() {
  const { contract } = useContract("0x621409d3b093eCa38428635D8622F343c315b44d")
  const { mutateAsync: addVoter, isLoading: isLoadingWrite, error: writeError } = useContractWrite(contract, "add_voter")
  const { data, isLoading } = useContractRead(contract, "get_votes_of_each_party", [])
  const [done, setDone] = useState(false)

  
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
        <div className='flex w-full h-full flex-col gap-1'>
            <h1 className='text-2xl'>Live Vote Count</h1>
            <div className='flex w-full h-full gap-10'>
                <div>
                    <div>
                        TMC
                        <div>
                            {isLoading? "a" : data[0].toNumber()}
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        BJP
                        <div>
                            {isLoading? "a" : data[1].toNumber()}
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        CPM
                        <div>
                            {isLoading? "a" : data[2].toNumber()}
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        Congress
                        <div>
                            {isLoading? "a" : data[3].toNumber()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
      </Card>
    </>
  );
}

