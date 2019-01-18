import React, {Component} from 'react';
import Firebase from '../Firebase/firebase';

class Signup extends Component {
    
        state = {
            email: '',
            password: ''
        }
    

    /* updates fields when changed */
    handleChange = (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    signup = (e) => {
        e.preventDefault();
        Firebase.auth().createUserWithEmailAndPassword(this.state.email,
            this.state.password).then((u) =>{ 
            }).then((u) => {console.log(u)}).catch((error)=> {
                console.log(error);
            });
    }


    /* renders the app */
    render() {
        return (
            <div align="center">
                <h1>Sign Up</h1>
                <form>
                    <label> Email </label>
                    <input value={this.state.email} onChange={this.handleChange} id="email" type="email" name="email" placeholder="Email Address" />

                    <label> Password </label>
                    <input value={this.state.password} onChange={this.handleChange} id="password" type="password" name="password" placeholder="Password" />

                    <button type="submit" onClick={this.signup}> SIgn Up </button>

                </form>
            </div>
        );
    }
}

export default Signup;