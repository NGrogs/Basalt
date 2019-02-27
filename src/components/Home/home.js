import React, {Component} from 'react';
import firebase from '../Firebase/firebase';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        firebase.auth.signOut();
    }

    render() {
        return (
            <div align="center"className="container">
                <h1> Home page </h1>
                <br/><br/>

                <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} onClick={this.logout}> Logout </button>
            </div>
        )
    }
}

export default Home;