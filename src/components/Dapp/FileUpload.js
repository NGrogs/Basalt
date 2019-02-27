import React, {Component} from 'react';
import Web3 from 'web3';
import BasaltStoreContract from "./../../contracts/BasaltStore.json";

var web3 = new Web3("http://localhost:8545");


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
        IPFSlink: '',
        idForBlockchain: '',


    }

     /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    componentDidMount = async () => {
        await this.initWeb3()// initWeb3()
        await this.initContracts() //FileUpload.initContracts()
        await this.render() //FileUpload.render()
    }

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    initWeb3 = async () => {
    if (typeof web3 !== 'undefined') {
        FileUpload.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
    } else {
        window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
  /*  if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... *//*})
        } catch (error) {
        // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else */
    if (window.web3) {
        FileUpload.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

}

initContracts = async () => {
    /*const contract = await $.getJSON('MyBasalt.json')
    FileUpload.contracts.MyBasalt = contractTruffle(contract) //weird fix but okay
    //const myContract = await artifacts.require("MyBasalt").deployed
    FileUpload.contracts.MyBasalt.setProvider(FileUpload.web3Provider)*/

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = BasaltStoreContract.networks[networkId];
    const instance = new web3.eth.Contract(
    BasaltStoreContract.abi,
    deployedNetwork && deployedNetwork.address,
    );

    FileUpload.Contract = instance;

    this.account = await web3.defaultAccount;

    //set account for Blockchain network
    this.account = await web3.eth.getAccounts();

    //const contractBasalt = await FileUpload.contracts.MyBasalt.deployed();
    //FileUpload.contractInstance = contractBasalt;
}

    render = () => { //bad async??
       /**  set account for Blockchain network
        FileUpload.account = web3.eth.accounts[0]

        const contract = await FileUpload.contracts.MyBasalt.deployed()
        FileUpload.contractInstance = contract

*/


        return (
            <div align="center"className="container">
                <h1> File Upload </h1><br/>
                <h5>( Please make sure you give this page access to your MetaMask! )</h5>

                <h4>Your metamask account: {this.state.account[0]}</h4>
                
                <form>
                    
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Choose a file to upload</label>
                        <input value={this.state.name} onChange={this.handleChange} className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} id="file" type="file" name="file" required/>
                    </div>
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
                        
                    <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.createStudent}> Add Document! </button>
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