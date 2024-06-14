# Voting DApp

This project is a decentralized application (DApp) for voting, developed and initially tested on the Ganache local blockchain. It has been deployed on the Holesky testnet for broader testing and verification.

## Introduction

This DApp allows users to vote securely and transparently on the Ethereum blockchain. Initially developed and tested on a local Ganache blockchain, it has now been deployed on the Holesky testnet.

### Prerequisites
- [MetaMask](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
- [Alchemy](https://dashboard.alchemy.com/)



## Setup Instructions

1. **Create a "New App" on Alchemy**
    Pick any testnet Holesky or Sepolia - I picked Holesky arbirarily.
   
   ![Screen Shot 2024-06-14 at 11 33](https://github.com/Sequence-94/election-app/assets/53806574/19263ea3-8bbc-48c7-bb5b-a9a587ab05fe)
   
3. **Save the API Key(Remember this API Key and HTTPS endpoint, as you will need them in future steps.)**
   
   ![Screen Shot 2024-06-14 at 11 46](https://github.com/Sequence-94/election-app/assets/53806574/b42926ac-01cb-441c-9f8e-e586dac95ddd)


5. **Create a metamask account**
   - IMPORTANT **save your mnemonic from metamask** YOU'LL NEED IT LATER
   - nagivate to -> networks > Add a network > Add a network manually
   
   ![Screen Shot 2024-06-14 at 11 51](https://github.com/Sequence-94/election-app/assets/53806574/0dab21c3-0607-4fd3-a9a6-2ee1556f407b)

    Depending on which testnet you picked you'll fill in the values accordingly.

   - Add some **Fake Ethereum** from Faucet
   
   ![Screen Shot 2024-06-14 at 11 57](https://github.com/Sequence-94/election-app/assets/53806574/fd927760-c2d2-4e51-a3b8-65e2bb92297c)


   **Choose Your Faucet**
   - [Alchemy](https://www.alchemy.com/faucets)
   - [Infura](https://www.infura.io/faucet/sepolia)
   - [Google Cloud Web3](https://cloud.google.com/application/web3/)(recommended)
     
6. **create a .env file in root folder**

   add the code below - the mnemonic required is the one given to you by metamask.
   
        ```
         MNEMONIC="your mnemonic here"
         ALCHEMY_API_KEY="your alchemy api key here"
        ```

7. **Don't forget to add .env inside the .gitignore file**

8. Changes Required for Deployment on Holesky Testnet
   -run ```npm install dotenv @truffle/hdwallet-provider```

9. `truffle-config.js`

Updated to include the Holesky network configuration:
```javascript
require('dotenv').config();
const { MNEMONIC, ALCHEMY_API_KEY } = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    holesky: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://eth-holesky.alchemyapi.io/v2/${ALCHEMY_API_KEY}`),
      network_id: 17000,       // Holesky's id
      confirmations: 2,        // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,      // # of blocks before a deployment times out  (minimum/default: 50)
      networkCheckTimeout: 1000000000, // # of milliseconds before a network check times out
      skipDryRun: true,        // Skip dry run before migrations? (default: false for public nets )
      pollingInterval: 5000    // Polling interval in milliseconds (default: 4000)
    }
  },
  compilers: {
    solc: {
      version: "0.8.17" // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
```
### Deploy Contract To Testnet 

```
truffle migrate --network holesky 
```

You should see the follwoing:

![Screen Shot 2024-06-14 at 12 37](https://github.com/Sequence-94/election-app/assets/53806574/b7a4629c-3b2e-4293-be84-d4fe4c2c3253)

![Screen Shot 2024-06-14 at 12 38](https://github.com/Sequence-94/election-app/assets/53806574/64b885f4-49c2-4140-b93a-86e1c11cfde3)

**Confirm contract is on the Sepolia testnet blockchain with truffle console:**

```
truffle console --network sepolia 
contract = await FundProjectForOwner.deployed()
```
You should see something like this:

![Screen Shot 2024-06-14 at 12 43](https://github.com/Sequence-94/election-app/assets/53806574/e4630843-5d64-4feb-bc50-92637136586d)

![Screen Shot 2024-06-14 at 12 43 - 2](https://github.com/Sequence-94/election-app/assets/53806574/1d7cfd65-dfc9-4b8b-ab39-d5dab2b27985)

```
contract.address
```

- You can view contract code on [Etherscan for holesky](https://holesky.etherscan.io/)
- Replace sepolia with holesky if you went with that.

Copy this output:

![Screen Shot 2024-06-14 at 12 46](https://github.com/Sequence-94/election-app/assets/53806574/57221a18-166e-4f98-b27d-e220acf37cff)

- example
- 
```
https://sepolia.etherscan.io/address/0xB0a4724048f4EEf0a40FC0fF410FccF21Dd3FcfD
```

- You should see the output in green

![Screen Shot 2024-06-14 at 12 53](https://github.com/Sequence-94/election-app/assets/53806574/15da8ab5-50c1-439c-96de-7d850c2b417c)


### Test App Using Testnet

```
npm run dev
```
Your application should pop up and metamask should come up to ask you for connection permission.

You can then place our vote and metamask shoud come up once again to charge you to place a vote once that's done you' see the page will
automatically update to show the vote for your candidate.

![Screen Shot 2024-06-14 at 13 05](https://github.com/Sequence-94/election-app/assets/53806574/a0f87acc-f733-47bd-8b5b-542b27d08e3e)

You can check etherscan to confirm that your vote was written to the blockchain. If you take a look at the 2nd to last screenshot you'll the vote went through.





