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
            firebase.database().ref('/users/' + _uid).once('value').then(
                function(snapshot) {
                    this.setState({email: snapshot.child("email").val(), 
                        country: snapshot.val().country,
                        region: snapshot.val().Region,
                        organizationName: snapshot.val().organizationName,
                        organizationType: snapshot.val().organizationType,
                        publicEthKey: snapshot.val().EthKey
                    })
                    console.log(snapshot.val().lYOaUSXFooNsmsFGi0rXmnwN1Ki2.Region) //works!
                    //console.log(snapshot.val()._uid.Region)
                  //  console.log(snapshot.val().$_uid.Region)
                    console.log(snapshot.val().Region.val())
                }.bind(this)
            )
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