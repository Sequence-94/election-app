//version of solidity we will be using
pragma solidity >=0.4.22 <0.8.0;

//Declare a contract
contract Election {
    //Store candidate
    //Read candidate
    string public candidate;
    //constructor to initialize contract upon migration
    constructor() public {
        candidate = "Candidate 1";
    }
}
