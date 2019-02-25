pragma solidity ^0.5.0;

/*** experimental abi v2 - could be used to return structs ***/

contract Basalt {
    string title = "Basalt - connecting colleges & businesses around the world.";

    /** mightn't be needed **/
    constructor() public {

    }

    /** defines the structure for a college/educational institute **/
    struct Institute {
        uint id; //not needed?
        address accountAddress;
        string name;
        string email;
        string phoneNumber;
        string about;
        string location;
        uint256 reviewCount;
        mapping (uint => Review) AllReviews; //replace with global list and use a variable to link?
    }

    /** defines the structure for a business/recruiter **/
    struct Business {
        uint id; //not needed?
        address accountAddress;
        string name;
        string email;
        string phoneNumber;
        string location;
        string about;
    } 

    

    /** defines the structure for a review of an institute **/
    struct Review {
        address ownerAddress;
        string description;
        uint rating; //replace with enum?
    }

    mapping (address => Institute) public ListOfInstitutes;
    mapping (address => Business) public ListOfBusinesses;
    uint256 public InstituteCount;
    uint256 public BusinessCount;
    enum ratings {untrustworthy, unknown, trustworthy}
    enum GraduateLevel {Certificate, Higher_Certificate, Diploma, Bachelor, Bacheor_Honours, Master, PhD}

    
    /** Returns a count of all Institutes **/
    function getInstituteCount () public returns(uint256) {
        return InstituteCount;
    }

    /** Returns a count of all Businesses **/
    function getBusinessCount () public returns (uint256) {
        return BusinessCount;
    }   
    
    modifier instituteOnly {
        // wont work - need loop through institute map and find address = msg.sender?
        ListOfInstitutes[msg.sender];


        //require(msg.sender == Institute, "Only institutes may access this functionality");
        _;
    }
    
    modifier ownerOnly {
        //require(msg.sender == _accountAddress, "Only the owner may access this function");
        _;
    }

    /** Allow a public user to create an institute account linked to their wallet **/
    function addInstitute (
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _location,
        string memory _about
    ) 
        public 
    {
        InstituteCount ++;
        ListOfInstitutes[msg.sender] = Institute(InstituteCount, msg.sender, _name, _email, _phone, _location, _about, 0, 0);
        // need to add the mappings
    }

    /** Allow a public user to create a business account linked to their wallet **/
    function addBusiness (
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _location,
        string memory _about
    )
        public 
    {
        BusinessCount ++;
        ListOfBusinesses[msg.sender] = Business(BusinessCount, msg.sender, _name, _email, _phone, _location, _about);
    }


    /** Return details of an Institute **/
    function getInstitute (
        address _instituteAddress
    )
        public 
        returns(string memory, string memory, string memory, string memory) 
    {
        string memory name = ListOfInstitutes[_instituteAddress].name;
        string memory email = ListOfInstitutes[_instituteAddress].email;
        string memory phone = ListOfInstitutes[_instituteAddress].phoneNumber;
        string memory about = ListOfInstitutes[_instituteAddress].about;
        //address?
        //need to return reviews?
        //return???
        return (name, email, phone, about);
    }

    /** Return details of a Business **/
    function getBusiness(
        address _businessAddress
    ) 
        public 
        returns (string memory, string memory, string memory, string memory
    )

    {
        string memory name = ListOfBusinesses[_businessAddress].name;
        string memory email = ListOfBusinesses[_businessAddress].email;
        string memory phone = ListOfBusinesses[_businessAddress].phoneNumber;
        string memory about = ListOfBusinesses[_businessAddress].about;
        //address?
        //return??
        return (name, email, phone, about);
    }


    /** Used to submit a review for a particular institute **/
    function addreview(address _instituteAddress, string memory _description, uint _rating) public {
        uint localReviewCount = ((ListOfInstitutes[_instituteAddress].reviewCount) + 1);
        ListOfInstitutes[_instituteAddress].AllReviews[localReviewCount] = Review(_instituteAddress, _description, _rating);
    }

    /** Used to display all reviews for a particular institute **/
    function showReviews(address _instituteAddress) public returns(address, string memory, uint) {
        
        uint256 rCount = ListOfInstitutes[_instituteAddress].reviewCount;
        // implement a loop to go through all indexes in Reviews mapping?
        address sender = ListOfInstitutes[_instituteAddress].AllReviews[].ownerAddress; //add index?
        string memory description = ListOfInstitutes[_instituteAddress].AllReviews[].description; //add index?
        uint rating = ListOfInstitutes[_instituteAddress].AllReviews[].rating; //add index?

        // how will I return all the reviews???????
        return (sender, description, rating);
    }


}
