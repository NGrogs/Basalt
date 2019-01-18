import React, {Component} from 'react';
import Firebase from '../Firebase/firebase';

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

    login = (e) => {
        e.preventDefault();
        Firebase.auth().signInWithEmailAndPassword(this.state.email,
            this.state.password).then((u)=>{
            }).catch((error) => {
                console.log(error);
            });
    }


    /* renders the app */
    render() {
        return (
            <div align="center">
            <h1>Login</h1>
                <form>
                    <label> Email </label>
                    <input value={this.state.email} onChange={this.handleChange} id="email" type="email" name="email" placeholder="Email Address" /> 

                    <label> Password </label>
                    <input value={this.state.password} onChange={this.handleChange} id="password" type="password" name="password" placeholder="Password" /> 

                    <button type="submit" onClick={this.login}> Login </button>

                </form>
            </div>
        )
    }
}

export default Login;