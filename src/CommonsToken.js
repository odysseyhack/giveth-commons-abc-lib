var assert = require("assert");
var utils = require("./utils");
var Web3 = require("./Web3");
var abi = require("@giveth/commons-abc-contracts/build/contracts/CommonsToken.json");

class CommonsToken
{
  constructor(
    address
  ) {
    const web3 = Web3.getWeb3();

    assert(web3);
    assert(web3.utils.isAddress(address));

    this.contract = web3.eth.Contract(
      abi.abi, address
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
          new CommonsToken(receipt.contractAddress)
        )
      ).on("error",
        err => reject(err)
      );
    });
  }

  reserveRatio(sender) {
    const method = this.contract.methods.reserveRatio();
    return Web3.callView(sender, method);
  }

  totalSupply(sender) {
    const method = this.contract.methods.totalSupply();
    return Web3.callView(sender, method);
  }

  isInHatchingPhase(sender) {
    const method = this.contract.methods.isInHatchingPhase();
    return Web3.callView(sender, method);
  }

  p0(sender) {
    const method = this.contract.methods.p0();
    return Web3.callView(sender, method);
  }

  theta(sender) {
    const method = this.contract.methods.theta();
    return Web3.callView(sender, method);
  }

  raised(sender) {
    const method = this.contract.methods.raised();
    return Web3.callView(sender, method);
  }

  initialRaise(sender) {
    const method = this.contract.methods.initialRaise();
    return Web3.callView(sender, method);
  }

  reserveToken(sender) {
    const method = this.contract.methods.reserveToken();
    return Web3.callView(sender, method);
  }

  fundingPool(sender) {
    const method = this.contract.methods.fundingPool();
    return Web3.callView(sender, method);
  }

  friction(sender) {
    const method = this.contract.methods.friction();
    return Web3.callView(sender, method);
  }

  gasPrice(sender) {
    const method = this.contract.methods.gasPrice();
    return Web3.callView(sender, method);
  }

  poolBalance(sender) {
    const method = this.contract.methods.poolBalance();
    return Web3.callView(sender, method);
  }

  calculateCurvedMintReturn(sender, amount) {
    const method = this.contract.methods.calculateCurvedMintReturn(amount);
    return Web3.callView(sender, method);
  }

  calculateCurvedBurnReturn(sender, amount) {
    const method = this.contract.methods.calculateCurvedBurnReturn(amount);
    return Web3.callView(sender, method);
  }

  allowance(sender, owner, spender) {
    const method = this.contract.methods.allowance(owner, spender);
    return Web3.callView(sender, method);
  }

  balanceOf(sender, owner) {
    const method = this.contract.methods.balanceOf(owner);
    return Web3.callView(sender, method);
  }

  /*mint(sender, amount) {
    const method = this.contract.methods.mint();

    return Web3.sendTransaction(
      method, {
        amount
      }
    );
  }*/
}

module.exports = {
  CommonsToken
};
