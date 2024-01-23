// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Voter_contract {
    struct Voter {
        string pan;
        string adhar;
        string name;
        string number;
    }

    Voter private voter;
    Voter[] private data;

    function setdata(
        string memory _pan,
        string memory _adhar,
        string memory _name,
        string memory _number
    ) public {
        voter = Voter({pan: _pan, adhar: _adhar, name: _name, number: _number});
        data.push(voter);
    }

    function get_data() public view returns (Voter[] memory) {
        return data;
    }
}
