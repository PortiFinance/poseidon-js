import { BigNumber } from 'ethers'

export type Portfolio = {
  [token: string]: BigNumber
}

export class PortfolioManager {
  constructor(public portfolios: { [alias: string]: Portfolio }) {}

  addPortfolio(alias: string, portfolio: Portfolio) {
    this.portfolios[alias] = portfolio
  }

  updateBalance(alias: string, t0: string, newBalance: BigNumber) {
    if (newBalance.lt(0)) throw `Invalid balance of ${newBalance} for ${t0}`
    this.portfolios[alias][t0] = newBalance
  }
}
