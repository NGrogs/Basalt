import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import firebase from './components/Firebase/firebase';

import 'bootstrap/dist/css/bootstrap.css';

import NavigationBar from './components/Nav/NavigationBar';
import Welcome from './components/Home/welcome';
import Home from './components/Home/home';
import Login from './components/Auth/login';
import SignUp from './components/Auth/signup';
import FileUpload from './components/Dapp/FileUpload';
import FileRetrieve from './components/Dapp/FileRetrieve';
import viewStudent from './components/Student/viewStudent';
import Footer from './components/Home/Footer';
import thanks from './components/Home/Thanks';
import myAccount from './components/Account/myAccount';

class App extends Component {
    state = {
        user: {},

    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({user});
                
            }
            else {
                this.setState({user: null});
            }
        });
    }

    componentDidMount() {
        this.authListener()
    }

    render() {
        return (
            <React.Fragment>
            <BrowserRouter>
                <div className="pb-5" style={{marginBottom: "10em"}}>
                    <NavigationBar />
                    <Switch>
                        <Route exact path='/' component={Welcome} />
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/login' component={Login} /> 
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/FileUpload' component={FileUpload} />
                        <Route exact path='/viewStudent' component={viewStudent} />
                        <Route exact path='/FileRetrieve' component={FileRetrieve}/>
                        <Route exact path='/thanks' component={thanks}/>
                        <Route exact path='/myAccount' component={myAccount}/>
                    </Switch>
                </div>
            </BrowserRouter>
            <Footer />
            </React.Fragment>
        )
    }
}

export default App;