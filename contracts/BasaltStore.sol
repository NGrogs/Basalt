pragma solidity 0.5.0;

// Basic app of how to store and retrieve a document id for IPFS stored on Ethereum network
contract BasaltStore {

    // struct of how a document will be stored
    struct documentStore {
        // unique id of the doc
        uint256 id;
        // the url of the ipfs node where the document is stored
        string ipfsHash;
        // wallet address of who uploaded the document
        address uploader;
        // date the document was uploaded (created here)
        uint dateUploaded;
        // uploaders id on firebase database
        string userID;
    }

    // mapping of all documents
    mapping (uint64 => documentStore) public ListOfDocuments; 
    // count of all documents stored
    uint256 public documentCount;

    /** Stores the newly created document details */
    function sendDocument(
        string memory _ipfsLocation, 
        uint256 _uploadDate,
        uint64 _key,
        string memory _userID
    ) 
    public
    {
        documentCount ++;
        ListOfDocuments[_key] = documentStore(documentCount, _ipfsLocation, msg.sender, _uploadDate, _userID);
    }

    /** Retrieves docuement details */
    function getDocument(
        uint64 _id
    ) 
    public 
    view
    returns (string memory, address, uint256, string memory)
    {
        // return the attributes of the documentStore we need
        string memory ipfsHash = ListOfDocuments[_id].ipfsHash;
        address uploader = ListOfDocuments[_id].uploader;
        uint256 dateUploaded = ListOfDocuments[_id].dateUploaded;
        string memory userID = ListOfDocuments[_id].userID;
        return (ipfsHash, uploader, dateUploaded, userID);
    }
}