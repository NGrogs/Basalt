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
        /* TO-DO redirect users to complete profile page (log them in?) */
        this.props.history.push('/login')
    }

    /* renders the app */
    render() {
        return (
            <div align="center">
                <h1>Sign Up</h1>
                <form>
                    <div className="form-group " style={{width: "40%"}}>
                        <label> Email </label>
                        <input value={this.state.email} onChange={this.handleChange} className="form-control" id="email" type="email" name="email" placeholder="Email Address" required/>
                    </div>
                    <div className="form-group" style={{width: "40%"}}>
                        <label> Password </label>
                        <input  value={this.state.password} onChange={this.handleChange} className="form-control" id="password" type="password" name="password" placeholder="Password" required/>
                    </div>
                    <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.signup}> Sign Up </button>
                </form>
            </div>
        );
    }
}

export default Signup;