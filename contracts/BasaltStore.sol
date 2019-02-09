pragma solidity ^0.4.24;

// Basic app of how to store and retrieve a document id for IPFS stored on Ethereum network
contract BasaltStore {
    string ipfsHash ;

    function sendHash(string x) public {
        ipfsHash = x;
    }

    function getHash() public view returns (string x) {
        return ipfsHash;
    }
}