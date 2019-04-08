import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import { withRouter } from 'react-router-dom';
import logoSmall from '../../Images/logoSmall.png';

/** 
 *  This component displays the account details of the current user
 *  These details are retrieved from a firebase database
*/
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

            /* Get users details from database */
            const loc = firebase.database().ref('/users/' + _uid)
            loc.once('value', snapshot => {
                snapshot.forEach(child => {
                    /* update the state variables to have the values from database */
                    this.setState({
                        email: child.val().email,
                        country: child.val().country,
                        region: child.val().Region,
                        organizationName: child.val().organizationName,
                        organizationType: child.val().organizationType,
                        publicEthKey: child.val().EthKey
                    })
                })
                /* displays the account information */
                this.setState({loading: false})
            })
        }

    /* Get the reviews for the current user from database */
    getReviews = async (e) => {
        e.preventDefault()
        var _uid = this.state.uid
        // get reviews for the current user
        const loc2 = firebase.database().ref('/reviews/' + _uid)
        var theReviews = []
        loc2.once('value', snapshot => {
            if(snapshot.exists()) {
                var i = 0;
                snapshot.forEach(child => {
                    var theVal = child.val()
                    theReviews.push(theVal)
                    var _reviewer = child.key
                    var _date = theReviews[i].date
                    var _rating = theReviews[i].rating
                    var _text = theReviews[i].text
                    i++
                    this.setState({reviews: this.state.reviews.concat([_reviewer, _date, _rating, _text])})
                })
            }
            else {
                alert("No Reviews Found")
            }
            
        })
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
                        <h4><b>Email:</b> {this.state.email}</h4>
                    </div>
                    <div className="col-sm">
                        <h4><b>Organization Name:</b> {this.state.organizationName}</h4>
                    </div>
                    <div className="col-sm">
                        <h4><b>Country:</b> {this.state.country}</h4>
                    </div>
                </div>
                <br/><br/>
                <div className="row">
                    <div className="col-sm" >
                        <h4><b>Metamask ID:</b> {this.state.publicEthKey}</h4>
                    </div>
                    <div className="col-sm">
                        <h4><b>Organization Type:</b> {this.state.organizationType}</h4>
                    </div>
                    <div className="col-sm">
                        <h4><b>Region:</b> {this.state.region}</h4>
                    </div>
                </div>

                <br/><br/><br/><br/><br/>

                <h1> Reviews </h1> <br/><br/><br/>
                <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.getReviews}> Get my reviews </button>

                <br/><br/><br/><br/>
                <div className="row">
                    <div className="col-3" ><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Reviewer ID </h3></div>
                    <div className="col-3" ><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Date </h3></div>
                    <div className="col-3" ><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Star rating  /5</h3></div>
                    <div className="col-3" ><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Text</h3></div>                    
                </div>
                <br/><br/>
                <div className="row">
                    {this.state.reviews.map(item => <div className="col-3" style={{marginBottom: '3em'}}> <h5>{item}</h5> </div>)}
                </div>
                
            </div>
        )
    }
}

export default withRouter(myAccount);