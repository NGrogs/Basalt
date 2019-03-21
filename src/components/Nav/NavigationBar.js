import React from 'react';
import { Link } from 'react-router-dom';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import logoSmall from '../../Images/logoSmall.png';
import firebase from '../Firebase/firebase';


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //show signedin links

    } else {
        //show signedout links

        
    }
    }.bind(this))
    

const NavigationBar = () => {
    var user = firebase.auth().currentUser;
    const Links = user ? <SignedIn /> : <SignedOut />

    return (
        
        <nav className="navbar navbar-expand-lg navbar-light  " style={{backgroundColor: "#B65DF3"}}>
            <div className="container ">
                <img src={logoSmall} alt="logo" style={{width: '5em', height: '5em'}}/>
                <Link to='/' className="nav-item text-white"><h4>Basalt</h4></Link>
                { Links }

            </div>
        </nav>
    )
}

export default NavigationBar