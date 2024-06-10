var Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {
    var electionInstance;

    it("initializes with two candidates", function () {
        return Election.deployed().then(function (instance) {
            return instance.candidatesCount();
        }).then(function (count) {
            assert.equal(count, 2);
        });
    });

    it("it initializes the candidates with the correct values", function () {
        return Election.deployed().then(function (instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function (candidate) {
            assert.equal(candidate[0], 1, "Candidate 1 should have the correct id of 1");
            assert.equal(candidate[1], "Candidate 1", "Candidate 1's name should be 'Candidate 1'");
            assert.equal(candidate[2], 0, "Candidate 1's votes count should be 0");
            return electionInstance.candidates(2);
        }).then(function (candidate) {
            assert.equal(candidate[0], 2, "Candidate 2 should have the correct id of 2");
            assert.equal(candidate[1], "Candidate 2", "Candidate 2's name should be 'Candidate 2'");
            assert.equal(candidate[2], 0, "Candidate 2's votes count should be 0");
        });
    });

}); 