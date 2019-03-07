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
            this.props.history.push('/home')
    }

    /* renders the app */
    render() {
        return (
            <div align="center" style={{marginTop: '7em'}}>
            <h1>Login</h1><br/><br/>
                <form >
                    <div className="form-group " style={{width: "40%"}}>
                        <label> Email </label>
                        <input value={this.state.email} onChange={this.handleChange} className="form-control" id="email" type="email" name="email" placeholder="Email Address" required/> 
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label> Password </label>
                        <input value={this.state.password} onChange={this.handleChange} className="form-control" id="password" type="password" name="password" placeholder="Password" required/> 
                    </div>
                    <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.login}> Login </button>
                </form>
            </div>
        )
    }
}

export default Login;