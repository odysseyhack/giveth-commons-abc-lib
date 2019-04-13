// TODO:
// - web3 local provider
// - default account
// - contracts deployed
// - initLibrary (web3Provider, contractAddresses)
// - create CommonsToken class
var expect = require("chai").expect;
var ABC = require("../src");
var abi = require("@giveth/commons-abc-contracts/build/contracts/CommonsToken.json");

describe("CommonToken", function () {
  var address;
  var sender;

  this.timeout(5000);

  before(async () => {
    ABC.initWeb3("http://localhost:8545");
    const web3 = ABC.getWeb3();

    // set default account
    sender = web3.eth.accounts.privateKeyToAccount(
      "0xc1730478ee215da4b7bcdbfd5ed52a760970cbcf46e80b3b0091403f6a594816"
    );

    // get address of CommonToken
    var networkId = await web3.eth.net.getId();
    address = abi.networks[networkId].address;
  });

  it("constructor", () => {
    const contract = new ABC.CommonsToken(sender, address);
    expect(contract).to.not.be.null;
  });

  it("constructor(...)", async () => {
    const contract = await ABC.CommonsToken.deploy(
      sender,
      "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
      142857,
      15000000000,
      350000,
      1,
      300000,
      "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
      20000
    );
    expect(contract).to.not.be.null;
  });

  it("reserveRatio", async () => {
    const contract = new ABC.CommonsToken(sender, address);
    expect(await contract.reserveRatio(sender)).to.be.equal(142857);
  });
});

/// HIGH-PRI
/// VIEWS
// reserveRatio view (should be 142857)
// totalSupply view (should be how mahy tokens are minted)
// isInHatchingPhase view (should be true)
// p0 view (should be 1)

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

/// MISC
// approve(address spender, uint value) => (true/false)
// Approval event(sender, spender, value)
// transferFrom(address from, address to, uint value)
// Approval event(from, msg.sender, value)
