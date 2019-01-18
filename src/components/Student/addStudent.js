import React, {Component} from 'react';
import firebase from '../Firebase/firebase';

class addStudent extends Component {
    state = {
        name = '',
        studentNumber = '',
        courseCode = '',
        courseName = ''
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
            <div align="center"className="container">
                <h1> Add Student page </h1>

                <form>
                    <label>Name</label>
                    <input value={this.state.name} onChange={this.handleChange} id="name" type="text" name="name" placeholder="name" />

                    <label>Student Number</label>
                    <input value={this.state.studentNumber} onChange={this.handleChange} id="studentNumber" type="text" name="StudentNumber" placeholder="Student Number" />

                    <label>Course Code</label>
                    <input value={this.state.courseCode} onChange={this.handleChange} id="courseCode" type="text" name="courseCode" placeholder="Course Code" />

                    <label>Course Name</label>
                    <input value={this.state.courseName} onChange={this.handleChange} id="courseName" type="text" name="courseName" placeholder="Course Name" />

                    <label></label>

                    <button type="submit" onClick={this.createStudent}> Add new student </button>
                </form>
            </div>
        )
    }
}

export default addStudent;