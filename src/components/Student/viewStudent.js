import React, {Component} from 'react';
import firebase from '../Firebase/firebase';

class viewStudent extends Component {
    state = {
        user: '',
        uid: '',

        StudentName: '',
        StudentNumber: '',
        CourseCode: '',
        CourseName: '',
        BlockID: '',
    }

    findStudent = async(e) => {
        e.preventDefault()
        var _studentNumber = this.state.StudentNumber
        var _uid = this.state.uid
        // get reference to database location we want
        const loc = firebase.database().ref('/students/' + _uid + _studentNumber)
        loc.once('value', snapshot => {
            snapshot.forEach(child => {
                this.setState({
                    StudentName: child.val().studentName ,
                    CourseCode: child.val().courseCode ,
                    CourseName:  child.val().courseName ,
                    BlockID: child.val().blockchainKey
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
                </div>
                <div className="row">
                    <div className="col-sm">
                        {this.state.studentName}
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
                </div>
                
            </div>
        )
    }
}

export default viewStudent;