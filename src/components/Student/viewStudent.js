import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import { withRouter } from 'react-router-dom';

class viewStudent extends Component {
    state = {
        user: '',
        uid: '',

        StudentName: '',
        StudentNumber: '',
        CourseCode: '',
        CourseName: '',
        BlockID: '',
        studentArray: [],
    }

    /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }


    findStudent = async(e) => {
        e.preventDefault()
        var _studentNumber = this.state.StudentNumber
        var _uid = this.state.uid
        
        // get reference to database location we want
        const loc = firebase.database().ref('/students/' + _uid + '/' + _studentNumber)
       // const loc = firebase.database().ref('/students/').child(_uid).child(_studentNumber)
        console.log(loc.toString())
        loc.once('value', snapshot => {
            snapshot.forEach(child => {
                this.setState({ 
                    BlockID: child.val().blockchainKey,
                    CourseCode: child.val().courseCode,
                    CourseName:  child.val().courseName,
                    StudentName: child.val().studentName
                })
            })
        })
    }

    componentDidMount = async () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                this.setState({user: firebase.auth().currentUser}) //not needed?
                this.setState({uid: firebase.auth().currentUser.uid })
            } else {
                // No user is signed in.
                //redirect to login
                this.props.history.push('/login')
            }
            }.bind(this))
        }

    render() {
        return (
            <div align="center"className="container">
                <h1> View Student page </h1><br/>

                <div align="center">
                    <form>
                        <div className="form-group " style={{width: "40%"}}>
                            <input value={this.state.StudentNumber} onChange={this.handleChange} className="form-control" id="StudentNumber" type="text" name="StudentNumber" placeholder="Student ID" required/> 
                        </div>
                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.findStudent}> Search </button>
                    </form>
                </div>
                <br/><br/><br/>
                <div className="row">
                    <div className="col-sm">
                        <h3>Student Name: </h3>
                    </div>
                    <div className="col-sm">
                        <h3>Student Number: </h3>
                    </div>
                    <div className="col-sm">
                        <h3>Course Code: </h3>
                    </div>
                    <div className="col-sm">
                        <h3>Course Name: </h3>
                    </div>
                    <div className="col-sm">
                        <h3>ID on Blockchain: </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        {this.state.StudentName}
                    </div>
                    <div className="col-sm">
                        {this.state.StudentNumber}
                    </div>
                    <div className="col-sm">
                        {this.state.CourseCode}
                    </div>
                    <div className="col-sm">
                        {this.state.CourseName}
                    </div>
                    <div className="col-sm">
                        {this.state.BlockID}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(viewStudent);