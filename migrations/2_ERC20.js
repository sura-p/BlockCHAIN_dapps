const ERC20 = require("../build/contracts/Making_token.json");

  module.exports = async done => {

  const add = "0x29713FCECfAD5F4da72D04ceCe8497bD1Cc39774";

  const b = await ERC20.deployed();
  const c  = await b.check_balance(add);
  console.log(c.toString());
  done();

 } 

