const web3 = require("./Web3");

module.exports = {
  CommonsToken: require("./CommonsToken").CommonsToken,
  initWeb3: web3.initWeb3,
  getWeb3: web3.getWeb3
};
