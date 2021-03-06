import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

/**
 *  This component is a footer that attaches to the bottom of each page
 */
class Footer extends Component {
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
                        <h3 className="footer-text text-white font-italic"><a className="text-white" href="https://github.com/NGrogs/Basalt">Github</a></h3>
                    </div>
                </div>
                </div>
            </footer>
        )
    }
}

export default withRouter(Footer);