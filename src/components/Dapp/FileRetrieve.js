import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import storehash from '../IPFS/storehash';
import { withRouter } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
class FileRetrieve extends Component {

    state = {
        // variables of document retrieved
        idToSearch: '',
        documentDetails: [],
        IPFSlink: null,        
        uploadedAddress: '',
        uploadDate: '',
        rating: 0,
        canReview: false,
        institiuteID: '',
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
        }
        else {
          //  var seconds = this.state.documentDetails[2]
         //   var date = new Date(seconds);
            this.setState({IPFSlink: this.state.documentDetails[0]})
            this.setState({uploadedAddress: this.state.documentDetails[1]})
            this.setState({uploadDate: this.state.documentDetails[2]})
            this.setState({canReview: true})

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

        // changes the star rating
        changeRating = async( newRating, name ) =>{
            if(this.state.canReview){
                this.setState({
                    rating: newRating
                });
            }
            else {
                alert("Cannot review until a file has been retrieved")
            }
        }

        // adds rating to firebase database
        addReview = async() => {
            //get student details from state variables & current user uid
            var _uid = this.state.uid
            var _institiuteID = this.state.institiuteID
            let _newDate = new Date()
            var _rating = this.state.rating

            // database.ref.students.uid.studentNumber 
            const db = firebase.database()
            db.ref().child("reviews").child(_institiuteID).child(_uid).set(
                {   
                    rating: _rating,
                    date: _newDate
                }
            );
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
                <br/><br/><br/><br/>
                <div className="row">
                    <div className="col-sm">
                        <h3>Review this institute?</h3>
                    </div>
                    <div className="col-sm">
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="purple"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(FileRetrieve);