const HDWalletProvdier = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');

const provider = new HDWalletProvdier(
  "spice tortoise fiction grit sample nephew bird task icon rotate marine clown",
  "https://rinkeby.infura.io/v3/7f8061bd30eb4a709b474d8f57a4340b"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('deploying from', accounts[0])

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: ['Hi there'] })
        .send({ gas: '1000000', from: accounts[0] });
    
    console.log('address is ', result.options.address);
};

deploy();