import Web3 from 'web3';
const web3 = new Web3(window.web3.currentProvider);

//contarct address
const address = '0xADB13CC1A32b64f938BE7c1D3447DFcd20C09ae9';

//contract abi 
const abi = [

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
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
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
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf6b0a225"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "documentAdded",
    "type": "event",
    "signature": "0xed4e245805678e351298f982e4ba6e4503807239246d00d5f74ebc880586a6ff"
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
      }
    ],
    "name": "sendDocument",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xa5a7ee67"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
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
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x3f9b250a"
  }
]

export default new web3.eth.Contract(abi, address);