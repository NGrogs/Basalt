import React, {Component} from 'react';
import storehash from '../IPFS/storehash';
import { withRouter } from 'react-router-dom';
class FileRetrieve extends Component {

    state = {
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
        this.IPFSlink.select();
        document.execCommand('copy')
    }

    retrieveDocument = async (e) => {
        e.preventDefault()
        var _id = this.state.idToSearch
        this.state.documentDetails = await storehash.methods.getDocument(_id).call().catch(console.error);

        //check response is empty
        if(!this.state.documentDetails[0].length){
            alert("No entry found")
            this.setState({IPFSlink: ''})
            this.setState({uploadedAddress: ''})
            this.setState({uploadDate: ''})
        }
        else {
          //  var seconds = this.state.documentDetails[2]
         //   var date = new Date(seconds);
            this.setState({IPFSlink: this.state.documentDetails[0]})
            this.setState({uploadedAddress: this.state.documentDetails[1]})
            this.setState({uploadDate: this.state.documentDetails[2]})
        }
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
                    <h5>Uploader address: {this.state.uploadedAddress}</h5> <br/>
                    <h5>Upload Date: {this.state.uploadDate}</h5> <br/>
                    <h5>IPFS Link: {this.state.IPFSlink}</h5> <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} onClick={this.CopyLink} > Copy Link! </button>
                </div>
                </div>
            </div>
        )
    }

}

export default withRouter(FileRetrieve);