require('dotenv').config();
const { MNEMONIC, PROJECT_ID } = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    holesky: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://eth-holesky.g.alchemy.com/v2/${PROJECT_ID}`),
      network_id: 17000,  // Sepolia's id
      confirmations: 2,      // # of confirmations to wait between deployments (default: 0)
      timeoutBlocks: 200,    // # of blocks before a deployment times out (minimum/default: 50)
      networkCheckTimeout: 1000000000, // # of milliseconds before a network check times out
      skipDryRun: true,      // Skip dry run before migrations (default: false for public nets)
      pollingInterval: 5000 // Polling interval in milliseconds (default: 4000)
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17" // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
