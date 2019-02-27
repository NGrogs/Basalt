import React, {Component} from 'react';

class Footer extends Component {
    state = {
    }

    render() {
        return (
            <footer className="footer text-center pt-5 pb-2 fixed-bottom" style={{backgroundColor: '#B65DF3'}}>
                <div className="container" >
                    <h3 className="footer-text text-white font-italic">Neil Grogan</h3>
                </div>
            </footer>
        )
    }
}

export default Footer;