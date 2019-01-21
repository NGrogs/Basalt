import React from 'react'
import { NavLink } from 'react-router-dom'
//import "bootstrap/dist/css/bootstrap.css";
import {NavItem} from 'react-bootstrap';

const SignedOut = () => {
    return (
        <React.Fragment>
            <NavItem><NavLink to='/login'>Login</NavLink></NavItem>
            <NavItem><NavLink to='/signup'>Sign Up</NavLink></NavItem>
        </React.Fragment>
    )
}

export default SignedOut