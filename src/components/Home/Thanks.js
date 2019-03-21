import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class Thanks extends Component {
        state = {
        
        }
    
    /* renders the app */
    render() {
        return (
            <div align="center" style={{marginTop: '7em'}}>
                <div>Logo made with <a href="https://www.designevo.com/en/" title="Free Online Logo Maker">DesignEvo</a></div>

                <div>Thank to my Lecturer Patrick Tobin at IT Carlow</div>

                
            </div>
        )
    }
}

export default withRouter(Thanks);