import React, {Component} from 'react';
import Firebase from '../Firebase/firebase';

class Signup extends Component {
    
        state = {
            email: '',
            organizationName: '',
            organizationType: '',
            country: '',
            region: '',
            publicEthKey: '',
            
        }
    

    /* updates fields when changed */
    handleChange = (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    completeProfile = (e) => {
        /* TO-DO push the new data to db */
    }

    /* renders the app */
    render() {
        return (
            <div align="center">
                <h1>Complete Profile</h1>
                <form>
                    <div className="form-group " style={{width: "40%"}}>
                        <label> Email </label>
                        <input value={this.state.email} onChange={this.handleChange} className="form-control" id="email" type="email" name="email" placeholder="Email Address" />
                    </div>
                    <div className="form-group" style={{width: "40%"}}>
                        <label> Organization name </label>
                        <input  value={this.state.organizationName} onChange={this.handleChange} className="form-control" id="orgName" type="text" name="orgName" placeholder="College/Company Name" />
                    </div>
                    <div className="form-group" style={{width: "40%"}}>
                        <label> Organization Type </label>
                        <input  value={this.state.organizationType} onChange={this.handleChange} className="form-control" id="orgType" type="text" name="orgType" placeholder="Are you a college or a business?" />
                    </div>
                    <div className="form-group" style={{width: "40%"}}>
                        <label> Country </label>
                        <input  value={this.state.country} onChange={this.handleChange} className="form-control" id="country" type="text" name="country" placeholder="What country are you based in?" />
                    </div>
                    <div className="form-group" style={{width: "40%"}}>
                        <label> Region / Province </label>
                        <input  value={this.state.region} onChange={this.handleChange} className="form-control" id="region" type="text" name="region" placeholder="What region of the country are you based in?" />
                    </div>
                    <div className="form-group" style={{width: "40%"}}>
                        <label> Public Key of Ethereum wallet </label>
                        <input  value={this.state.publicEthKey} onChange={this.handleChange} className="form-control" id=".publicEthKey}" type="text" name=".publicEthKey}" placeholder="Your PUBLIC Ethereum wallet key" />
                    </div>




                    <button className="btn btn-primary btn-lg" type="submit" onClick={this.completeProfile}> Complete Profile </button>
                </form>
            </div>
        );
    }
}

export default Signup;