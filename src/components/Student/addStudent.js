import React, {Component} from 'react';
import firebase from '../Firebase/firebase';

class addStudent extends Component {
    state = {
        name: '',
        studentNumber: '',
        courseCode: '',
        courseName: ''
    }

     /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    createStudent = (e) => {
        e.preventDefault();
        
    }

    render() {
        return (
            <div align="center">
                <h1> Add Student page </h1><br/>
                <form>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Name</label>
                        <input value={this.state.name} onChange={this.handleChange} className="form-control" id="name" type="text" name="name" placeholder="name" />
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Student Number</label>
                        <input value={this.state.studentNumber} onChange={this.handleChange} className="form-control" id="studentNumber" type="text" name="StudentNumber" placeholder="Student Number" />
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Course Code</label>
                        <input value={this.state.courseCode} onChange={this.handleChange} className="form-control" id="courseCode" type="text" name="courseCode" placeholder="Course Code" />
                    </div>
                    <div className="form-group " style={{width: "40%"}}>
                        <label>Course Name</label>
                        <input value={this.state.courseName} onChange={this.handleChange} className="form-control" id="courseName" type="text" name="courseName" placeholder="Course Name" />
                    </div>
                        
                    <button type="submit" onClick={this.createStudent}> Add new student </button>
                </form>
            </div>
        )
    }
}

export default addStudent;