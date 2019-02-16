import React from 'react'
import { NavLink } from 'react-router-dom'

import {NavItem} from 'react-bootstrap';

const SignedIn = () => {
    return (
        <React.Fragment>
            <NavItem><NavLink to='/FileUpload'><h4>FileUpload</h4></NavLink></NavItem>
            <NavItem><NavLink to='/viewStudent'><h4>View Student</h4></NavLink></NavItem>
        </React.Fragment>
    )
}

export default SignedIn