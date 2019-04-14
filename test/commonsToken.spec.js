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
      20000,
      500,
      2
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

  it("isHatched should be false by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect(await contract.isHatched(sender)).to.be.equal(false);
  });

  it("p0 should be 1 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.p0(sender)).toNumber()).to.be.equal(1);
  });

  it("theta should be 350000 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.theta(sender)).toNumber()).to.be.equal(350000);
  });

  it("raisedExternal should be 0 by default", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.raisedExternal(sender)).toNumber()).to.be.equal(0);
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

  it("calculateCurvedMintReturn should return a value", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.calculateCurvedMintReturn(sender, 123)).toNumber()).to.be.above(0);
  });

  it("calculateCurvedBurnReturn should return a value", async () => {
    const contract = new ABC.CommonsToken(address);
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

  it("balanceOf should be 0 for non-holder", async () => {
    const contract = new ABC.CommonsToken(address);
    expect((await contract.balanceOf(
      sender, "0x9cc1178903036bfb0115a0fe584e910f07e60ad8"
    )).toNumber()).to.be.equal(0);
  });

  it("mint should fail if not hatched", async () => {
    const contract = new ABC.CommonsToken(address);
    try {
      await contract.mint(sender, 234234234234234);
      expect(false).to.be.equal(true);
    } catch { }
  });

  it("burn should fail if not hatched", async () => {
    const contract = new ABC.CommonsToken(address);
    try {
      await contract.burn(sender, 234234234234);
      expect(false).to.be.equal(true);
    } catch { }
  });

  it("hatchContribute fails when contribution is too low", async () => {
    const contract = new ABC.CommonsToken(address);
    try {
      await contract.hatchContribute(sender, 20000);
      expect(false).to.be.equal(true);
    } catch { }
  });
});
