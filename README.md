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


