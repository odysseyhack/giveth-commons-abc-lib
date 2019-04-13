var assert = require("assert");
var utils = require("./utils");
var Web3 = require("./Web3");
var abi = require("@giveth/commons-abc-contracts/build/contracts/CommonsToken.json");

class CommonsToken
{
  constructor(
    address
  ) {
    let web3 = Web3.getWeb3();

    assert(web3);
    assert(web3.utils.isAddress(address));

    this.contract = web3.eth.Contract(
      abi.abi, address, utils.getWeb3Options(web3)
    );
  }

  mint(amount) {
    const method = this.contract.methods.mint();

    return Web3.sendTransaction(
      method, {
        amount
      }
    );
  }
}

module.exports = {
  CommonsToken
};
