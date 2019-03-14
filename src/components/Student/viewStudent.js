import React, {Component} from 'react';
import firebase from '../Firebase/firebase';

class viewStudent extends Component {
    state = {
        user: '',
        uid: '',

        StudentName: '',
        StudentNumber: '',
        CourseCode: '',
        CourseName: ''
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
            const loc = firebase.database().ref('/students/' + _uid)
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
                <h1> View Student page </h1>
                
                
            </div>
        )
    }
}

export default viewStudent;