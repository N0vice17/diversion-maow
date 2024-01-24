import { Card } from "../components";
import { Web3Button, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";

export default function () {
  const { contract } = useContract("0x621409d3b093eCa38428635D8622F343c315b44d")
  const { mutateAsync: add_voter, isLoading: isLoadingWrite } = useContractWrite(contract, "add_voter")
  const { data, isLoading: isLoadingRead } = useContractRead(contract, "get_voter_list", [])

  return (
    <>
      <div className="flex gap-0.5">
        <h1 className="text-2xl w-full">Vote</h1>
        <div className="flex w-full justify-end items-end text-gray-600 text-sm gap-0.5">
          <a className="text-red-900">*</a>
          Indicates mandatory fields
        </div>
      </div>
      <Card>
        <div className={"flex flex-row justify-evenly gap-10 flex-wrap"}>
          <Web3Button
            contractAddress="0x621409d3b093eCa38428635D8622F343c315b44d"
            isDisabled={isLoadingWrite}
            action={() => { add_voter({ args: ["421972343125", "Adarsh Kumar"] }) }}>
            Candidate 1
          </Web3Button>
          {
            !isLoadingRead ?
              data.map(e => {
                return (<div>
                  <ul>{e.adhar}</ul>
                  <ul>{e.pan}</ul>
                </div>)
              }) : <div className="animate-spin">loading</div>
          }
        </div>
      </Card>
    </>
  )
}


