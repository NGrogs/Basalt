import React, {Component} from 'react';
import storehash from '../IPFS/storehash';
import ipfs from '../IPFS/IPFS';

//var web3 = new Web3("http://localhost:8545");

import getWeb3 from "../utils/getWeb3";


class FileUpload extends Component {
    state = {
        // variable for the smart contract and ethereum attributes
        web3Provider: null,
        contracts: null,
        account: '0x0',
        loading: false, //not needed?
        contractInstance: null,

        // variables of student gotten from form
        StudentName: '',
        StudentNumber: '',
        CourseCode: '',
        CourseName: '',
        // perhaps link the id of the account who pushed the data

        // variables returned from and needed for smart contract
        IPFSlink: null,
        buffer: '',
        ethAddress: '',
        idForBlockchain: '',


    }

     /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    getFile = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
    }

    convertToBuffer = async(reader) => {
        //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result)
        this.setState({buffer})
    }

    pushToIPFS = async(e) => {
        e.preventDefault()
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(err, ipfsHash)
            this.setState({IPFSlink : ipfsHash[0].hash})
        })
    }

    componentDidMount = async () => {
    const web3 = await getWeb3();

    // get contract address
    const ethAddress = await storehash.options.address
    this.setState({ethAddress})

    //set account for Blockchain network
    this.setState({account: await web3.eth.getAccounts()})
    }

    render = () => { 
        return (
            <div align="center"className="container">
                <h1> File Upload </h1><br/>
                <h5>Ethereum Contract address: {this.state.ethAddress}</h5> <br/><br/>

                <h5 style={{fontStyle: "italic"}}>( Please make sure you give this page access to your MetaMask! )</h5>

                <h5>Your metamask account: {this.state.account[0]}</h5><br/><br/>
                
                <form>
                    
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Choose a file to upload</label>
                        <input value={this.state.name} onChange={this.getFile} className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} id="file" type="file" name="file" required/>
                    </div>

                    <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.pushToIPFS}> Push Document to IPFS </button>
                    <h5>The IPFS file address: {this.state.IPFSlink}</h5><br/><br/>

                    <div className="form-group " style={{width: "40%"}}>
                        <label>Student Name</label>
                        <input value={this.state.name} onChange={this.handleChange} className="form-control" id="StudentName" type="text" name="StudentName" placeholder="Student Name" required/>
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Student Number</label>
                        <input value={this.state.studentNumber} onChange={this.handleChange} className="form-control" id="studentNumber" type="text" name="StudentNumber" placeholder="Student Number" required/>
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Course Code</label>
                        <input value={this.state.courseCode} onChange={this.handleChange} className="form-control" id="courseCode" type="text" name="courseCode" placeholder="Course Code" required/>
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Course Name</label>
                        <input value={this.state.courseName} onChange={this.handleChange} className="form-control" id="courseName" type="text" name="courseName" placeholder="Course Name" required/>
                    </div>
                        
                    <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.pushToIPFS}> Add Document! </button>
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

export default FileUpload;