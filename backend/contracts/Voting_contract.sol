// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Voting_contract {
    struct Voter {
        string adhar;
        string pan;
        bool voted;
    }

    Voter private voter;
    Voter[] private data;
    uint256[6] private party_votes;

    function add_voter(string memory _adhar, string memory _pan) public {
        voter = Voter({adhar: _adhar, pan: _pan, voted: false});
        data.push(voter);
    }

    function valid(
        string memory _pan,
        string memory _adhar
    ) private view returns (bool) {
        for (uint i = 0; i < data.length; i++) {
            if (
                compareString(data[i].adhar, _adhar) &&
                compareString(data[i].pan, _pan)
            ) {
                return data[i].voted;
            }
        }
        return false;
    }

    function castvote(
        string memory pan,
        string memory adhar,
        uint256 contestant_id
    ) public {
        if (!valid(pan, adhar)) {
            party_votes[contestant_id] += 1;
            for (uint i = 0; i < data.length; i++) {
                if (
                    compareString(data[i].adhar, adhar) &&
                    compareString(data[i].pan, pan)
                ) {
                    data[i].voted = true;
                }
            }
        }
    }

    function get_winner() public view returns (uint256) {
        uint256 votes = 0;
        uint256 ans = 0;
        for (uint i = 0; i < party_votes.length; i++) {
            if (party_votes[i] > votes) {
                ans = i;
            }
        }
        return ans;
    }

    function get_voter_list() public view returns (Voter[] memory) {
        return data;
    }

    function get_votes_of_each_party() public view returns (uint256[6] memory) {
        return party_votes;
    }

    function compareString(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
