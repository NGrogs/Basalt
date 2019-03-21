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
        publicEthKey: ''
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

    
    render() {
        return (
            <div align="center"className="container">
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
            </div>
        )
    }
}

export default withRouter(myAccount);