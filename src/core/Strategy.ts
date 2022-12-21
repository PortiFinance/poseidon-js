interface ITradePoint {
  timestamp: string
}

interface TradePointCryptoBasic extends ITradePoint {
  t0: string
  t1: string
  conversion_rate?: number
  t0_amount?: string
}

export class Strategy {
  constructor(public tradeHistory: TradePointCryptoBasic[]) {
    this.tradeHistory = tradeHistory
  }

  public evaluate(): void {
    //
  }
}
