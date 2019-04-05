import React from 'react'
import { NavLink, withRouter} from 'react-router-dom'
import {NavItem} from 'react-bootstrap';

/* navigation options for unauthenticated users */
const SignedOut = () => {
    return (
        <React.Fragment>
            <NavItem><NavLink to='/login' style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}}>Login</NavLink></NavItem>
            <NavItem><NavLink to='/signup' style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}}>Sign Up</NavLink></NavItem>
        </React.Fragment>
    )
}

export default withRouter(SignedOut)