// TODO:
// - web3 local provider
// - default account
// - contracts deployed
// - initLibrary (web3Provider, contractAddresses)
// - create CommonsToken class
var expect = require("chai").expect;
var ABC = require("../src");
var abi = require("@giveth/commons-abc-contracts/build/contracts/CommonsToken.json");

describe("CommonToken", () => {
  var address;

  before(async () => {
    ABC.initWeb3("http://localhost:8545");
    var networkId = await ABC.getWeb3().eth.net.getId();
    address = abi.networks[networkId].address;
  });

  it("constructor", () => {
    const contract = new ABC.CommonsToken(address);
    expect(contract).to.not.be.null;
  });
});
