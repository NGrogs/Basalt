import React from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {NavItem} from 'react-bootstrap';
import firebase from '../Firebase/firebase';

const SignedIn = () => {

    return (
        <React.Fragment>
            <NavItem><NavLink to='/FileUpload'><h4 className="text-white">File Upload</h4></NavLink></NavItem>
            <NavItem><NavLink to='/FileRetrieve'><h4 className="text-white">File Retrieve</h4></NavLink></NavItem>
            <NavItem><NavLink to='/viewStudent'><h4 className="text-white">View Student</h4></NavLink></NavItem>
            <NavItem><NavLink to='/myAccount'><h4 className="text-white">My Account</h4></NavLink></NavItem>
            <NavItem><NavLink to='/searchInstitute'><h4 className="text-white">Search Institute</h4></NavLink></NavItem>
            <NavItem><NavLink to='/login' onClick={() =>firebase.auth().signOut()}><h4 className="text-white">Logout</h4></NavLink></NavItem>
        </React.Fragment>
    )
}

export default withRouter(SignedIn)