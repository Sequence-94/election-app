I've created an AWS Lambda function that can deploy Ethereum smart contracts using Alchemy as the provider.
This setup allows you to deploy contracts quickly and efficiently without needing to maintain a dedicated server or infrastructure.

## ERRORS
1.  index.js not found
   
![Screen Shot 2024-06-16 at 16 57](https://github.com/Sequence-94/voting-dapp-deployment/assets/53806574/709a3add-6898-48d8-b611-b0352d752d5a)

Cause: aws could not find the index.js that I had mentioned in my package.json so I had to rename it from ContractDeployment.js to index.js
Like this:

![Screen Shot 2024-06-16 at 16 58](https://github.com/Sequence-94/voting-dapp-deployment/assets/53806574/a3a2be3d-bf5c-4f3d-a901-fa89f1890f1b)


2.  Must be authenticated!
   
![Screen Shot 2024-06-16 at 17 25](https://github.com/Sequence-94/voting-dapp-deployment/assets/53806574/bde049ca-5846-4043-863a-515eb72a946e)


Cause: the hhtps endpoint was incorrectly put as "https://eth-holesky.g.alchemy.com/v2/YOUR_HOLESKY_PROJECT_ID" and aws does not know how to render my envirnment variable in this manner.
First I tried to change it like this 
```
 [YOUR_HOLESKY_PROJECT_ID is not defined](https://eth-holesky.g.alchemy.com/v2/${YOUR_HOLESKY_PROJECT_ID)}
```
But that was incorrect as I got an back this error:
```
2024-06-16T11:52:42.827Z	924bd9c6-de8c-44db-a4eb-185787521f78	ERROR	Error deploying contract: ReferenceError: YOUR_HOLESKY_PROJECT_ID is not defined
    at deploy (/var/task/index.js:10:94)
    at exports.handler (/var/task/index.js:27:39)
    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1173:29)
```
Final Resolution:

![Screen Shot 2024-06-16 at 17 29](https://github.com/Sequence-94/voting-dapp-deployment/assets/53806574/afc58899-444a-4960-8573-d202ad433659)

3.  Cannot read properties of undefined (reading 'JsonRpcProvider')

```
2024-06-16T13:56:43.413Z	b9cf6534-c2ae-4475-ab50-555672937686	ERROR	Error deploying contract: TypeError: Cannot read properties of undefined (reading 'JsonRpcProvider')
    at deploy (/var/task/index.js:10:43)
    at exports.handler (/var/task/index.js:29:39)
    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1173:29)
```
Cause: EthersJS has an issue Listening to evens with nodejs

Final Resoultion:
I downgraded my "ethers" to version 5.7.2 in the package.json then I removed node_modules folder and ran

![Screen Shot 2024-06-16 at 17 48](https://github.com/Sequence-94/voting-dapp-deployment/assets/53806574/e8f3bd29-b259-48d3-8dc9-a48733357329)

```
npm install 
```
4. Lambda Timed Out Error

Cause:The lambda was not giving the program enough time to deploy the contract.

Fixed it like this:
![Screen Shot 2024-06-16 at 18 22](https://github.com/Sequence-94/election-app/assets/53806574/d28dcb80-b455-4e6f-a4db-b277db3a2c97)

## success!

contract was deployed successfuly and the deployment was returned address was returned. 

![Screen Shot 2024-06-16 at 18 22 - 2](https://github.com/Sequence-94/election-app/assets/53806574/616c35bb-d097-473d-9e19-3753c23d5d13)

## Voting Logic Lambda Function

returns the following:
```
{
  "statusCode": 200,
  "body": "{\"receipt\": {
    \"to\": \"0x61788E032F9A5Ad119871e396F5F758a4f1AA726\",
    \"from\": \"0xff70d2925fa8A0bcb6a56ca5258ae320750754de\",
    \"contractAddress\": null,
    \"transactionIndex\": 5,
    \"gasUsed\": {
      \"type\": \"BigNumber\",
      \"hex\": \"0x010beb\"
    },
    \"logsBloom\": \"0x000000...\", // Bloom filter for logs
    \"blockHash\": \"0x7d29596b513ad66869de9a5bda8fa91fc71513e3e55ef03473e049a7b09ea98c\",
    \"transactionHash\": \"0x1d5d09b2eeea54b57cbc81193558e5044c496cc6e83f93ab2c04e7a9f70c9530\",
    \"logs\": [], // Transaction logs (empty in this case)
    \"blockNumber\": 1760304,
    \"confirmations\": 1,
    \"cumulativeGasUsed\": {
      \"type\": \"BigNumber\",
      \"hex\": \"0x03d4c7\"
    },
    \"effectiveGasPrice\": {
      \"type\": \"BigNumber\",
      \"hex\": \"0x93d5692a\"
    },
    \"status\": 1, // Transaction status (1 means success)
    \"type\": 2,
    \"byzantium\": true,
    \"events\": [] // Event logs (empty in this case)
  }}"
}
```
This indicates that the vote was cast using the deployed contract - it's also visible on etherscan:

![Screen Shot 2024-06-18 at 13 55](https://github.com/Sequence-94/election-app/assets/53806574/190c8395-c507-4575-8ebe-e123f0027202)

The logic will not allow double voting as well:

![Screen Shot 2024-06-18 at 13 51](https://github.com/Sequence-94/election-app/assets/53806574/9381daf5-2d7a-4c39-b263-3acf5bac1514)

### Testing Voting-Lambda Function via API GATEWAY on POSTMAN

Error:
```
{
"error": "network does not support ENS (operation="getResolver", network="unknown", code=UNSUPPORTED_OPERATION, version=providers/5.7.2)"
}
```

Issue: This was due to the fact that I had a typo on my ethereum address 
Resolution: copied ethereum address as is and pasted into postman body
Result:

![Screen Shot 2024-06-18 at 15 18](https://github.com/Sequence-94/election-app/assets/53806574/a4652d6a-6371-473a-bcf3-d6d54db7ccec)



