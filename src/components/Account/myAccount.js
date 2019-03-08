import React, {Component} from 'react';
import firebase from '../Firebase/firebase';

class myAccount extends Component {
    state = {
        email: '',
        country: '',
        region: '',
        organizationType: '',
        organizationName: '',
        publicEthKey: ''
    }

    //TO-DO get current user 
    componentDidMount = async () => {
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/users/' + userId).once('value').then(
                function(snapshot) {
                    this.setState({email: snapshot.val().email, 
                        country: snapshot.val().country,
                        region: snapshot.val().region,
                        organizationName: snapshot.val().organizationName,
                        organizationType: snapshot.val().organizationType,
                        publicEthKey: snapshot.val().publicEthKey
                    })
                }
            )
        }

    
    render() {
        return (
            <div align="center"className="container">
                <h1> Account Details </h1> <br/>

                <h2>Email: this.state.email</h2>
                <h2>Organization Name: this.state.organizationName</h2>
                <h2>Organization Type: this.state.organizationType</h2>
                <h2>Country: this.state.country</h2>
                <h2>Region: this.state.region</h2>
                <h2>Public Ethereum Key: this.state.publicEthKey</h2>
            </div>
        )
    }
}

export default myAccount;