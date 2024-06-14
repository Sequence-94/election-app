//version of solidity we will be using
pragma solidity >=0.4.22 <0.8.20;

//Declare a contract
contract Election {
    //Model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //store accounts that have voted
    mapping(address => bool) public voters;

    //Store candidates

    //Fetch candidate
    mapping(uint => Candidate) public candidates;

    //Store candidate count
    uint public candidatesCount;

    //voted event
    //event votedEvent(uint indexed _candidateId);

    constructor() {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    //add a new candidate
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        //require that they have not voted before
        require(!voters[msg.sender]);

        //require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        //record that voter has voted
        voters[msg.sender] = true;

        //update candiate votecount
        candidates[_candidateId].voteCount++;

        //trigger voted event
        emit votedEvent(_candidateId);
    }
}
