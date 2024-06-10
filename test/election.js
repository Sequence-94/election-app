var Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {
    var electionInstance;

    // Test to check if the contract initializes with two candidates
    it("initializes with two candidates", function () {
        return Election.deployed().then(function (instance) {
            return instance.candidatesCount();
        }).then(function (count) {
            assert.equal(count, 2, "The number of candidates should be 2");
        });
    });

    // Test to check if the candidates are initialized with the correct values
    it("initializes the candidates with the correct values", function () {
        return Election.deployed().then(function (instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function (candidate) {
            assert.equal(candidate[0], 1, "Candidate 1's ID should be 1");
            assert.equal(candidate[1], "Candidate 1", "Candidate 1's name should be 'Candidate 1'");
            assert.equal(candidate[2], 0, "Candidate 1's vote count should be 0");
            return electionInstance.candidates(2);
        }).then(function (candidate) {
            assert.equal(candidate[0], 2, "Candidate 2's ID should be 2");
            assert.equal(candidate[1], "Candidate 2", "Candidate 2's name should be 'Candidate 2'");
            assert.equal(candidate[2], 0, "Candidate 2's vote count should be 0");
        });
    });

    // Test to check if a voter can cast a vote
    it("allows a voter to cast a vote", function () {
        return Election.deployed().then(function (instance) {
            electionInstance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, { from: accounts[0] });
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "votedEvent", "the event tpe is correct");
            assert.equal(receipt.logs[0].args._candidate.toNumber(), candidateId, "the candidate id is correct");
            return electionInstance.voters(accounts[0]);
            //return electionInstance.voters(accounts[0]);
        }).then(function (voted) {
            assert(voted, "The voter should be marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function (candidate) {
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "The candidate's vote count should be incremented");
        });
    });

    // Test to check if the contract throws an exception for invalid candidates
    it("throws an exception for invalid candidates", function () {
        return Election.deployed().then(function (instance) {
            electionInstance = instance;
            return electionInstance.vote(99, { from: accounts[1] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') >= 0, "Error message should contain 'revert'");
            return electionInstance.candidates(1);
        }).then(function (candidate1) {
            var voteCount = candidate1[2];
            assert.equal(voteCount, 1, "Candidate 1 should not receive any additional votes");
            return electionInstance.candidates(2);
        }).then(function (candidate2) {
            var voteCount = candidate2[2];
            assert.equal(voteCount, 0, "Candidate 2 should not receive any additional votes");
        });
    });

    // Test to check if the contract throws an exception for double voting
    it("throws an exception for double voting", function () {
        return Election.deployed().then(function (instance) {
            electionInstance = instance;
            candidateId = 2;
            electionInstance.vote(candidateId, { from: accounts[1] });
            return electionInstance.candidates(candidateId);
        }).then(function (candidate) {
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "The first vote should be accepted");
            // Try to vote again
            return electionInstance.vote(candidateId, { from: accounts[1] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') >= 0, "Error message should contain 'revert'");
            return electionInstance.candidates(1);
        }).then(function (candidate1) {
            var voteCount = candidate1[2];
            assert.equal(voteCount, 1, "Candidate 1 should not receive any additional votes");
            return electionInstance.candidates(2);
        }).then(function (candidate2) {
            var voteCount = candidate2[2];
            assert.equal(voteCount, 1, "Candidate 2 should not receive any additional votes");
        });
    });

});
