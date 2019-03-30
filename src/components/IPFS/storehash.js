import Web3 from 'web3';
const web3 = new Web3(window.web3.currentProvider);

//contarct address
const address = '0xADB13CC1A32b64f938BE7c1D3447DFcd20C09ae9';

//contract abi 
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