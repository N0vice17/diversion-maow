pragma solidity ^0.8.9;

contract Voting_contract {
    struct Voter {
        string adhar;
        string pan;
        bool voted;
    }

    Voter public voter;
    Voter[] public data;
    uint256[6] public party_votes;

    function setdata(string memory _adhar, string memory _pan) public {
        voter = Voter({adhar: _adhar, pan: _pan, voted: false});
        data.push(voter);
    }

    function valid(
        string memory pan,
        string memory adhar
    ) public view returns (bool) {
        for (uint i = 0; i < data.length; i++) {
            if (
                compareString(data[i].adhar, adhar) &&
                compareString(data[i].pan, pan)
            ) {
                return data[i].voted;
            }
        }
    }

    function castvote(
        string memory pan,
        string memory adhar,
        uint256 index
    ) public returns (bool) {
        if (valid(pan, adhar) == false) {
            party_votes[index] += 1;
            for (uint i = 0; i < data.length; i++) {
                if (
                    compareString(data[i].adhar, adhar) &&
                    compareString(data[i].pan, pan)
                ) {
                    data[i].voted = false;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    function get_votes_data() public view returns (uint256[6] memory) {
        return party_votes;
    }

    function compareString(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
