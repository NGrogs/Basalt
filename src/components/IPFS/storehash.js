import Web3 from 'web3';
const web3 = new Web3(window.web3.currentProvider);

//contarct address
const address = '0x0cA1608c545E595141879301F2850C8a3583Cc97';

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
    "type": "function"
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
    "type": "function"
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
    "type": "function"
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
    "type": "function"
  }
]

export default new web3.eth.Contract(abi, address);