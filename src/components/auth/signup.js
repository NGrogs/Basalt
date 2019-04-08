import React, {Component} from 'react';
import firebase from '../Firebase/firebase';

/**
 *  This component creates a new user in firebase Auth service
 *  Also creates new database entry for additional user information
 */
class Signup extends Component {
    
        state = {
            email: '',
            password: '',
            organizationName: '',
            organizationType: '',
            country: '',
            region: '',
            publicEthKey: ''
        }
    

    /* updates fields when changed */
    handleChange = (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    /* updates dropdown when changed */
    dropChange = (e) => {
        this.setState({
            organizationType: e.target.value 
        })
    }

    /* add new user and create database reference */
    signup = (e) => {
        e.preventDefault();
        //get user details from state variables
        var _email = this.state.email
        var _organizationName = this.state.organizationName
        var _organizationType = this.state.organizationType
        var _country = this.state.country
        var _region = this.state.region
        var _ethKey = this.state.publicEthKey

        const db = firebase.database()
        // 1: create the user 
        firebase.auth().createUserWithEmailAndPassword(this.state.email,
            this.state.password).then(
                // 2: add a db document with additional details
                (userCredential)=>{ (
                    db.ref().child("users").child(userCredential.user.uid).set(
                        {   email: _email, 
                            organizationName: _organizationName, 
                            organizationType: _organizationType,
                            country: _country,
                            Region: _region,
                            EthKey: _ethKey
                        },
                         // 3: send user to login page
                        this.props.history.push('/')
                    )
                    ).catch((error) => {
                        console.log(error);
                        alert("invalid signup details")
                        this.props.history.push('/signup')
                    })
        
                }).catch((error) => {
                    console.log(error);
                    alert("invalid signup details")
                    this.props.history.push('/signup')
                })
}

    /* renders the app */
    render() {
        return (
            <div align="center" style={{marginTop: '7em'}}>
                <h1>Sign Up</h1><br/><br/>
                <form>
                <div className="row">
                <div className="col-sm">
                    <div className="form-group " style={{width: "60%"}}>
                        <label> Email </label>
                        <input value={this.state.email} onChange={this.handleChange} className="form-control" id="email" type="email" name="email" placeholder="Email Address" required/>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group" style={{width: "60%"}}>
                        <label> Organization Type </label>
                        <select className="form-control" id="organizationType" name="organizationType" onChange={this.dropChange} value={this.state.organizationType} required>
                            <option value="educational institute"> Educational Institute </option>
                            <option value="business"> Business </option>
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group" style={{width: "60%"}}>
                        <label> Country </label>
                        <input  value={this.state.country} onChange={this.handleChange} className="form-control" id="country" type="text" name="country" placeholder="What country are you based in?" required/>
                    </div>                    
                </div>
                </div>
                <div className="row">
                <div className="col-sm">
                    <div className="form-group" style={{width: "60%"}}>
                        <label> Password </label>
                        <input  value={this.state.password} onChange={this.handleChange} className="form-control" id="password" type="password" name="password" placeholder="Password" required/>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group" style={{width: "60%"}}>
                        <label> Organization name </label>
                        <input value={this.state.organizationName} onChange={this.handleChange} className="form-control" id="organizationName" type="text" name="organizationName" placeholder="College/Company Name" required/>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group" style={{width: "60%"}}>
                        <label> Region / Province </label>
                        <input  value={this.state.region} onChange={this.handleChange} className="form-control" id="region" type="text" name="region" placeholder="What region of the country are you based in?" required/>
                    </div>
                </div>
                </div>
                <br/><br/>
                    <div className="form-group" style={{width: "40%"}}>
                        <label> Public Key of Ethereum wallet </label>
                        <input value={this.state.publicEthKey} onChange={this.handleChange} className="form-control" id="publicEthKey" type="text" name="publicEthKey" placeholder="Your PUBLIC Ethereum wallet key" required/>
                    </div>
                    
                    <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.signup}> Sign Up </button>
                </form>
            </div>
        )
    }
}

export default Signup;