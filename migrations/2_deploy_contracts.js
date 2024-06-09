var Election = artifacts.require("./Election.sol");

module.exports = function (deployer) {

  // Set gas price in wei (example: 10 gwei)
  //const gasPrice = web3.utils.toWei('1000', 'gwei');

  //deployer.deploy(Election, { gasPrice: gasPrice });
  deployer.deploy(Election);
};
