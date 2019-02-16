import React, {Component} from 'react';
import Web3 from 'web3';

const web3 = new Web3("ws://localhost:8546");

class FileUpload extends Component {
    state = {
        web3Provider: null,
        contracts: {},
        account: '0x0',
        loading: false,
        contractInstance: null,
    }

     /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
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

    render() {
        return (
            <div align="center"className="container">
                <h1> This is Dapp Test </h1><br/>
                <p>( Please make sure you give this page access to your MetaMask! )</p>
                
                <form>
                    
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Choose a file to upload</label>
                        <input value={this.state.name} onChange={this.handleChange} className="form-control" id="file" type="file" name="file" />
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Student Name</label>
                        <input value={this.state.name} onChange={this.handleChange} className="form-control" id="name" type="text" name="name" placeholder="Name" />
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Student Number</label>
                        <input value={this.state.studentNumber} onChange={this.handleChange} className="form-control" id="studentNumber" type="text" name="StudentNumber" placeholder="Student Number" />
                    </div>
                        
                    <button type="submit" onClick={this.createStudent}> Add Document! </button>
                </form>

                <br/><br/><br/><br/>
                
                <h1> What information is stored along with your file? </h1> <br/>
                <p>
                    Your file is actually stored using Interplanitary File System <a href="https://ipfs.io/"> (IPFS) </a> and 
                    the unique URL is stored on the Ethereum network. <br/>

                    We also store your MetaMask wallet public address and the date of the upload. <br /><br />

                    We'll store a record of who this file was uploaded for along with the link to the document on 
                    a central database 
                </p>

            </div>
        )
    }
}

export default FileUpload;