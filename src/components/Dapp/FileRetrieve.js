import React, {Component} from 'react';
import storehash from '../IPFS/storehash';
import ipfs from '../IPFS/IPFS';

import getWeb3 from "../utils/getWeb3";

class FileRetrieve extends Component {

    state = {
        web3Provider: null,
        contracts: null,
        account: '0x0',
        loading: false, //not needed?
        contractInstance: null,


    }

    /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
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
                <h1> File Retrieve </h1><br/>
                <h5>Ethereum Contract address: {this.state.ethAddress}</h5> <br/><br/>

                <h5 style={{fontStyle: "italic"}}>( Please make sure you give this page access to your MetaMask! )</h5>

                <h5>Your metamask account: {this.state.account[0]}</h5><br/><br/>
                
                <h2>Enter key to search:</h2>
                <form>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>ID:</label>
                        <input value={this.state.name} onChange={this.handleChange} className="form-control" id="keySearch" type="text" name="keySearch" placeholder="Key" required/>
                    </div>

                    <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" > Find Document! </button>
                </form>
                <br/><br/>

                

            </div>
        )
    }

}

export default FileRetrieve;