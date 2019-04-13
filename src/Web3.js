import Web3 from "web3";

let web3 = null;

export function initWeb3(provider) {
  web3 = new Web3(provider);
}

export function getWeb3() {
  return web3;
}

export function sendTransaction(transaction, args) {
  return new Promise((resolve, reject) => {
    transaction.send(...args)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}
