import { BigNumber, utils } from "ethers";
import { MarketSimulator } from "./MarketSimulator";

interface ITradePoint {
  timestamp: string;
}

export interface TradePointCryptoBasic extends ITradePoint {
  t0: string; // from
  t1: string; // to
  conversion_rate?: number;
  amount: BigNumber; // swap amt
}

export class Strategy {
  constructor(
    public marketSimulator: MarketSimulator,
    public tradeHistory: TradePointCryptoBasic[]
  ) {}

  public evaluate(alias: string): void {
    const portfolioManager = this.marketSimulator.portfolioManager;
    const portfolioRef = portfolioManager.portfolios[alias];

    for (let trade of this.tradeHistory) {
      const t0Rate = this.marketSimulator.marketData[trade.t0][trade.timestamp];
      const t1Rate = this.marketSimulator.marketData[trade.t1][trade.timestamp];
      portfolioManager.updateBalance(
        alias,
        trade.t0,
        portfolioRef[trade.t0].sub(trade.amount)
      );
      const convertedAmt = t0Rate.mul(trade.amount).div(t1Rate);
      if (!portfolioRef[trade.t1]) portfolioRef[trade.t1] = BigNumber.from(0);
      portfolioManager.updateBalance(
        alias,
        trade.t1,
        portfolioRef[trade.t1].add(convertedAmt)
      );

      console.log(
        `$${trade.t0} -> $${trade.t1} @${trade.timestamp}\n-${utils.formatEther(
          trade.amount
        )} $${trade.t0}\n+${utils.formatEther(convertedAmt)} $${trade.t1}`
      );

      //let portfolioValue = BigNumber.from(0);
      //console.log(portfolio["USDC"].toString());
    }
  }
}
