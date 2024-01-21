const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voter_contract", function () {
    it("Should set the right unlockTime", async function () {
        const voter_contract= await ethers.getContractFactory("Voter_contract");
        await voter_contract.deploy();
    });
});

describe("Voting_contract", function () {
    it("Should set the right unlockTime", async function () {
        const voting_contract= await ethers.getContractFactory("Voting_contract");
        await voting_contract.deploy();
    });
});

