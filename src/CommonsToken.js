var assert = require("assert");
var utils = require("./utils");
var Web3 = require("./Web3");
var abi = require("@giveth/commons-abc-contracts/build/contracts/CommonsToken.json");

class CommonsToken
{
  constructor(contract) {
    this.contract = contract;
  }

  static fromAddress(
    address
  ) {
    const web3 = Web3.getWeb3();

    assert(web3);
    assert(web3.utils.isAddress(address));

    const contract = web3.eth.Contract(
      abi.abi, address, utils.getWeb3Options(web3)
    );

    return new CommonsToken(contract);
  }

  static fromParams(
    reserveToken,
    reserveRatio,
    gasPrice,
    theta,
    p0,
    initialRaise,
    fundingPool,
    friction
  ) {
    const web3 = Web3.getWeb3();
    const toDeploy = web3.eth.contract(abi.abi);

    const contract = toDeploy.new(
      reserveToken,
      reserveRatio,
      gasPrice,
      theta,
      p0,
      initialRaise,
      fundingPool,
      friction, {
        from: web3.defaultAccount,
        data: abi.bytecode
      }
    );

    return new CommonsToken(contract);
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
