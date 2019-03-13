import React, {Component} from 'react';
import storehash from '../IPFS/storehash';
import getWeb3 from "../utils/getWeb3";

class FileRetrieve extends Component {

    state = {
        web3Provider: null,
        contracts: null,
        account: '0x0',

        // variables of student gotten from form
        StudentName: '',
        StudentNumber: '',
        CourseCode: '',
        CourseName: '',
        IPFSlink: null,
    }

    /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    copy = (e) => {
        this.IPFSLink.select();
        document.execCommand('copy')
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
                <h1> File Retrieve </h1><br/><br/><br/>

                <div className="row">
                <div className="col-sm">
                    <h2>Ethereum Contract address:</h2><h5> {this.state.ethAddress}</h5> <br/><br/>
                    <h5 style={{fontStyle: "italic"}}>( Please make sure you give this page access to your MetaMask! )</h5>

                    <h2>Your metamask account:</h2><h5> {this.state.account[0]}</h5><br/><br/>
                </div>   
                <div className="col-sm"> 
                    <h2>Enter key to search:</h2>
                    <form>
                        <div className="form-group " style={{width: "40%"}}>
                            <label>ID:</label>
                            <input value={this.state.name} onChange={this.handleChange} className="form-control" id="keySearch" type="text" name="keySearch" placeholder="Key" required/>
                        </div>

                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" > Find Document! </button>
                    </form>
                </div>
                <div className="col-sm">
                    <h2>File details</h2><br/>
                    <h5>Student name: {this.state.StudentName}</h5>
                    <h5>Student number: {this.state.StudentNumber}</h5>
                    <h5>Course code: {this.state.CourseCode}</h5>
                    <h5>Course name: {this.state.CourseName}</h5>
                    <h5>IPFS Link: {this.state.IPFSLink}</h5> <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} onClick={this.CopyLink} > Copy Link! </button>
                </div>
                </div>
            </div>
        )
    }

}

export default FileRetrieve;