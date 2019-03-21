import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import { withRouter } from 'react-router-dom';

class Home extends Component {
    state ={

    }

    logout = (e) => {
        e.preventDefault();
        firebase.auth().signOut().then(this.handleResolve).catch(this.handleError)
    }

    handleResolve = () => {
    console.log('Signed Out');
    this.props.history.push('/login')
    }

    handleError = (error) => {
    console.error('Sign Out Error', error);
    }


    render() {
        return (
            <div align="center"className="container">
                <h1> Home page </h1>
                <br/><br/>
                <h2>Hello: {this.state.user} </h2>
                <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} onClick={this.logout}> Logout </button>
            </div>
        )
    }
}

export default withRouter(Home);