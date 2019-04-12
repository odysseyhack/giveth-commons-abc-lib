var assert = require("assert");

export enum Phase {
  Hatch,
  Open
};

export default class AugBondCurve
{
  constructor(
    k = 6,
    // theta (funding pool allocation %)
    initialAllocation = 35,
    // d0 (DAI)
    initialRaise = 3e6,
    // P0 (DAI per token)
    initialPrice = 0.01
  ) {
    assert(theta <= 100 && theta >= 0);

    // Properties
    this.k = k;
    this.initialAllocation = initialAllocation;
    this.initialRaise = initialRaise;
    this.initialPrice = initialPrice;
    this.phase = Phase.Hatch;
  }

  // Views
  // r0 (DAI)
  get initialReserve() {
    return (1 - (this.initialAllocation / 100)) * this.initialRaise;
  }

  // s0 (Tokens)
  get initialSupply() {
    return this.initialRaise / this.initialPrice;
  }

  // v0
  get invarCoeff() {
    return (this.initialSupply ** this.k) / this.initialReserve;
  }

  // p1 (DAI)
  get postHatchPrice() {
    return (
      this.k * (this.initialReserve ** ((this.k - 1) / k))
    ) / (
      this.invarCoeff ** (1 / k)
    );
  }

  // TODO: price function

  // Tx Methods
  buy() {
    // TODO:
    // % (initialAllocation/100) into funding pool, rest in reserve pool
    // return tokens minted from reserve to the sender
    // TODO:
    // once hatch goal is met, transition into open phase (should phase be in the reserve pool?)
  }

  sell() {
    // TODO:
    // make sure tokens are unlocked & vested
    // sell tokens back to reserve pool
    // take % off of DAI returned and give to funding pool
    // 
  }
}

// Ideal Usage
/*
var market = new AugBondCurve();

// TODO: how does it transition from the hatch phase into the open phase
market.phase() -> Hatch | Open

// TODO: buying (different in each phase?) (what's returned?)
market.buy(...)

// TODO: sell (different in each phase?) (check for unvested tokens)
market.sell(...)

market.balance(0xUSER_ADDRESS) -> (vested, unvested)
market.sellPrice()
market.buyPrice()
market.supplyBalance()
market.reserveBalance()

// TODO: simulate the effects of a buy
market.simulateBuy(...amount...) -> (tokensBought, tokensValue, reserveAdded)

// TODO: simulate the effects of a sell
market.simulateSell(...amount...) -> (reserveDispensed)
*/

// Protocol Structure
/*
AugBondCurve
|
--TokenPool?
  |
  --FundingPool?
*/
