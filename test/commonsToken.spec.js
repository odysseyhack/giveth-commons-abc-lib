// TODO:
// - web3 local provider
// - default account
// - contracts deployed
// - initLibrary (web3Provider, contractAddresses)
// - create CommonsToken class
var expect = require("chai").expect;
var ABC = require("../src");

describe("CommonToken Tests", () => {
  before(() => {
    ABC.initWeb3("http://localhost:8545");
  });

  it("does a thing", () => {
    const contract = new ABC.CommonsToken("0xaddress...");


  });
});
