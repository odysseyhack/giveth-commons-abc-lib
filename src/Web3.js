const Web3 = require("web3");

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
      transaction.send({ from: sender.address })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },

  callView: (sender, transaction) => {
    return new Promise((resolve, reject) => {
      transaction.call({ from: sender.address })
        .then(result => resolve(result))
        .catch(err => reject(err));
    })
  }
}
