import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = ThirdwebSDK.fromPrivateKey("1dbf1b4315cdf8a736d736c4489a9ccf35835b7b5f708864e78dcc65f64baa09","mumbai",{
  secretKey: "29fe976d6781818072a8ce5d941a20af",
})

const contract = await sdk.getContract("0x79B7E29f08710F8430799441DDba53f83A5E0fF2");
// const data = await contract.call("setdata", ["dkfjalksdjf", "sdkfasdf"])
const data = await contract.call("get_votes_data", [])
console.log(await data.length)

