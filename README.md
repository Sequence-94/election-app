# Election Voting Application

## Introduction

This project is a decentralized voting application built on the Ethereum blockchain. 
It leverages smart contracts to ensure secure, transparent, and tamper-proof voting processes. 
By utilizing blockchain technology, this application aims to provide a reliable and efficient solution for conducting elections, ensuring that every vote is counted accurately and cannot be altered.

## Dependencies

This project requires the following dependencies:

1. **npm**:
   - **Installation**: `npm install -g npm`
   - **Description**: npm (Node Package Manager) is the default package manager for the JavaScript runtime environment Node.js. It is required for managing the project's dependencies and scripts.

2. **node-gyp**:
   - **Installation**: `npm install -g node-gyp`
   - **Description**: node-gyp is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js. It is required for building and compiling native code dependencies.

3. **Truffle**:
   - **Installation**: `npm install -g truffle`
   - **Description**: Truffle is a development environment, testing framework, and asset pipeline for Ethereum. It is required for managing smart contract development, testing, and deployment.

4. **Ganache**:
   - **Installation**: [Download Ganache](https://www.trufflesuite.com/ganache)
   - **Description**: Ganache is a personal blockchain for Ethereum development that you can use to deploy contracts, develop your applications, and run tests. It is required for simulating a blockchain locally.

5. **MetaMask**:
   - **Installation**: [Download MetaMask](https://metamask.io/)
   - **Description**: MetaMask is a cryptocurrency wallet and gateway to blockchain apps. It is required for managing your Ethereum wallet and interacting with decentralized applications (dApps) directly from your browser.

6. **Solidity (VSCode Extension)**:
   - **Installation**: Install the [Solidity Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
   - **Description**: The Solidity extension for Visual Studio Code provides language support for Solidity smart contracts. It is required for syntax highlighting, code snippets, and compiling smart contracts within the VSCode editor.

# ERRORS
1. **Running: `truffle migrate`**
   - ![Screen Shot 2024-06-09 at 20 22](https://github.com/Sequence-94/election-app/assets/53806574/b56f7597-ea37-41b8-9842-18abd92a4a62)

   - **Issue** :I used `function Election()` as the constructor
   - **Resolution** : Replaced `function Election() public` with `constructor() public`, which is the recommended way to define constructors in Solidity from version 0.5.0 onwards.
   - **Desired Output**:
   - ![Screen Shot 2024-06-09 at 20 30](https://github.com/Sequence-94/election-app/assets/53806574/0dd079a1-1ad4-41ef-b8f9-6773d1012906)
   - ![Screen Shot 2024-06-09 at 20 30 - 2](https://github.com/Sequence-94/election-app/assets/53806574/a015b7a9-2571-40b4-927b-9ca68cdd221d)

2. **Running: `truffle migrate`**
   - ![Screen Shot 2024-06-10 at 11 21](https://github.com/Sequence-94/election-app/assets/53806574/b106174a-fcdf-4c87-bf0f-aa7d67ef115a)
   - **Issue** :The `addCandidate` function uses `string _name` which should be `string memory _name` to be compliant with Solidity versions 0.5.0 and later.
   - **Resolution** : Resolution: replaced `function addCandidate(string _name) private` with  `function addCandidate(string memory _name) public`

