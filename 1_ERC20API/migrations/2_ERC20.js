const ERC20 = artifacts.require("Making_token");

module.exports = function (deployer) {
  deployer.deploy(ERC20);
 } 

