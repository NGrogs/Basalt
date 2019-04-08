import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {NavItem} from 'react-bootstrap';
import firebase from '../Firebase/firebase';

/**
 *  navigation options for authenticated users 
*/
const SignedIn = () => {
    return (
        <React.Fragment>
            <NavItem><NavLink to='/FileUpload' style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}}>File Upload</NavLink></NavItem>
            <NavItem><NavLink to='/FileRetrieve' style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}}>File Retrieve</NavLink></NavItem>
            <NavItem><NavLink to='/viewStudent' style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}}>View Student</NavLink></NavItem>
            <NavItem><NavLink to='/myAccount' style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}}>My Account</NavLink></NavItem>
            <NavItem><NavLink to='/searchInstitute' style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}}>Search Institute</NavLink></NavItem>
            <NavItem><NavLink to='/login' style={{color: 'white', fontSize: '1.5em', display: 'block'}} activeStyle={{fontWeight: "bold",color: "#121212"}} onClick={() =>firebase.auth().signOut()}>Logout</NavLink></NavItem>
        </React.Fragment>
    )
}

export default withRouter(SignedIn)