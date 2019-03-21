import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class Footer extends Component {
    state = {
    }

    sendToThanks = (e) => {
        this.props.history.push('/thanks')
    }

    render() {
        return (
            <footer className="footer text-center pt-5 pb-2 fixed-bottom" style={{backgroundColor: '#B65DF3'}}>
                <div className="row">
                <div className="col-sm">
                    <div className="container" >
                        <h3 className="footer-text text-white font-italic">Neil Grogan</h3>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="container" >
                        <h3 className="footer-text text-white font-italic" onClick={this.sendToThanks.bind(this)}>Special thanks</h3>
                    </div>
                </div>
                </div>
            </footer>
        )
    }
}

export default withRouter(Footer);