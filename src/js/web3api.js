import Web3 from 'web3';

let web3;
const web3Provider = window.ethereum || new Web3.providers.HttpProvider('http://localhost:7545');

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
        console.log("Using MetaMask Web3 Provider...");
    }).catch(error => {
        console.error("User denied account access");
    });
} else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    console.log("Using Legacy Web3 Provider...");
} else {
    web3 = new Web3(web3Provider);
    console.log("Using Localhost Web3 Provider...");
}

export { web3, web3Provider };
