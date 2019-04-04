import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import storehash from '../IPFS/storehash';
import { withRouter } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
class FileRetrieve extends Component {

    state = {
        // variables of document retrieved
        idToSearch: '',
        documentDetails: [],
        IPFSlink: null,        
        uploadedAddress: '',
        institiuteID: '',
        copied: false,
        detailsFound: false,
    }

    /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    //gets a document back from the Blockchain
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
            this.setState({canReview: false})
            this.setState({detailsFound: false})
        }
        else {
          //  var seconds = this.state.documentDetails[2]
         //   var date = new Date(seconds);
            this.setState({IPFSlink: this.state.documentDetails[0]})
            this.setState({uploadedAddress: this.state.documentDetails[1]})
            this.setState({institiuteID: this.state.documentDetails[3]})
            this.setState({canReview: true})
            this.setState({detailsFound: true})

            //grab institite that uploaded file
        }
    }

    componentDidMount = async () => {
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
        }  

    render = () => { 
        return (
            !this.state.detailsFound ? 
            <div align="center"className="container" style={{paddingTop: '3em'}}>
            <div className="col-sm"> 
                    <h2>Enter key to search:</h2>
                    <form>
                        <div className="form-group " style={{width: "40%"}}>
                            <input value={this.state.idToSearch} onChange={this.handleChange} className="form-control" id="idToSearch" type="text" name="idToSearch" placeholder="ID" required/>
                        </div>

                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.retrieveDocument}> Find Document! </button>
                    </form>
                </div>
            </div> :
            
            <div align="center"className="container" style={{paddingTop: '3em'}}>
                <div className="col-sm"> 
                    <h2>Enter key to search:</h2>
                    <form>
                        <div className="form-group " style={{width: "40%"}}>
                            <input value={this.state.idToSearch} onChange={this.handleChange} className="form-control" id="idToSearch" type="text" name="idToSearch" placeholder="ID" required/>
                        </div>

                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.retrieveDocument}> Find Document! </button>
                    </form>
                </div>

                <div className="col-sm" style={{paddingTop: '5em'}}>

                    <div className="row">
                        <div className="col"><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Uploader metamask address</h3></div>
                        <div className="col"><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>IPFS Link</h3></div>
                        <div className="col"><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Uploader account ID</h3></div>
                    </div>
                    <div className="row">
                        <div className="col"><h5>{this.state.uploadedAddress}</h5></div>
                        <div className="col"><h5>{this.state.IPFSlink}</h5></div>
                        <div className="col"><h5>{this.state.institiuteID}</h5></div>
                    </div>
                <br/><br/>

                    <CopyToClipboard text={"https://ipfs.io/ipfs/" + this.state.IPFSlink}
                        onCopy={() => this.setState({copied: true})}>
                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}}>Copy IPFS key</button>
                    </CopyToClipboard>

                    {this.state.copied ? <span style={{color: '#B65DF3', paddingLeft: '3em'}}>Copied.</span> : null}
                </div>
                
                <br/><br/><br/><br/>
                <div className="row">
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>What do I do with this IPFS link?</h3>
                        <br/>
                        <h4>
                            Enter the link into your searchbar and you will be able to download the file
                        </h4>
                    </div>
                </div>
                <br/><br/><br/><br/><br/><br/>
                <div className="row">
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>What do I do with the uploader account ID</h3>
                        <br/>
                        <h4>
                            If you navigate to the <b>Search Institute</b> page you can search that ID and retrieve the uploaders details. <br/><br/>
                            From there you can submit a review of the Institute if you'd like to help others see if they are trustworthy or not.
                        </h4>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(FileRetrieve);