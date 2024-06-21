// $ref: #/components/schemas/TopProfitableWalletPerTokenResponse
// type: TopProfitableWalletPerTokenResponse
// properties:
// - avg_buy_price_usd ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/avg_buy_price_usd)
// - avg_cost_of_quantity_sold ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/avg_cost_of_quantity_sold)
// - avg_sell_price_usd ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/avg_sell_price_usd)
// - count_of_trades ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/count_of_trades)
// - realized_profit_percentage ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/realized_profit_percentage)
// - realized_profit_usd ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/realized_profit_usd)
// - total_profit_usd ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/total_profit_usd)
// - total_profit_percentage ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/total_profit_percentage)
// - total_soldUsd ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/total_soldUsd)
// - total_tokens_bought ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/total_tokens_bought)
// - total_tokens_sold ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/total_tokens_sold)
// - total_usd_invested ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/total_usd_invested)
// - unrealized_profit_percentage ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/unrealized_profit_percentage)
// - unrealized_profit_usd ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/unrealized_profit_usd)
// - wallet_address ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse/properties/wallet_address)

export interface EvmTopProfitableWalletPerTokenResponseJSON {
  readonly avg_buy_price_usd: string;
  readonly avg_cost_of_quantity_sold: string;
  readonly avg_sell_price_usd: string;
  readonly count_of_trades: number;
  readonly realized_profit_percentage: number;
  readonly realized_profit_usd: string;
  readonly total_profit_usd: string;
  readonly total_profit_percentage: string;
  readonly total_soldUsd: string;
  readonly total_tokens_bought: string;
  readonly total_tokens_sold: string;
  readonly total_usd_invested: string;
  readonly unrealized_profit_percentage: string;
  readonly unrealized_profit_usd: string;
  readonly wallet_address: string;
}

export interface EvmTopProfitableWalletPerTokenResponseInput {
  readonly avgBuyPriceUsd: string;
  readonly avgCostOfQuantitySold: string;
  readonly avgSellPriceUsd: string;
  readonly countOfTrades: number;
  readonly realizedProfitPercentage: number;
  readonly realizedProfitUsd: string;
  readonly totalProfitUsd: string;
  readonly totalProfitPercentage: string;
  readonly totalSoldUsd: string;
  readonly totalTokensBought: string;
  readonly totalTokensSold: string;
  readonly totalUsdInvested: string;
  readonly unrealizedProfitPercentage: string;
  readonly unrealizedProfitUsd: string;
  readonly walletAddress: string;
}

export class EvmTopProfitableWalletPerTokenResponse {
  public static create(input: EvmTopProfitableWalletPerTokenResponseInput | EvmTopProfitableWalletPerTokenResponse): EvmTopProfitableWalletPerTokenResponse {
    if (input instanceof EvmTopProfitableWalletPerTokenResponse) {
      return input;
    }
    return new EvmTopProfitableWalletPerTokenResponse(input);
  }

  public static fromJSON(json: EvmTopProfitableWalletPerTokenResponseJSON): EvmTopProfitableWalletPerTokenResponse {
    const input: EvmTopProfitableWalletPerTokenResponseInput = {
      avgBuyPriceUsd: json.avg_buy_price_usd,
      avgCostOfQuantitySold: json.avg_cost_of_quantity_sold,
      avgSellPriceUsd: json.avg_sell_price_usd,
      countOfTrades: json.count_of_trades,
      realizedProfitPercentage: json.realized_profit_percentage,
      realizedProfitUsd: json.realized_profit_usd,
      totalProfitUsd: json.total_profit_usd,
      totalProfitPercentage: json.total_profit_percentage,
      totalSoldUsd: json.total_soldUsd,
      totalTokensBought: json.total_tokens_bought,
      totalTokensSold: json.total_tokens_sold,
      totalUsdInvested: json.total_usd_invested,
      unrealizedProfitPercentage: json.unrealized_profit_percentage,
      unrealizedProfitUsd: json.unrealized_profit_usd,
      walletAddress: json.wallet_address,
    };
    return EvmTopProfitableWalletPerTokenResponse.create(input);
  }

  /**
   * @description Average buy price in USD.
   */
  public readonly avgBuyPriceUsd: string;
  /**
   * @description Average cost of quantity sold.
   */
  public readonly avgCostOfQuantitySold: string;
  /**
   * @description Average sell price in USD.
   */
  public readonly avgSellPriceUsd: string;
  /**
   * @description Total number of trades.
   */
  public readonly countOfTrades: number;
  /**
   * @description Realized profit as a percentage.
   */
  public readonly realizedProfitPercentage: number;
  /**
   * @description Realized profit in USD.
   */
  public readonly realizedProfitUsd: string;
  /**
   * @description Total profit in USD.
   */
  public readonly totalProfitUsd: string;
  /**
   * @description Total profit as a percentage.
   */
  public readonly totalProfitPercentage: string;
  /**
   * @description Total amount in USD for sold tokens.
   */
  public readonly totalSoldUsd: string;
  /**
   * @description Total number of tokens bought.
   */
  public readonly totalTokensBought: string;
  /**
   * @description Total number of tokens sold.
   */
  public readonly totalTokensSold: string;
  /**
   * @description Total amount of USD invested.
   */
  public readonly totalUsdInvested: string;
  /**
   * @description Unrealized profit as a percentage.
   */
  public readonly unrealizedProfitPercentage: string;
  /**
   * @description Unrealized profit in USD.
   */
  public readonly unrealizedProfitUsd: string;
  /**
   * @description The wallet address.
   */
  public readonly walletAddress: string;

  private constructor(input: EvmTopProfitableWalletPerTokenResponseInput) {
    this.avgBuyPriceUsd = input.avgBuyPriceUsd;
    this.avgCostOfQuantitySold = input.avgCostOfQuantitySold;
    this.avgSellPriceUsd = input.avgSellPriceUsd;
    this.countOfTrades = input.countOfTrades;
    this.realizedProfitPercentage = input.realizedProfitPercentage;
    this.realizedProfitUsd = input.realizedProfitUsd;
    this.totalProfitUsd = input.totalProfitUsd;
    this.totalProfitPercentage = input.totalProfitPercentage;
    this.totalSoldUsd = input.totalSoldUsd;
    this.totalTokensBought = input.totalTokensBought;
    this.totalTokensSold = input.totalTokensSold;
    this.totalUsdInvested = input.totalUsdInvested;
    this.unrealizedProfitPercentage = input.unrealizedProfitPercentage;
    this.unrealizedProfitUsd = input.unrealizedProfitUsd;
    this.walletAddress = input.walletAddress;
  }

  public toJSON(): EvmTopProfitableWalletPerTokenResponseJSON {
    return {
      avg_buy_price_usd: this.avgBuyPriceUsd,
      avg_cost_of_quantity_sold: this.avgCostOfQuantitySold,
      avg_sell_price_usd: this.avgSellPriceUsd,
      count_of_trades: this.countOfTrades,
      realized_profit_percentage: this.realizedProfitPercentage,
      realized_profit_usd: this.realizedProfitUsd,
      total_profit_usd: this.totalProfitUsd,
      total_profit_percentage: this.totalProfitPercentage,
      total_soldUsd: this.totalSoldUsd,
      total_tokens_bought: this.totalTokensBought,
      total_tokens_sold: this.totalTokensSold,
      total_usd_invested: this.totalUsdInvested,
      unrealized_profit_percentage: this.unrealizedProfitPercentage,
      unrealized_profit_usd: this.unrealizedProfitUsd,
      wallet_address: this.walletAddress,
    }
  }
}
