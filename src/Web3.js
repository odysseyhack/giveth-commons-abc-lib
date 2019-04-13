import Web3 from "web3";

let web3 = null;

export function initWeb3(provider) {
  web3 = new Web3(provider);
}

export function getWeb3() {
  return web3;
}
