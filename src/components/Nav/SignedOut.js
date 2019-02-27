import React from 'react'
import { NavLink } from 'react-router-dom'
//import "bootstrap/dist/css/bootstrap.css";
import {NavItem} from 'react-bootstrap';

const SignedOut = () => {
    return (
        <React.Fragment>
            <NavItem><NavLink to='/login'><h4 className="text-white">Login</h4></NavLink></NavItem>
            <NavItem><NavLink to='/signup'><h4 className="text-white">Sign Up</h4></NavLink></NavItem>
        </React.Fragment>
    )
}

export default SignedOut