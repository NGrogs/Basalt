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
        

    }

    // mapping of all documents
    mapping (uint => documentStore) public ListOfDocuments; 
    // count of all documents stored
    uint256 public documentCount;

    /** Stores the newly created document details */
    // should this return a way to locate it?
    function sendDocument(
        string memory _ipfsLocation, 
        uint256 _uploadDate 
    ) 
    public
    returns (uint256)
    {
        documentCount ++;
        ListOfDocuments[documentCount] = documentStore(documentCount, _ipfsLocation, msg.sender, _uploadDate);
        return documentCount ;
    }

    /** Retrieves docuement details */
    function getDocument(
        uint256 _id
    ) 
    public 
    view
    returns (string memory, address, uint256)
    {
        // return the attributes of the documentStore we need
        string memory ipfsHash = ListOfDocuments[_id].ipfsHash;
        address uploader = ListOfDocuments[_id].uploader;
        uint256 dateUploaded = ListOfDocuments[_id].dateUploaded;
        return (ipfsHash, uploader, dateUploaded);
    }
}