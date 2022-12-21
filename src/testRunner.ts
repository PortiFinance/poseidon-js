import { BigNumber } from 'ethers'
import { MarketData, MarketSimulator, PriceLog, PortfolioManager } from './core'

const usdcHistory: PriceLog = [0, 0, 0, 0, 0].reduce((prev: any, _, i) => (prev[i] = 1), {})

console.log(usdcHistory)
const portHistory: PriceLog = {}

const marketData: MarketData = {
  USDC: usdcHistory,
  PORT: portHistory,
}

const portfolioManager: PortfolioManager = new PortfolioManager({})
portfolioManager.addPortfolio('Alice', {})
portfolioManager.updateBalance('Alice', 'USDC', BigNumber.from(100))
portfolioManager.addPortfolio('Bob', {})
portfolioManager.updateBalance('Bob', 'USDC', BigNumber.from(100))

const marketSimulator: MarketSimulator = new MarketSimulator(marketData, portfolioManager)

marketSimulator.initialize()
