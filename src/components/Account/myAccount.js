import React, {Component} from 'react';
import firebase from '../Firebase/firebase';

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

    //TO-DO get current user 
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
                <h1> Account Details </h1> <br/>

                <h2>User ID: {this.state.uid}</h2>
                <h2>Email: {this.state.email}</h2>
                <h2>Organization Name: {this.state.organizationName}</h2>
                <h2>Organization Type: {this.state.organizationType}</h2>
                <h2>Country: {this.state.country}</h2>
                <h2>Region: {this.state.region}</h2>
                <h2>Public Ethereum Key: {this.state.publicEthKey}</h2>
            </div>
        )
    }
}

export default myAccount;