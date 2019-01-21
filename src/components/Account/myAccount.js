import React, {Component} from 'react';
import firebase from '../Firebase/firebase';

class myAccount extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    
    render() {
        return (
            <div align="center"className="container">
                <h1> Account Details </h1>

                
            </div>
        )
    }
}

export default myAccount;