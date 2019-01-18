import React from 'react'
import { NavLink } from 'react-router-dom'

import {NavItem} from 'react-bootstrap';

const SignedIn = () => {
    return (
        <React.Fragment>
            <NavItem><NavLink to='/'>link1</NavLink></NavItem>
            <NavItem><NavLink to='/'>link2</NavLink></NavItem>
            <NavItem><NavLink to='/'>link3</NavLink></NavItem>
        </React.Fragment>
    )
}

export default SignedIn