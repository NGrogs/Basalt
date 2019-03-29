import React from 'react'
import { NavLink } from 'react-router-dom'
//import "bootstrap/dist/css/bootstrap.css";
import {NavItem} from 'react-bootstrap';

const SignedOut = () => {
    return (
        <React.Fragment>
            <NavItem><NavLink to='/login' style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}}>Login</NavLink></NavItem>
            <NavItem><NavLink to='/signup' style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}}>Sign Up</NavLink></NavItem>
        </React.Fragment>
    )
}

export default SignedOut