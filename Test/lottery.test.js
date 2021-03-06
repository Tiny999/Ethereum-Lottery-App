const assert = require('assert');
const ganache = require('ganache-cli');
const { abi, bytecode } = require('../compile');
const Web3 = require('web3');
const { lookup } = require('dns');

const provider = ganache.provider();
const web3 = new Web3(provider);

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: 1000000 })
});


describe('Lottery Contract', () => {

    it('Deloys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one entry into the lottery', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })

        assert.strictEqual(accounts[0], players[0]);
        assert.strictEqual(players.length, 1);
    })
});

