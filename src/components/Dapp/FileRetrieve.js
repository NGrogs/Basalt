import React, {Component} from 'react';
import storehash from '../IPFS/storehash';
import getWeb3 from "../utils/getWeb3";
import { withRouter } from 'react-router-dom';
class FileRetrieve extends Component {

    state = {
        web3Provider: null,
        contracts: null,
        account: '0x0',

        // variables of document retrieved
        idToSearch: '',
        documentDetails: [],
        IPFSlink: null,        
        uploadedAddress: '',
        uploadDate: '',
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

    retrieveDocument = async (e) => {
        e.preventDefault()
        var _id = this.state.idToSearch
        this.state.documentDetails = await storehash.methods.getDocument(_id).call()
        this.setState({IPFSlink: this.state.documentDetails[0]})
        this.setState({uploadedAddress: this.state.documentDetails[1]})
        this.setState({uploadDate: this.state.documentDetails[2]})
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
                    <h2>Enter key to search:</h2>
                    <form>
                        <div className="form-group " style={{width: "40%"}}>
                            <label>ID:</label>
                            <input value={this.state.idToSearch} onChange={this.handleChange} className="form-control" id="idToSearch" type="text" name="idToSearch" placeholder="ID" required/>
                        </div>

                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.retrieveDocument}> Find Document! </button>
                    </form>
                </div>
                <div className="col-sm">
                    <h2>File details</h2><br/>
                    <h5>Uploader address: {this.state.uploadedAddress}</h5>
                    <h5>Upload Date {this.state.uploadDate}</h5>
                    <h5>IPFS Link: {this.state.IPFSlink}</h5> <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} onClick={this.CopyLink} > Copy Link! </button>
                </div>
                </div>

                <br/><br/><br/><br/><br/><br/>
                <h2>Ethereum Contract address:</h2><h5> {this.state.ethAddress}</h5> <br/><br/>
                    <h5 style={{fontStyle: "italic"}}>( Please make sure you give this page access to your MetaMask! )</h5>

                    <h2>Your metamask account:</h2><h5> {this.state.account[0]}</h5><br/><br/>
            </div>
        )
    }

}

export default withRouter(FileRetrieve);