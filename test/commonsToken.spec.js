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

  it("constructor(...)", () => {
    const contract = new ABC.CommonsToken(
      "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
      142857,
      15000000000,
      350000,
      1,
      300000,
      20000,
      15000000000
    );
    expect(contract).to.not.be.null;
  });

  it("mint", () => {

  });
});

// theta
// calculatePurchaseReturn
// increaseAllowance
// calculateSaleReturn
// version
// calculateCurvedBurnReturn
// balanceOf
// poolBalance
// calculateCurvedMintReturn
// friction
// decreaseAllowance
// transfer
// allowance
// initialRaise
// raised
// reserveToken
// fundingPool
// gasPrice
// CurvedMint
// CurvedBurn
// mint
// burn
// hatchContribute
// fundsAllocated
// claimTokens

/// HIGH-PRI
/// VIEWS
// reserveRatio view (should be 142857)
// totalSupply view (should be how mahy tokens are minted)
// isInHatchingPhase view (should be true)
// p0 view (should be 1)

/// MISC
// approve(address spender, uint value) => (true/false)
// Approval event(sender, spender, value)
// transferFrom(address from, address to, uint value)
// Approval event(from, msg.sender, value)
