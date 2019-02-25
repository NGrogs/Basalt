import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.css';

import NavigationBar from './components/Nav/NavigationBar';
import Welcome from './components/Home/welcome';
import Home from './components/Home/home';
import Login from './components/Auth/login';
import SignUp from './components/Auth/signup';
import FileUpload from './components/Dapp/FileUpload';
import viewStudent from './components/Student/viewStudent';
import Footer from './components/Home/Footer';

class App extends Component {
    render() {
        return (
            <React.Fragment>
            <BrowserRouter>
                <div className="pb-5">
                    <NavigationBar />
                    <Switch>
                        <Route exact path='/' component={Welcome} />
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/login' component={Login} /> 
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/FileUpload' component={FileUpload} />
                        <Route exact path='/viewStudent' component={viewStudent} />
                    </Switch>
                </div>
            </BrowserRouter>
            <Footer />
            </React.Fragment>
        )
    }
}

export default App;