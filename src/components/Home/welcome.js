import React, {Component} from 'react';

class Welcome extends Component {
    
    render() {
        return (
            <div align="center"className="container" style={{marginTop: '3em'}}>
                <h1> Welcome to Basalt </h1> <br/><br/><br/>
                <div className="row">
                    <div class="col-sm">
                    <h2 style={{backgroundColor: '#B65DF3', padding: '.2em'}}> About </h2>
                    <h5 style={{textAlign: 'left'}}> This application aims to use the Ethereum Blockchain to help connect colleges and businesses
                        around the world. <br/><br/>

                        Providing a place for these organizations to stop the problem of applicants getting jobs with
                        false credentials. <br /><br/>

                        This application was created for my final year Software Development project at IT Carlow
                    </h5>
                    </div>
                    <div class="col-sm">
                    <h2 style={{backgroundColor: '#B65DF3', padding: '.2em'}}> How will it work?</h2>
                    <h5 style={{textAlign: 'left'}}>
                        A college uploads a document containing details about one of their student. (The information they 
                        choose to disclose is at the institutes discretion) <br/><br/>
                        
                        The college then uploads the document to this 
                        application and it is stored on an IPFS node. The link to that node is stored on the Ethereum Blockchain 
                        network. <br/><br/>

                        The student can then provide a business they wish to apply to with this document or the business may contact 
                        the college with this application. The business can then view the students academic credentials with this document. 
                    
                    </h5>
                    </div>
                    <div class="col-sm">
                    <h2 style={{backgroundColor: '#B65DF3', padding: '.2em'}}> What will you need? </h2>
                    <h5 style={{textAlign: 'left'}}> 
                        In order to store and recieve documents from the Ethereum Blockchain you will need to download the browser extension
                        <a href="https://metamask.io/"> Metamask.</a> <br/><br/>
                        
                        Once installed it will appear in the top right of your web browser where 
                        you need to go and sign up for metamask. (Ensure you never reveal your private account key or your pneumonic seed 
                        phrase - we will never ask you for these!) <br /><br/>

                        It is also recommended that you go to Metamasks' settings and enable private mode, meaning site must request access 
                        to your wallet before being able to view your details. <br />
                    </h5>
                    </div>
                </div>
                <br/><br/><br/><br/>
                <h2 style={{backgroundColor: '#B65DF3', padding: '.2em'}}> Contact </h2> <br/>
                <h5>
                    If you wish to contact me, please email me at - ngrogan15@gmail.com <br/>
                </h5>
            </div>
        )
    }
}

export default Welcome;