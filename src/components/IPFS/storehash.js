import Web3 from 'web3';
const web3 = new Web3(window.web3.currentProvider);

//contarct address
const address = '0xADB13CC1A32b64f938BE7c1D3447DFcd20C09ae9';

//contract abi 
const abi = [

    { constant: true,
        inputs: [],
        name: 'documentCount',
        outputs: [ [Object] ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xa5b16b2e' },
      { constant: true,
        inputs: [ [Object] ],
        name: 'ListOfDocuments',
        outputs: [ [Object], [Object], [Object], [Object] ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xf6b0a225' },
      { constant: false,
        inputs: [ [Object], [Object] ],
        name: 'sendDocument',
        outputs: [ [Object] ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xa5a7ee67' },
      { constant: true,
        inputs: [ [Object] ],
        name: 'getDocument',
        outputs: [ [Object], [Object], [Object] ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x3f9b250a' } 
]

export default new web3.eth.Contract(abi, address);