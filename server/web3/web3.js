const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const ethUtil = require('ethereumjs-util');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


module.exports = {
    web3signup: (user) => {
        const name = user.username;
        const password = user.password;

        // create a new Ethereum account
        const account = web3.eth.accounts.create();

        // create a new smart contract on the blockchain
        const contractAbi = [{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_password","type":"string"}],"name":"addUser","outputs":[],"payable":false,
        "stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_email","type":"string"}],"name":"getUser","outputs":[{"name":"","type":"string"},
        {"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,
        "stateMutability":"nonpayable","type":"constructor"}];

        const contractAddress = account.address; // replace with the address of your smart contract
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        // create a new transaction to add the user's data to the smart contract
        const nonce = web3.eth.getTransactionCount(account.address);
        const gasPrice = web3.utils.toWei('10', 'gwei');
        const gasLimit = 1000000;
        const data = contract.methods.addUser(name, password).encodeABI();
        const txParams = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            to: contractAddress,
            data: data,
            chainId: 3 // replace with the chain ID of your blockchain network
        };
        const tx = new Tx(txParams);
        tx.sign(ethUtil.toBuffer(account.privateKey));
        const serializedTx = tx.serialize();
        
        // send the transaction to the blockchain
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
            if (err) {
              console.log(err);
              res.status(500).send('Error sending transaction');
            } else {
              console.log('Transaction hash:', hash);
              res.status(200).send('Signup successful');
            }
        });
    }
}