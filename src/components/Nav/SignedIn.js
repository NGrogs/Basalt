import React from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {NavItem} from 'react-bootstrap';
import firebase from '../Firebase/firebase';

    

const SignedIn = () => {

    return (
        <React.Fragment>
            <NavItem><NavLink to='/FileUpload'><h4 className="text-white">FileUpload</h4></NavLink></NavItem>
            <NavItem><NavLink to='/FileRetrieve'><h4 className="text-white">FileRetrieve</h4></NavLink></NavItem>
            <NavItem><NavLink to='/viewStudent'><h4 className="text-white">View Student</h4></NavLink></NavItem>
            <NavItem><NavLink to='/myAccount'><h4 className="text-white">My account</h4></NavLink></NavItem>
            <NavItem><NavLink to='/home'><h4 className="text-white">Home</h4></NavLink></NavItem>
            <NavItem><NavLink to='/login' onClick={() =>firebase.auth().signOut()}><h4 className="text-white">Logout</h4></NavLink></NavItem>
        </React.Fragment>
    )
}

export default withRouter(SignedIn)