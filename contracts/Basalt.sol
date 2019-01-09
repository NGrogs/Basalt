pragma solidity ^0.5.0;

/*** experimental abi v2 - could be used to return structs ***/

contract Basalt {
    string title = "Basalt - connecting colleges & businesses around the world";

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
        uint256 gradCount;
        mapping (uint => Graduate) ListOfGraduates; //replace with a global list and use a variable to link?
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

    /** defines the structure for a graduate/student **/
    struct Graduate {
        uint id; //overall id and local to college or both????
        address accountAddress; //will this exist?
        string firstName;
        string lastName;
        string email;
        bool graduated; //replace with enum?
        string courseName;
        string courseCode;        
        string courseLevel; //replace with enum?
        uint256 courseStartDate;
        uint256 courseEndDate;
    }

    /** defines the structure for a review of an institute **/
    struct Review {
        address ownerAddress;
        string description;
        uint rating; //replace with enum?
    }

    mapping (address => Institute) public ListOfInstitutes;
    mapping (address => Business) public ListOfBusinesses;
    //mapping (address => Graduate) public ListOfGraduates;
    uint256 public InstituteCount;
    uint256 public BusinessCount;
    uint256 public GlobalGradCount; // yes
    enum GradStatus {inProgress, graduated} //needs more
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

    /** Returns a count of all Graduates accross all Institutes **/
    function getGlobalGradCount () public returns (uint256) {
        return GlobalGradCount;
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

    /** Allow an institute to add a graduates details **/
    function addGraduate (
        string memory _fname,
        string  memory _lname,
        string memory _email,
        bool _graduated,
        string memory _courseName,
        string memory _courseCode,
        string memory _courseLevel,
        uint256 _courseStart,
        uint256 _courseEnd
        //need to add the institute they are being added to 
    ) 
        public 
        ownerOnly 
    {
        // ensure owner is one accessing 
        // ensure institute exists
        // ensure sender is an institute

        //increment the global count of graduates
        GlobalGradCount ++;

        // ?? find institute where their address is same as msg.sender?? 
        uint newGradCount = (ListOfInstitutes[msg.sender].gradCount + 1);
        //increment the institutes count of graduates
        ListOfInstitutes[msg.sender].gradCount == newGradCount;

        //add grad to the institutes list of grads
        ListOfInstitutes[msg.sender].ListOfGraduates[newGradCount] = Graduate(newGradCount, _fname, _lname, _email, _graduated, _courseName, _courseCode, _courseLevel, _courseStart, _courseEnd);

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

    /** Used to display all graduates of a particular institute - IMPOSSIBLE??? **/
    function listAllGrads () private returns(int) {
    
    }

    /** Returns count of an Institutes Graduates **/
    function getGradCount (address _instituteAddress) private returns(uint256) {
        return ListOfInstitutes[_instituteAddress].gradCount;
    }

    /** Used to search a institutes list of graduates for a particular graduate **/
    function lookUpGrad(
        address _instituteAddress,
        address _graduateAddress
    ) 
        public 
        returns (string memory, string memory, string memory, string memory, string memory
    ) 
    {
        string memory fname = ListOfInstitutes[_instituteAddress].ListOfGraduates[_graduateAddress].firstName; //index or address for grad?
        string memory lname = ListOfInstitutes[_instituteAddress].ListOfGraduates[_graduateAddress].lastName; //index or address for grad?
        string memory email = ListOfInstitutes[_instituteAddress].ListOfGraduates[_graduateAddress].email; //index or address for grad?
        string memory courseName = ListOfInstitutes[_instituteAddress].ListOfGraduates[_graduateAddress].courseName; //index or address for grad?
        string memory courseCode = ListOfInstitutes[_instituteAddress].ListOfGraduates[_graduateAddress].courseCode; //index or address for grad?

        

        //level
        //graduated?

        //return??
        return (fname, lname, email, courseName, courseCode);
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
