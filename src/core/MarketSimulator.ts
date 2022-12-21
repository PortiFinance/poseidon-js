import { Strategy } from './Strategy'
import { PortfolioManager } from './Portfolio'
import { BigNumber } from 'ethers'

export type PriceLog = {
  [timestamp: string]: BigNumber
}

export type MarketData = {
  [token: string]: PriceLog
}

// load in trading strategies
export class MarketSimulator {
  constructor(public marketData: MarketData, public portfolioManager: PortfolioManager) {}

  // set starting balanced for accounts
  public initialize(): void {}

  //
  public run(strategy: Strategy): void {
    strategy.evaluate()
  }
}
