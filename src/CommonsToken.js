var assert = require("assert");
var utils = require("./utils");
var Web3 = require("./Web3");
var abi = require("@giveth/commons-abc-contracts/build/contracts/CommonsToken.json");

class CommonsToken
{
  constructor(
    sender,
    address
  ) {
    const web3 = Web3.getWeb3();

    assert(web3);
    assert(web3.utils.isAddress(address));

    this.contract = web3.eth.Contract(
      abi.abi, address, utils.getWeb3Options(sender)
    );
  }

  static deploy(
    sender,
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

    return new Promise((resolve, reject) => {
      return web3.eth.Contract(abi.abi).deploy({
        data: abi.bytecode,
        arguments: [
          reserveToken,
          reserveRatio,
          gasPrice,
          theta,
          p0,
          initialRaise,
          fundingPool,
          friction
        ]
      }).send(
        utils.getWeb3Options(sender)
      ).on("receipt",
        receipt => resolve(
          new CommonsToken(sender, receipt.contractAddress)
        )
      ).on("error",
        err => reject(err)
      );
    });
  }

  reserveRatio(sender) {
    const method = this.contract.methods.reserveRatio();
    console.log(method);
    return Web3.callView(sender, method);
  }

  mint(sender, amount) {
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
