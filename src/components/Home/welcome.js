import React, {Component} from 'react';

class Welcome extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div align="center"className="container">
                <h1> Welcome to Basalt </h1> <br/>
                
                <h2> About </h2> <br/>
                <p> This application aims to use the Ethereum Blockchain to help connect colleges and businesses
                    around the world. <br/>

                    Providing a place for these organizations to stop the problem of applicants getting jobs with
                    false credentials. <br />

                    This application was created for my final year Software Development project at IT Carlow
                </p>
                <br/><br/><br/><br/>
                <h2> How will it work</h2>
                <p>
                    A college uploads a document containing details about one of their student. (The information they 
                    choose to disclose is at the institutes discretion) The college then uploads the document to this 
                    application and it is stored on an IPFS node. The link to that node is stored on the Ethereum Blockchain 
                    network. <br/>

                    The student can then provide a business they wish to apply to with this document or the business may contact 
                    the college with this application. The business can then view the students academic credentials with this document. 
                
                </p>
                <br/><br/><br/><br/>
                <h2> What will you need? </h2>
                <p> 
                    In order to store and recieve documents from the Ethereum Blockchain you will need to download the browser extension
                    <a href="https://metamask.io/"> Metamask.</a> Once installed it will appear in the top right of your web browser where 
                    you need to go and sign up for metamask. (Ensure you never reveal your private account key or your pneumonic seed 
                    phrase - we will never ask you for these!) <br />

                    It is also recommended that you go to Metamasks' settings and enable private mode, meaning site must request access 
                    to your wallet before being able to view your details. <br />
                </p>
                <br/><br/><br/><br/>
                <h2> Contact </h2> <br/>
                <p>
                    If you wish to contact me, please email me at - ngrogan15@gmail.com <br/>
                </p>
            </div>
        )
    }
}

export default Welcome;