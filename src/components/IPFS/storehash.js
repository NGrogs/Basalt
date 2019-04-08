/* code based on tutorial at https://itnext.io/build-a-simple-ethereum-interplanetary-file-system-ipfs-react-js-dapp-23ff4914ce4e*/
import Web3 from 'web3';
const web3 = new Web3(window.web3.currentProvider);

/**
 * This file stores the address and abi of our smart contract
 * These values will need to be updated if a smart contract is changed and recompiled
 */

/* contract address */
const Kovanaddress = '0x772E24532a39A7D0f55544316514d54a53Dc2b18';
const address = '0x1309CB274a7d16d489EDCb13424CAeED3f88AE16';

/* contract abi */
const abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint64"
      }
    ],
    "name": "ListOfDocuments",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "name": "uploader",
        "type": "address"
      },
      {
        "name": "dateUploaded",
        "type": "uint256"
      },
      {
        "name": "userID",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x948a6764"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "documentCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa5b16b2e"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ipfsLocation",
        "type": "string"
      },
      {
        "name": "_uploadDate",
        "type": "uint256"
      },
      {
        "name": "_key",
        "type": "uint64"
      },
      {
        "name": "_userID",
        "type": "string"
      }
    ],
    "name": "sendDocument",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xb4d3fca5"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint64"
      }
    ],
    "name": "getDocument",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8844d877"
  }
]

export default new web3.eth.Contract(abi, address);