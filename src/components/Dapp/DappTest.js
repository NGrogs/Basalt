import React, {Component} from 'react';
import Web3 from 'web3';

const web3 = new Web3("ws://localhost:8546");

class Dapptest extends Component {
    state = {
        web3Provider: null,
        contracts: {},
        account: '0x0',
        loading: false,
        contractInstance: null,
    }

     /* updates fields when changed */
    handleChange= (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        })
    }

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    initWeb3 = async () => {
    if (typeof web3 !== 'undefined') {
        Dapptest.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
    } else {
        window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
  /*  if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... *//*})
        } catch (error) {
        // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else */
    if (window.web3) {
        Dapptest.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}

    render() {
        return (
            <div align="center"className="container">
                <h1> This is Dapp Test </h1>
                
                
            </div>
        )
    }
}

export default Dapptest;