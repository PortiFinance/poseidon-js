import { Strategy } from "./Strategy";
import { PortfolioManager } from "./Portfolio";
import { BigNumber } from "ethers";

export type PriceLog = {
  [timestamp: string]: BigNumber;
};

export type MarketData = {
  [token: string]: PriceLog;
};

// load in trading strategies
export class MarketSimulator {
  constructor(
    public marketData: MarketData,
    public portfolioManager: PortfolioManager
  ) {}

  public initialize(): void {}

  //
  public run(alias: string, strategy: Strategy): void {
    strategy.evaluate(alias);
  }
}
