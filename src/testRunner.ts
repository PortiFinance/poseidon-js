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
  prev[i.toString()] = utils.parseEther((Math.random() * 9).toFixed(2));
  console.log(utils.formatEther(prev[i.toString()]));
  // { '0': 9.48, '1': 6.45, '2': 9.61, '3': 2.26, '4': 0.2 }
  return prev;
}, {});

const wethHistory: PriceLog = {
  "0": utils.parseEther("1219.23"),
  "1": utils.parseEther("1425.39"),
  "2": utils.parseEther("1639.14"),
  "3": utils.parseEther("900.91"),
  "4": utils.parseEther("2391.46"),
};

const marketData: MarketData = {
  USDC: usdcHistory,
  PORT: portHistory,
  WETH: wethHistory,
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
  {
    timestamp: "1",
    t0: "USDC",
    t1: "WETH",
    amount: utils.parseEther("90"),
  },
  {
    // support full balance
    timestamp: "2",
    t0: "PORT",
    t1: "WETH",
    amount: utils.parseEther("1"),
  },
  {
    timestamp: "4",
    t0: "WETH",
    t1: "USDC",
    amount: utils.parseEther("0.07"),
  },
];

const portfolioManager: PortfolioManager = new PortfolioManager({});
portfolioManager.addPortfolio("alice", {});
portfolioManager.updateBalance("alice", "USDC", utils.parseEther("100"));
portfolioManager.updateBalance("alice", "WETH", utils.parseEther("100"));
portfolioManager.addPortfolio("bob", {});
portfolioManager.updateBalance("bob", "USDC", utils.parseEther("100"));
portfolioManager.updateBalance("bob", "WETH", utils.parseEther("100"));

const marketSimulator: MarketSimulator = new MarketSimulator(
  marketData,
  portfolioManager
);

marketSimulator.initialize();

const strategy: Strategy = new Strategy(marketSimulator, strategy1TradeHistory);
strategy.evaluate("alice");
