const Web3 = require("web3");

let web3 = null;

module.exports = {
  initWeb3: (provider) => {
    web3 = new Web3(provider);
  },

  getWeb3: () => {
    return web3;
  },

  sendTransaction: (transaction, args) => {
    return new Promise((resolve, reject) => {
      transaction.send(...args)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
}
