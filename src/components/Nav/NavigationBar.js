import React from 'react';
import { NavLink } from 'react-router-dom'
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import logoSmall from '../../Images/navLogo.png';
import firebase from '../Firebase/firebase';    

/* Navigation bar component that updates depending on users' auth status */
const NavigationBar = () => {
    var user = firebase.auth().currentUser;
    //will display signed in links only if user exists (aka signed in to firebase)
    const Links = user ? <SignedIn /> : <SignedOut />

    return (
        <nav className="navbar navbar-expand-lg navbar-light  " style={{backgroundColor: "#B65DF3"}}>
            <div className="container" style={{backgroundColor: 'rgba(0,0,0,0.0)'}}>
                <img src={logoSmall} alt="logo" style={{width: '5em', height: '5em'}}/>
                <NavLink to='/' exact style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}}> Basalt</NavLink>
                { Links }
            </div>
        </nav>
    )
}

export default NavigationBar