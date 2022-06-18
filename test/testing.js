// const { assert } = require("chai");



const myContract = artifacts.require('./build/Making_token');
contract("ERC20", async accounts => {

    it("should put 5000 in the first account", async () => {
        const instance = await myContract.deployed();
        const balance = await instance.balanceOf.call(accounts[0]);
        assert.equal(balance.valueOf(), 5000);
        const c = await instance.owner.call();
    })

    it("transfer", async () => {
        const instance = await myContract.deployed();
        const balance1 = await instance.balanceOf.call(accounts[1]);
        const balance2 = await instance.transfer(accounts[1], 1000, { from: accounts[0] });
        const balance = await instance.balanceOf.call(accounts[1]);


    })

    it("check supply", async () => {
        const instance = await myContract.deployed();
        const balance2 = await instance.totalSupply();
        const balance = await instance.balanceOf.call(accounts[1]);
    })


    it("checking approve", async () => {
        const instance = await myContract.deployed();
        const approved = await instance.approve(accounts[1], 2000)
    })

    it("checking allowance", async () => {
        const instance = await myContract.deployed();
        const approved = await instance.allowance(accounts[0], accounts[1])
        console.log(approved.toNumber());
    })

    it("transferFrom", async () => {
        const instance = await myContract.deployed();
        const balance = await instance.balanceOf.call(accounts[0]);

        const trans = await instance.transferFrom(accounts[0], accounts[1], 1000);
        const balance1 = await instance.balanceOf.call(accounts[1]);

    })

    it("minting Tokens",async ()=>{
        const instance = await myContract.deployed();
       const token_minted = await  instance.mint(10000);
        const balance = await instance.balanceOf.call(accounts[0]);

        console.log(balance);
    })

    it("burning Tokens",async () =>{
        const instance = await myContract.deployed();
        const burn_=await instance.burn(13000);
       
    })

})