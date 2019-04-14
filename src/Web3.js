const Web3 = require("web3");
const utils = require("./utils");

let web3 = null;

module.exports = {
  initWeb3: (provider) => {
    web3 = new Web3(provider);
  },

  getWeb3: () => {
    return web3;
  },

  sendTransaction: (sender, transaction) => {
    return new Promise((resolve, reject) => {
      transaction.send(utils.getWeb3Options(sender))
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },

  callView: (sender, transaction) => {
    return new Promise((resolve, reject) => {
      transaction.call(utils.getWeb3Options(sender))
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
}
