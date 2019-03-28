import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import storehash from '../IPFS/storehash';
import ipfs from '../IPFS/IPFS';
import getWeb3 from "../utils/getWeb3";
import { withRouter } from 'react-router-dom';
var hash = require('object-hash');

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account : this.props.acc,
            ethAddress: this.props.ethAdd,

            user: '',
            uid: '',

            // variables for the smart contract and ethereum attributes
            web3Provider: null,
            contracts: null,
            
            // variables of student gotten from form
            StudentName: '',
            StudentNumber: '',
            CourseCode: '',
            CourseName: '',
            idForBlockchain: '',

            // variables returned from and needed for smart contract & IPFS
            IPFSlink: null,
            buffer: '',
        };
    }

     /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    /* retrieves the file the user uploaded*/
    getFile = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
    }

    /* converts file to be suitable to send to IPFS */
    convertToBuffer = async(reader) => {
        //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result)
        this.setState({buffer})
    }

    /* send the file to IPFS */
    pushToIPFS = async(e) => {
      //  e.preventDefault()
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(err, ipfsHash)
            //this.setState({IPFSlink : ipfsHash[0].hash})
            console.log(ipfsHash[0].hash)
            return ipfsHash[0].hash
        })
    }

    /* store IPFS link on blockchain */
    addToBlockchain = async(e) => {
      //  e.preventDefault()

        //push the file to IPFS
        ///var _ipfsLink = await this.pushToIPFS()

        
        //create a new key for our student
        var key = this.state.StudentNumber + this.state.account[0]
        key = parseInt(hash(key), 10)
        this.setState({idForBlockchain: key})
        console.log(key)
        
        //get todays date
        let newDate = new Date()
        newDate = newDate.getTime()
        var _ipfsLink = this.state.IPFSlink
        var _account = this.state.account[0]
        console.log(_ipfsLink)
        console.log(this.state.IPFSlink)

       // const test = async () => {
        await storehash.methods.sendDocument(_ipfsLink, newDate, key).send({from: _account})
        //};

        //test();
        //call the smart contract method to create a new document
        //storehash.methods.sendDocument(this.state.IPFSlink, newDate).send({from: this.state.account})
        console.log("adding student")
      //  await this.createStudent(e)
        console.log("student added")
    }

    AddMyStuff = async (e) => {
        e.preventDefault()
        await this.pushToIPFS()
        await this.addToBlockchain()
        await this.createStudent()
    }

    // add a student record to the database
    createStudent = async(e) => {
        //get student details from state variables & current user uid
        var _uid = this.state.uid
        var _studentName = this.state.StudentName
        var _studentNumber = this.state.StudentNumber
        var _courseCode = this.state.CourseCode
        var _courseName = this.state.CourseName
        var _idForBlockchain = this.state.idForBlockchain

        // database.ref.students.uid.studentNumber 
        const db = firebase.database()
        db.ref().child("students").child(_uid).child(_studentNumber).set(
            {   studentName: _studentName,
                courseCode: _courseCode,
                courseName: _courseName,
                blockchainKey: _idForBlockchain 
            }
        );
        
        alert("Student added")
        
    }

    componentDidMount = async () => {
    //check user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            this.setState({user: firebase.auth().currentUser}) //not needed?
            this.setState({uid: firebase.auth().currentUser.uid })
        } else {
            // No user is signed in.
            //redirect to login
            this.props.history.push('/login')
        }
        }.bind(this))

    //initialize web3
    const web3 = await getWeb3();

    // get contract address
    const ethAddress = await storehash.options.address
    this.setState({ethAddress})

    //set account for Blockchain network
    this.setState({account: await web3.eth.getAccounts()})
    }


    

    render = () => { 
        return (
            <div align="center"className="container" onLoad={this.componentDidMount}>
                <h1> File Upload </h1><br/>
                <h5 style={{fontStyle: "italic"}}>( Please make sure you give this page access to your MetaMask! )</h5><br/>

            
                <form>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Choose a file to upload</label>
                        <input value={this.state.name} onChange={this.getFile} className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} id="file" type="file" name="file" required/>
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Student Name</label>
                        <input value={this.state.StudentName} onChange={this.handleChange} className="form-control" id="StudentName" type="text" name="StudentName" placeholder="Student Name" required/>
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Student Number</label>
                        <input value={this.state.StudentNumber || ''} onChange={this.handleChange} className="form-control" id="StudentNumber" type="text" name="StudentNumber" placeholder="Student Number" required/>
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Course Code</label>
                        <input value={this.state.CourseCode || ''} onChange={this.handleChange} className="form-control" id="CourseCode" type="text" name="CourseCode" placeholder="Course Code" required/>
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Course Name</label>
                        <input value={this.state.CourseName || ''} onChange={this.handleChange} className="form-control" id="CourseName" type="text" name="CourseName" placeholder="Course Name" required/>
                    </div>
                        
                    <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.AddMyStuff}> Add Document! </button>
                </form>
                
                
                <br/><br/><br/><br/>
                
                <h1> What information is stored along with your file? </h1> <br/>
                <h5>
                    Your file is actually stored using Interplanitary File System <a href="https://ipfs.io/"> (IPFS) </a> and 
                    the unique URL is stored on the Ethereum network. <br/>

                    We also store your MetaMask wallet public address and the date of the upload. <br /><br />

                    We'll store a record of who this file was uploaded for along with the link to the document on 
                    a central database 
                </h5>

            </div>
        )
    }
}

export default withRouter(FileUpload);