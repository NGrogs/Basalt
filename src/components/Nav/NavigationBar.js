import React from 'react';
import { Link } from 'react-router-dom';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
//import "bootstrap/dist/css/bootstrap.css";
import {Navbar} from 'react-bootstrap';

const NavigationBar = () => {
    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container   ">
                <Link to='/' className="nav-item"> Basalt</Link>
                <SignedIn />
                <SignedOut />
            </div>
        </nav>
    )
}

export default NavigationBar