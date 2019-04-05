import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import logo from '../../Images/logoOGG.png';
import { withRouter } from 'react-router-dom';

class Login extends Component {
        state = {
            email: '',
            password: ''
        }
    
    /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    /* login the user */
    login = (e) => {
        e.preventDefault();
        var _email = this.state.email
        var _password = this.state.password

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return firebase.auth().signInWithEmailAndPassword(_email, _password).then(
                (u)=>{ (
                    // send user to index page
                    this.props.history.push('/')
                )
                }).catch((error) => {
                    alert("invalid login details")
                    // return user to login page
                    this.props.history.push('/login')
                })
            })
        .catch(function(error) {
        // Handle Errors here
    });
    }

    // sends email to user to reset their password
    resetPassword = async() => {
        firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
            alert("An email has been sent allowing you to reset your password")
        }).catch(function(error){
            alert("an error occured or this is an invalid email address")
        })
    }

    /* renders the app */
    render() {
        return (
            <div align="center" style={{marginTop: '7em'}}>
                <form >
                <div className="row" style={{maxWidth: '100%'}}>
                    <div className="col-sm">
                        <img src={logo} alt="logo" style={{width: '25em', height: '25em'}}/>
                    </div>
                    <div className="col-sm">
                    <h1>Login</h1><br/><br/><br/>
                        <div className="form-group " style={{width: "40%"}}>
                            <input value={this.state.email} onChange={this.handleChange} className="form-control" id="email" type="email" name="email" placeholder="Email Address" required/> 
                        </div>
                        <br/>
                        <div className="form-group " style={{width: "40%"}}>                            
                            <input value={this.state.password} onChange={this.handleChange} className="form-control" id="password" type="password" name="password" placeholder="Password" required/> 
                        </div>
                        <br/>
                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.login}> Login </button>
                        <br/><br/>
                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.resetPassword}> Forgot password? </button>
                    </div>
                </div>                
                </form>
            </div>
        )
    }
}

export default withRouter(Login);