var assert = require("assert");
var utils = require("./utils");
var getWeb3 = require("./Web3").getWeb3;
var abi = require("@giveth/commons-abc-contracts/build/contracts/CommonsToken.json");

export default class CommonsToken
{
  constructor(
    address
  ) {
    let web3 = getWeb3();

    assert(web3);
    assert(web3.isAddress(address));

    this.contract = web3.eth.Contract(
      abi, address, utils.getWeb3Options(web3)
    );
  }

  // TODO: view, transaction (w/ event & return value)
}
