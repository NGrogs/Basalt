import React from 'react'
import { NavLink } from 'react-router-dom'

import {NavItem} from 'react-bootstrap';

const SignedIn = () => {
    return (
        <React.Fragment>
            <NavItem><NavLink to='/DappTest'>Dapptest</NavLink></NavItem>
            <NavItem><NavLink to='/addStudent'>Add Student</NavLink></NavItem>
            <NavItem><NavLink to='/viewStudent'>View Student</NavLink></NavItem>
        </React.Fragment>
    )
}

export default SignedIn