import React, {Component} from 'react';
import { withRouter, BrowserRouter, Switch, Route} from 'react-router-dom';
import firebase from './components/Firebase/firebase';
import getWeb3 from "./components/utils/getWeb3";
import storehash from './components/IPFS/storehash';
import 'bootstrap/dist/css/bootstrap.css';

import NavigationBar from './components/Nav/NavigationBar';
import Welcome from './components/Home/welcome';
import Login from './components/Auth/login';
import SignUp from './components/Auth/signup';
import FileUpload from './components/Dapp/FileUpload';
import FileRetrieve from './components/Dapp/FileRetrieve';
import viewStudent from './components/Student/viewStudent';
import Footer from './components/Home/Footer';
import myAccount from './components/Account/myAccount';
import SearchInstitute from './components/Institute/SearchInstitutes';

class App extends Component {
    state = {
        user: {},
        web3: '',
        ethAddress: '',
        account: '0x0',
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

    

    componentDidMount = async () =>{
        this.authListener()

        const Web3 = await getWeb3();
        this.setState({web3: Web3})
        // get contract address
        const ethAddress = await storehash.options.address
        this.setState({ethAddress})

        //set account for Blockchain network
        this.setState({account: await Web3.eth.getAccounts()})
    }

    render() {
        return (
            <React.Fragment>
            <BrowserRouter>
                <div className="pb-5" style={{marginBottom: "10em"}}>
                    <NavigationBar />
                    <Switch>
                        <Route exact path='/' component={Welcome} />
                        <Route exact path='/login' component={Login} /> 
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/FileUpload' render={
                            // pushes ethereum address and metamask account down to child component
                            (props) => <FileUpload {...props} acc={this.state.account} ethAdd={this.state.ethAddress} />
                            } />
                        <Route exact path='/viewStudent' component={viewStudent} />
                        <Route exact path='/searchInstitute' component={SearchInstitute} />
                        <Route exact path='/FileRetrieve' component={FileRetrieve}/>
                        <Route exact path='/myAccount' component={myAccount}/>
                    </Switch>
                </div>
            </BrowserRouter>
            <Footer />
            </React.Fragment>
        )
    }
}

export default withRouter(App);