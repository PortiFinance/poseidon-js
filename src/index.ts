import { MarketSimulator, Strategy } from '~/core'

export class BackTester {
  constructor(public marketSimulator: MarketSimulator, public strategy: Strategy) {
    this.marketSimulator = marketSimulator
    this.strategy = strategy
  }

  public run(): void {
    this.marketSimulator.initialize()

    this.marketSimulator.run(this.strategy)

    this.strategy.evaluate()
  }
}
