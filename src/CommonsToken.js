var assert = require("assert");
var utils = require("./utils");
var Web3 = require("./Web3");
var abi = require("@giveth/commons-abc-contracts/build/contracts/CommonsToken.json");

export default class CommonsToken
{
  constructor(
    address
  ) {
    let web3 = Web3.getWeb3();

    assert(web3);
    assert(web3.isAddress(address));

    this.contract = web3.eth.Contract(
      abi, address, utils.getWeb3Options(web3)
    );
  }

  initialize(
    reserveToken,
    reserveRatio,
    theta,
    p0,
    initialRaise,
    fundingPool,
    friction,
    gasPrice
  ) {
    const method = this.contract.methods.initialize();

    return Web3.sendTransaction(
      method, {
        reserveToken,
        reserveRatio,
        theta,
        p0,
        initialRaise,
        fundingPool,
        friction,
        gasPrice
      }
    );
  }
}
