const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting_contract", function () {
    it("Should set the right unlockTime", async function () {
        const Voting_contract = await ethers.getContractFactory("Voting_contract");
        const voting_contract = await Voting_contract.deploy();
        for (var i = 0; i < 3; i++) {
            await voting_contract.setdata(`MAOW${i}`, `MAOW${i}`)
        }

        await voting_contract.castvote("MAOW1", "MAOW1", 1);
        await voting_contract.castvote("MAO2", "MAOW2", 0);
        const data = await voting_contract.get_votes_data();
        await voting_contract.castvote("MAOW1", "MAOW1", 1);
        console.log(data);
    });
});