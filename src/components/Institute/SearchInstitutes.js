import React, {Component} from 'react';
import firebase from '../Firebase/firebase';
import { withRouter } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

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

        rating: 0,
        canReview: false,
        reviewText: '',
        reviews: [],
        detailsFound: false,
    }

    /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    /* Find selected institute in Firebase database */
    getInstitutes = async(e) => {
        e.preventDefault()
        var _key = this.state.key
        const loc = firebase.database().ref('/users/' + _key)
        console.log(loc)
        loc.once('value', snapshot => {
            if(snapshot.exists()){
                console.log('exists')
                this.setState({
                    email: snapshot.child('email').val(),
                    instituteName: snapshot.child('organizationName').val(),
                    instituteType: snapshot.child('organizationType').val(),
                    region: snapshot.child('Region').val(),
                    country: snapshot.child('country').val(),
                    publicEthKey: snapshot.child('EthKey').val(),
                    canReview: true,
                    detailsFound: true
                })
            }
            else {
                this.setState({
                    canReview: false,
                    detailsFound: false
                })
                alert("No Institute Found")
            }
        })
        this.setState({user: firebase.auth().currentUser})
       // console.log(this.state.user)
        this.setState({uid : firebase.auth().currentUser.uid})
        //console.log(this.state.uid)
    }

    // changes the star rating
    changeRating = async( newRating, name ) =>{
        if(this.state.canReview){
            this.setState({
                rating: newRating
            });
        }
        else {
            alert("Cannot review until you search for an institute")
        }
    }

    /* adds rating to firebase database */
    addReview = async() => {
        //check user has given a star rating
        if(this.state.rating <= 0){
            alert("Please select a rating before submitting")
        }
        else if(this.state.uid == this.state.key)
        {
            alert("You can't review yourself")
        }
        else{
            //get student details from state variables & current user uid
            var _uid = this.state.uid
            // var _uid = firebase.auth().currentUser.uid
            var _institiuteID = this.state.key
            let _newDate = new Date()
            _newDate = _newDate.toDateString()
            var _rating = this.state.rating
            var _reviewText = this.state.reviewText

            // database.ref.students.uid.studentNumber 
            const db = firebase.database()
            db.ref().child("reviews").child(_institiuteID).child(_uid).set(
                {   
                    rating: _rating,
                    date: _newDate,
                    text: _reviewText
                }
            );
            alert("Review sent")
        }
    }

    /* Find reviews in firebase database for selected institute */
    getReviews = async (e) => {
        e.preventDefault()
        if(this.state.canReview){
            var _keySearch = this.state.key
            // get reviews for the current user
            const loc2 = firebase.database().ref('/reviews/' + _keySearch)
            var theReviews = []
            loc2.once('value', snapshot => {
                if(snapshot.exists()) {
                    var i = 0;
                    snapshot.forEach(child => {
                        var theVal = child.val()
                        theReviews.push(theVal)
                        var _reviewer = child.key
                        var _date = theReviews[i].date
                        var _rating = theReviews[i].rating
                        var _text = theReviews[i].text
                        i++
                        this.setState({reviews: this.state.reviews.concat([_reviewer, _date, _rating, _text])})
                    })
                } 
                else {
                    alert("No Reviews Found")
                }
            })
        }
        else {
            alert("Cannot see reviews until you search for an institute")
        }
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
                <h1> Search for an institute </h1><br/>

                <div align="center">
                    <form>
                        <div className="form-group " style={{width: "40%"}}>
                            <input value={this.state.key} onChange={this.handleChange} className="form-control" id="key" type="text" name="key" placeholder="Institute ID" required/> 
                        </div>
                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.getInstitutes}> Search </button>
                    </form>
                </div>
            </div> :

            <div align="center"className="container" style={{paddingTop: '3em'}}>
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
                    <div className="col-sm">
                        <h4>{this.state.region}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>{this.state.email}</h4>
                    </div>
                    <div className="col-sm">
                        <h4>{this.state.publicEthKey}</h4>
                    </div>
                </div>
                <br/><br/><br/><br/>
                <div className="row">
                    <div className="col-sm">
                        <h3>Review this institute?</h3><br/><br/><br/><br/>
                        <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.addReview}> Submit Review </button>
                    </div>
                    <div className="col-sm">
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="purple"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                        />
                        <br/><br/><br/><br/>
                        <label>Add some text to your review</label><br/>
                        <textarea value={this.state.reviewText} onChange={this.handleChange} id="reviewText" name="reviewText" style={{minWidth: '40%', minHeight: '14em'}}/>
                    </div>
                    
                </div>
                <br/><br/><br/><br/>
                
                <h3>See this institute's reviews</h3><br/><br/><br/>
                <button className="btn btn-lg text-white" style={{backgroundColor: "#B65DF3"}} type="submit" onClick={this.getReviews}> Get Reviews </button>
                

                <br/><br/><br/><br/>
                <div className="row">
                    <div className="col-3" ><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Reviewer ID </h3></div>
                    <div className="col-3" ><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Date </h3></div>
                    <div className="col-3" ><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Star rating  /5</h3></div>
                    <div className="col-3" ><h3 className="text-white" style={{backgroundColor: '#B65DF3', padding: '.2em'}}>Text</h3></div>                    
                </div>
                <br/><br/>
                <div className="row">
                    
                    {this.state.reviews.map(item => <div className="col-3" style={{marginBottom: '3em'}}> <h5>{item}</h5> </div>)}
                </div>                
            </div>
        )
    }
}

export default withRouter(SearchInstitutes);