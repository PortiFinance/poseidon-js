import { utils } from "ethers";
import {
  MarketData,
  MarketSimulator,
  PriceLog,
  PortfolioManager,
  TradePointCryptoBasic,
  Strategy,
} from "./core";

const usdcHistory: PriceLog = [0, 0, 0, 0, 0].reduce((prev: any, _, i) => {
  prev[i.toString()] = utils.parseEther("1");
  return prev;
}, {});

const portHistory: PriceLog = [0, 0, 0, 0, 0].reduce((prev: any, _, i) => {
  prev[i.toString()] = utils.parseEther((Math.random() * 10).toFixed(2));
  console.log(utils.formatEther(prev[i.toString()]));
  // { '0': 9.48, '1': 6.45, '2': 9.61, '3': 2.26, '4': 0.2 }
  return prev;
}, {});

const marketData: MarketData = {
  USDC: usdcHistory,
  PORT: portHistory,
};

const strategy1TradeHistory: TradePointCryptoBasic[] = [
  {
    timestamp: "0",
    t0: "USDC",
    t1: "PORT",
    amount: utils.parseEther("10"),
  },
  {
    timestamp: "1",
    t0: "PORT",
    t1: "USDC",
    amount: utils.parseEther("1"),
  },
];

const portfolioManager: PortfolioManager = new PortfolioManager({});
portfolioManager.addPortfolio("alice", {});
portfolioManager.updateBalance("alice", "USDC", utils.parseEther("100"));
portfolioManager.addPortfolio("bob", {});
portfolioManager.updateBalance("bob", "USDC", utils.parseEther("100"));

const marketSimulator: MarketSimulator = new MarketSimulator(
  marketData,
  portfolioManager
);

marketSimulator.initialize();

const strategy: Strategy = new Strategy(marketSimulator, strategy1TradeHistory);
strategy.evaluate("alice");
