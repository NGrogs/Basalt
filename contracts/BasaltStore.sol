pragma solidity ^0.4.24;

// Basic app of how to store and retrieve a document id for IPFS stored on Ethereum network
contract BasaltStore {
    string ipfsHash ;
    address uploader ;
    uint256 dateUploaded ;

    function sendHash(string ipfsLocation, uint256 uploadDate ) public {
        ipfsHash = ipfsLocation;
        uploader = msg.sender;
        dateUploaded = uploadDate;

    }

    function getHash() public view returns (string, address, uint256) {
        return (ipfsHash, uploader, dateUploaded);
    }
}