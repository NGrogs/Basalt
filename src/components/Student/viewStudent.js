import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import { withRouter } from 'react-router-dom';

class viewStudent extends Component {
    state = {
        user: '',
        uid: '',

        studentName: '',
        StudentNumber: '',
        courseCode: '',
        courseName: '',
        blockID: '',

        detailsFound: false,
    }

    /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    /* Search firebase database for student details */
    findStudent = (e) => {
        e.preventDefault()
        var _studentNumber = this.state.StudentNumber
        var _uid = this.state.uid
        
        // get reference to database location we want students/currentUser/studentNumber
        const loc = firebase.database().ref('/students/' + _uid + '/' + _studentNumber)

        loc.once('value').then(snapshot => {
            var blockchainKey = snapshot.child("blockchainKey").val()
            var courseCode = snapshot.child("courseCode").val()
            var courseName = snapshot.child("courseName").val()
            var studentName = snapshot.child("studentName").val()

            this.setState({
                blockID: blockchainKey,
                courseCode: courseCode,
                courseName: courseName,
                studentName: studentName,
                detailsFound: true
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

            !this.state.detailsFound ? 
            <div align="center"className="container" style={{paddingTop: '3em'}}> 
                <h1> Enter a student's ID to view their details </h1><br/>

                <div align="center">
                    <form>
                        <div className="form-group " style={{width: "40%"}}>
                            <input value={this.state.StudentNumber} onChange={this.handleChange} className="form-control" id="StudentNumber" type="text" name="StudentNumber" placeholder="Student ID" required/> 
                        </div>
                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.findStudent}> Search </button>
                    </form>
                </div>
            </div> : 

            <div align="center"className="container" style={{paddingTop: '3em'}}>
                <h1> Enter a student's ID to view their details </h1><br/>

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
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Student Name</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Course Code</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Course Name</h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>ID on Blockchain</h3>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm">
                        <h4>{this.state.studentName}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>{this.state.courseCode}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>{this.state.courseName}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>{this.state.blockID}</h4>
                    </div>
                </div>
            
            </div>
        )
    }
}

export default withRouter(viewStudent);