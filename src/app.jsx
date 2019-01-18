import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import NavigationBar from './components/Nav/NavigationBar';
import Home from './components/Home/home';
import Login from './components/auth/login';
import SignUp from './components/auth/signup';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/login' component={Login} /> 
                        <Route path='/signup' component={SignUp} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;