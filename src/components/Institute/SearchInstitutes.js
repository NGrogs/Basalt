import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import { withRouter } from 'react-router-dom';

class SearchInstitutes extends Component {
    state = {
        user: '',
        uid: '',
        key: '',
        email: '',
        instituteName: '',
        instituteType: '',
        country: '',
        region: '',
        publicEthKey: '',
    }

    /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }


 /*   findInstitute = async(e) => {
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
    }*/

    getInstitutes = async(e) => {
        e.preventDefault()
        var _key = this.state.instituteName
        const loc = firebase.database().ref('/users' + _key)
        loc.once('value', snapshot => {
            snapshot.forEach(child => {
                this.setState({
                    email: child.val().email,
                    instituteName: child.val().organizationName,
                    instituteType: child.val().organizationType,
                    region: child.val().Region,
                    country: child.val().country,
                    publicEthKey: child.val().EthKey
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
                <h1> Search for an institute </h1><br/>

                <div align="center">
                    <form>
                        <div className="form-group " style={{width: "40%"}}>
                            <input value={this.state.key} onChange={this.handleChange} className="form-control" id="key" type="text" name="key" placeholder="Institute ID" required/> 
                        </div>
                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.getInstitutes}> Search </button>
                    </form>
                </div>
                <br/><br/><br/>

                <div className="row">
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Institute Name: </h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Institute Type: </h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Country: </h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <h4>{this.state.instituteName}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>{this.state.instituteType}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>{this.state.country}</h4>
                    </div>
                    
                </div>

                <div className="row">
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Region: </h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Email: </h3>
                    </div>
                    <div className="col-sm">
                        <h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>public Ethereum Key: </h3>
                    </div>
                </div>
                
                <div className="row">
                <   div className="col-sm">
                        <h4>{this.state.region}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>{this.state.email}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>{this.state.publicEthKey}</h4>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(SearchInstitutes);