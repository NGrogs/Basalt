import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Web3 from 'web3';


import 'bootstrap/dist/css/bootstrap.css';

import NavigationBar from './components/Nav/NavigationBar';
import Welcome from './components/Home/welcome';
import Home from './components/Home/home';
import Login from './components/Auth/login';
import SignUp from './components/Auth/signup';
import Dapptest from './components/Dapp/DappTest';
import addStudent from './components/Student/addStudent';
import viewStudent from './components/Student/viewStudent';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar />
                    <Switch>
                        <Route exact path='/' component={Welcome} />
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/login' component={Login} /> 
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/Dapptest' component={Dapptest} />
                        <Route exact path='/addStudent' component={addStudent} />
                        <Route exact path='/viewStudent' component={viewStudent} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;