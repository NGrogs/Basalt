import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import { withRouter } from 'react-router-dom';
import logoSmall from '../../Images/logoSmall.png';
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

        loading: true,
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
                this.setState({loading: false})
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
            //var _reviewer = snapshot.key
            //console.log(_reviewer)
            //console.log(snapshot)
            //console.log(snapshot.key)
            var i = 0;
            snapshot.forEach(child => {
                var theVal = child.val()
                //console.log("key is" + child.key)
                theReviews.push(theVal)
                var _reviewer = child.key
                var _date = theReviews[i].date
                var _rating = theReviews[i].rating
                var _text = theReviews[i].text
                //console.log(_date)
                //console.log(_rating)
                //console.log(_text)
                i++
                this.setState({reviews: this.state.reviews.concat([_reviewer, _date, _rating, _text])})
                //this.setState({reviews: [this.state.reviews, _reviewer, _date, _rating, _text]})

            })
        })
    
        //this.setState({reviews: [this.state.reviews, theReviews]})
    }

    
    render() {
        return (

            this.state.loading ? <div align="center"className="container"> 
                <br/><br/>
                <img src={logoSmall} alt="logo" style={{width: '15em', height: '15em'}}/>
                <br/><br/>
                <h1>loading ...</h1> 
            
            </div> : 

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
                        <h4>Reviewer ID: {this.state.reviews[0]}</h4><br/>
                        <h4>Date: {this.state.reviews[1]}</h4><br/>
                        <h4>Star rating: {this.state.reviews[2]} /5</h4><br/>
                        <h4>Text: {this.state.reviews[3]}</h4><br/>
                    </div>
                </div>

                <div>
                    {this.state.reviews.map(item => <div> {item} </div>)}
                </div>
                
            </div>
        )
    }
}

export default withRouter(myAccount);