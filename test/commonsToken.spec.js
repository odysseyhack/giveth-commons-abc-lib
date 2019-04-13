const expect = require("chai").expect;
const ABC = require("../src");
const abi = require("@giveth/commons-abc-contracts/build/contracts/CommonsToken.json");

describe("CommonToken", function () {
  var networkId;
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
    networkId = await web3.eth.net.getId();
    address = abi.networks[networkId].address;
  });

  it("constructor", () => {
    const contract = new ABC.CommonsToken(address);
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

  it("reserveRatio should be 142857 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect(await contract.reserveRatio(sender)).to.be.equal(142857);
  });

  it("totalSupply should be 0 when nothing is minted", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.totalSupply(sender)).toNumber()).to.be.equal(0);
  });

  // TODO: mint tokens then make sure totalSupply is updated properly

  it("isInHatchingPhase should be true by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect(await contract.isInHatchingPhase(sender)).to.be.equal(true);
  });

  // TODO: make sure isInHatchingPhase is false when we purchase all of the hatch tokens

  it("p0 should be 1 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.p0(sender)).toNumber()).to.be.equal(1);
  });

  it("theta should be 350000 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.theta(sender)).toNumber()).to.be.equal(350000);
  });

  it("raised should be 0 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.raised(sender)).toNumber()).to.be.equal(0);
  });

  it("initialRaise should be 300000 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.initialRaise(sender)).toNumber()).to.be.equal(300000);
  });

  it("reserveToken should be the address of the token by default", async () => {
    const abi = require("@giveth/commons-abc-contracts/build/contracts/ERC20Mintable.json");
    const reserveTokenAddr = abi.networks[networkId].address;
    const contract = new ABC.CommonsToken(address);
    expect(await contract.reserveToken(sender)).to.be.equal(reserveTokenAddr);
  });

  it("fundingPool should be the address of the contract by default", async () => {
    const abi = require("@giveth/commons-abc-contracts/build/contracts/FundingPoolMock.json");
    const fundingPoolAddr = abi.networks[networkId].address;
    const contract = new ABC.CommonsToken(address);
    expect(await contract.fundingPool(sender)).to.be.equal(fundingPoolAddr);
  });

  it("friction should be 20000 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.friction(sender)).toNumber()).to.be.equal(20000);
  });

  it("gassPrice should be 15000000000 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.gasPrice(sender)).toNumber()).to.be.equal(15000000000);
  });

  it("poolBalance should be 0 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.poolBalance(sender)).toNumber()).to.be.equal(0);
  });

  // TODO: make sure poolBalance updates after buying

  it("calculateCurvedMintReturn should return a value", async () => {
    const contract = new ABC.CommonsToken(address);
    // TODO: throws because supply not greater than 0
    expect((await contract.calculateCurvedMintReturn(sender, 123)).toNumber()).to.be.above(0);
  });

  it("calculateCurvedBurnReturn should return a value", async () => {
    const contract = new ABC.CommonsToken(address);
    // TODO: throws because supply not greater than 0
    expect((await contract.calculateCurvedBurnReturn(sender, 123)).toNumber()).to.be.above(0);
  });

  it("allowance should be 0 if non given", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.allowance(
      sender,
      "0x9cc1178903036bfb0115a0fe584e910f07e60ad8",
      "0x6a287e50838fb82cb9294438665fb806781c8d25"
    )).toNumber()).to.be.equal(0);
  });

  // TODO: give allowance to someone

  it("balanceOf should be 0 for non-holder", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.balanceOf(
      sender, "0x9cc1178903036bfb0115a0fe584e910f07e60ad8"
    )).toNumber()).to.be.equal(0);
  });

  // TODO: check balance of non-holder
});

/// HIGH-PRI
/// VIEWS

// fundsAllocated
// increaseAllowance
// decreaseAllowance
// transfer
// CurvedMint
// CurvedBurn
// mint
// burn
// hatchContribute
// claimTokens

/// MISC
// approve(address spender, uint value) => (true/false)
// Approval event(sender, spender, value)
// transferFrom(address from, address to, uint value)
// Approval event(from, msg.sender, value)
