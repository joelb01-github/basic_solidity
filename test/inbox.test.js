const assert = require('assert'); // standard library used making assertion within tests
const ganache = require('ganache-cli');
const Web3 = require('web3'); // uppercase as used as constructor

const provider = ganache.provider()
const web3 = new Web3(provider);

const { interface, bytecode } = require ('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // use one of those accounts (accounts[0]) to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ 
      data: bytecode, 
      arguments: ['hi jojos']
    })
    .send({ 
      from: accounts[0], 
      gas: '1000000' 
    });

  inbox.setProvider(provider);
});

describe('Test Inbox contract', () => {
  it('contract should be deployed (has and address)', () => {
    // OK makes an asserion that the value passed exists (non null or undefined)
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const msg = await inbox.methods.message().call();
    assert.equal(msg, 'hi jojos');
  });

  it('setMessage changes message', async () => {
    const txHash = await inbox.methods.setMsg('new Jojos!').send({
      from: accounts[1],
      gas: '1000000' // not needed ?
    });
    const msg = await inbox.methods.message().call();
    assert.equal(msg, 'new Jojos!');
  })
});