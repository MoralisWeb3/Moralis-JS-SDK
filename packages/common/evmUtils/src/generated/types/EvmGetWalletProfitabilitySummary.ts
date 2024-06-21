// $ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/responses/200/content/application~1json/schema
// type: getWalletProfitabilitySummary
// properties:
// - total_count_of_trades ($ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/responses/200/content/application~1json/schema/properties/total_count_of_trades)
// - total_trade_volume ($ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/responses/200/content/application~1json/schema/properties/total_trade_volume)
// - total_realized_profit_usd ($ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/responses/200/content/application~1json/schema/properties/total_realized_profit_usd)
// - total_realized_profit_percentage ($ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/responses/200/content/application~1json/schema/properties/total_realized_profit_percentage)
// - total_buys ($ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/responses/200/content/application~1json/schema/properties/total_buys)
// - total_sells ($ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/responses/200/content/application~1json/schema/properties/total_sells)
// - total_sold_volume_usd ($ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/responses/200/content/application~1json/schema/properties/total_sold_volume_usd)
// - total_bought_volume_usd ($ref: #/paths/~1wallets~1{address}~1profitability~1summary/get/responses/200/content/application~1json/schema/properties/total_bought_volume_usd)

export interface EvmGetWalletProfitabilitySummaryJSON {
  readonly total_count_of_trades?: number;
  readonly total_trade_volume?: string;
  readonly total_realized_profit_usd?: string;
  readonly total_realized_profit_percentage?: number;
  readonly total_buys?: number;
  readonly total_sells?: number;
  readonly total_sold_volume_usd?: string;
  readonly total_bought_volume_usd?: string;
}

export interface EvmGetWalletProfitabilitySummaryInput {
  readonly totalCountOfTrades?: number;
  readonly totalTradeVolume?: string;
  readonly totalRealizedProfitUsd?: string;
  readonly totalRealizedProfitPercentage?: number;
  readonly totalBuys?: number;
  readonly totalSells?: number;
  readonly totalSoldVolumeUsd?: string;
  readonly totalBoughtVolumeUsd?: string;
}

export class EvmGetWalletProfitabilitySummary {
  public static create(input: EvmGetWalletProfitabilitySummaryInput | EvmGetWalletProfitabilitySummary): EvmGetWalletProfitabilitySummary {
    if (input instanceof EvmGetWalletProfitabilitySummary) {
      return input;
    }
    return new EvmGetWalletProfitabilitySummary(input);
  }

  public static fromJSON(json: EvmGetWalletProfitabilitySummaryJSON): EvmGetWalletProfitabilitySummary {
    const input: EvmGetWalletProfitabilitySummaryInput = {
      totalCountOfTrades: json.total_count_of_trades,
      totalTradeVolume: json.total_trade_volume,
      totalRealizedProfitUsd: json.total_realized_profit_usd,
      totalRealizedProfitPercentage: json.total_realized_profit_percentage,
      totalBuys: json.total_buys,
      totalSells: json.total_sells,
      totalSoldVolumeUsd: json.total_sold_volume_usd,
      totalBoughtVolumeUsd: json.total_bought_volume_usd,
    };
    return EvmGetWalletProfitabilitySummary.create(input);
  }

  /**
   * @description Total count of trades executed by the wallet.
   */
  public readonly totalCountOfTrades?: number;
  /**
   * @description Total trade volume managed by the wallet.
   */
  public readonly totalTradeVolume?: string;
  /**
   * @description Total realized profit in USD for the wallet.
   */
  public readonly totalRealizedProfitUsd?: string;
  /**
   * @description Total realized profit as a percentage.
   */
  public readonly totalRealizedProfitPercentage?: number;
  /**
   * @description Total number of buy transactions.
   */
  public readonly totalBuys?: number;
  /**
   * @description Total number of sell transactions.
   */
  public readonly totalSells?: number;
  /**
   * @description Total USD volume of tokens sold by the wallet.
   */
  public readonly totalSoldVolumeUsd?: string;
  /**
   * @description Total USD volume of tokens bought by the wallet.
   */
  public readonly totalBoughtVolumeUsd?: string;

  private constructor(input: EvmGetWalletProfitabilitySummaryInput) {
    this.totalCountOfTrades = input.totalCountOfTrades;
    this.totalTradeVolume = input.totalTradeVolume;
    this.totalRealizedProfitUsd = input.totalRealizedProfitUsd;
    this.totalRealizedProfitPercentage = input.totalRealizedProfitPercentage;
    this.totalBuys = input.totalBuys;
    this.totalSells = input.totalSells;
    this.totalSoldVolumeUsd = input.totalSoldVolumeUsd;
    this.totalBoughtVolumeUsd = input.totalBoughtVolumeUsd;
  }

  public toJSON(): EvmGetWalletProfitabilitySummaryJSON {
    return {
      total_count_of_trades: this.totalCountOfTrades,
      total_trade_volume: this.totalTradeVolume,
      total_realized_profit_usd: this.totalRealizedProfitUsd,
      total_realized_profit_percentage: this.totalRealizedProfitPercentage,
      total_buys: this.totalBuys,
      total_sells: this.totalSells,
      total_sold_volume_usd: this.totalSoldVolumeUsd,
      total_bought_volume_usd: this.totalBoughtVolumeUsd,
    }
  }
}
