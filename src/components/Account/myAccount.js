import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import { withRouter } from 'react-router-dom';
class myAccount extends Component {
    state = {
        user: '',
        uid: '',
        email: '',
        country: '',
        region: '',
        organizationType: '',
        organizationName: '',
        publicEthKey: '',

        reviews: [],
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
            var _uid = this.state.uid

            // get reference to database location we want
            const loc = firebase.database().ref('/users/' + _uid)
            loc.once('value', snapshot => {
                snapshot.forEach(child => {
                    this.setState({
                        email: child.val().email,
                        country: child.val().country,
                        region: child.val().Region,
                        organizationName: child.val().organizationName,
                        organizationType: child.val().organizationType,
                        publicEthKey: child.val().EthKey
                    })
                })
            })
        }

    // works for 1 review - need to scale
    getReviews = async (e) => {
        e.preventDefault()
        var _uid = this.state.uid
        // get reviews for the current user
        const loc2 = firebase.database().ref('/reviews/' + _uid)
        var theReviews = []
        loc2.once('value', snapshot => {
            var _reviewer = snapshot.key
            //console.log(snapshot.key)
            snapshot.forEach(child => {
                var theVal = child.val()
                theReviews.push(theVal)
                var _date = theReviews[0].date
                var _rating = theReviews[0].rating
                var _text = theReviews[0].text
                this.setState({reviews: [this.state.reviews, _reviewer, _date, _rating, _text]})

            })
        })
    
        //this.setState({reviews: [this.state.reviews, theReviews]})
    }

    
    render() {
        return (
            <div align="center"className="container">
            <br/><br/>
                <h1> Account Details </h1> <br/><br/><br/>
                <div className="row">
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Personal</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Organizational</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Location</h3>
                    </div>
                </div>
                <br/>                
                <div className="row">
                    <div className="col-sm">
                        <h4>Email: {this.state.email}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>Organization Name: {this.state.organizationName}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>Country: {this.state.country}</h4>
                    </div>
                </div>
                <br/><br/>
                <div className="row">
                    <div className="col-sm" >
                        <h4>Public Ethereum Key: {this.state.publicEthKey}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>Organization Type: {this.state.organizationType}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>Region: {this.state.region}</h4>
                    </div>
                </div>

                <br/><br/><br/><br/><br/>

                <h1> Reviews </h1> <br/><br/><br/>
                <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.getReviews}> Get my reviews </button>


                <div className="row">
                    <div className="col-sm" ><br/><br/>
                        <h4>Reviewer ID: {this.state.reviews[1]}</h4><br/>
                        <h4>Date: {this.state.reviews[2]}</h4><br/>
                        <h4>Star rating: {this.state.reviews[3]} /5</h4><br/>
                        <h4>Text: {this.state.reviews[4]}</h4><br/>
                    </div>
                </div>

                
            </div>
        )
    }
}

export default withRouter(myAccount);