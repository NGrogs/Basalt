import React, {Component} from 'react';

class Footer extends Component {
    state = {
    }

    render() {
        return (
            <footer className="footer text-center pt-5 fixed-bottom" style={{backgroundColor: '#B65DF3'}}>
                <div className="container" >
                    <p className="footer-text">Neil Grogan</p>
                </div>
            </footer>
        )
    }
}

export default Footer;