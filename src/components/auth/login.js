import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import logo from '../../Images/logoOGG.png';

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
        firebase.auth().signInWithEmailAndPassword(this.state.email,
            this.state.password).then((u)=>{
            }).catch((error) => {
                console.log(error);
            }).then(
                this.props.history.push('/home')
            )
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
                    </div>
                </div>                
                </form>
            </div>
        )
    }
}

export default Login;