const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voter_contract", function () {
    it("Should set and get the data", async function () {
        const Voter_contract = await ethers.getContractFactory("Voter_contract");
        const voter_contract = await Voter_contract.deploy();
        for (var i = 0; i < 3; i++) {
            await voter_contract.setdata(`MAOW${i}`, `MAOW${i}`, `MAOW${i}`, `MAOW${i}`)
        }
        // const voterdata = await voter_contract.getdata();
        // console.log(voterdata);
    });
});



