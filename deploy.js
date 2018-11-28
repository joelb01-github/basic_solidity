const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// end point of the Infura node API inside the Rinkeby network
const endPoint = 'https://rinkeby.infura.io/v3/6e67d1b9d581434bb3321f22808c9af4';
// our own mnemomic that will allow to retrieve our account keys
const mnemomic = 'come glow team student receive grief crouch drink mother arch swift thought';

// setting up the HD Wallet provider
const provider = new HDWalletProvider(mnemomic, endPoint);

const web3 = new Web3(provider);


// creating a function to be able to use async/wait and not promises (as needed to be done inside of a function)
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Existing accounts available:', accounts);
  console.log('Attempting to deploy from account:', accounts[0]);

  const createdContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ 
      data: bytecode, 
      arguments: ['tchuss !']})
    .send({
      gas: '1000000',
      from: accounts[0]
    });

  console.log('Contract deployed to:', createdContract.options.address);
};
deploy();