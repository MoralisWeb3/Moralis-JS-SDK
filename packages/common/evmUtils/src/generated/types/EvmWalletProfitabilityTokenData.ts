import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/WalletProfitabilityTokenData
// type: WalletProfitabilityTokenData
// properties:
// - token_address ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/token_address)
// - avg_buy_price_usd ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/avg_buy_price_usd)
// - avg_sell_price_usd ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/avg_sell_price_usd)
// - total_usd_invested ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/total_usd_invested)
// - total_tokens_sold ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/total_tokens_sold)
// - total_tokens_bought ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/total_tokens_bought)
// - total_sold_usd ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/total_sold_usd)
// - avg_cost_of_quantity_sold ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/avg_cost_of_quantity_sold)
// - count_of_trades ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/count_of_trades)
// - realized_profit_usd ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/realized_profit_usd)
// - realized_profit_percentage ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/realized_profit_percentage)
// - total_buys ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/total_buys)
// - total_sells ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/total_sells)
// - name ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/name)
// - symbol ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/symbol)
// - decimals ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/decimals)
// - logo ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/logo)
// - logo_hash ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/logo_hash)
// - thumbnail ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/thumbnail)
// - possible_spam ($ref: #/components/schemas/WalletProfitabilityTokenData/properties/possible_spam)

export interface EvmWalletProfitabilityTokenDataJSON {
  readonly token_address: EvmAddressJSON;
  readonly avg_buy_price_usd: string;
  readonly avg_sell_price_usd: string;
  readonly total_usd_invested: string;
  readonly total_tokens_sold: string;
  readonly total_tokens_bought: string;
  readonly total_sold_usd: string;
  readonly avg_cost_of_quantity_sold: string;
  readonly count_of_trades: number;
  readonly realized_profit_usd: string;
  readonly realized_profit_percentage: number;
  readonly total_buys: number;
  readonly total_sells: number;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: string;
  readonly logo: string;
  readonly logo_hash: string;
  readonly thumbnail: string;
  readonly possible_spam?: boolean;
}

export interface EvmWalletProfitabilityTokenDataInput {
  readonly tokenAddress: EvmAddressInput | EvmAddress;
  readonly avgBuyPriceUsd: string;
  readonly avgSellPriceUsd: string;
  readonly totalUsdInvested: string;
  readonly totalTokensSold: string;
  readonly totalTokensBought: string;
  readonly totalSoldUsd: string;
  readonly avgCostOfQuantitySold: string;
  readonly countOfTrades: number;
  readonly realizedProfitUsd: string;
  readonly realizedProfitPercentage: number;
  readonly totalBuys: number;
  readonly totalSells: number;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly logo: string;
  readonly logoHash: string;
  readonly thumbnail: string;
  readonly possibleSpam?: boolean;
}

export class EvmWalletProfitabilityTokenData {
  public static create(input: EvmWalletProfitabilityTokenDataInput | EvmWalletProfitabilityTokenData): EvmWalletProfitabilityTokenData {
    if (input instanceof EvmWalletProfitabilityTokenData) {
      return input;
    }
    return new EvmWalletProfitabilityTokenData(input);
  }

  public static fromJSON(json: EvmWalletProfitabilityTokenDataJSON): EvmWalletProfitabilityTokenData {
    const input: EvmWalletProfitabilityTokenDataInput = {
      tokenAddress: EvmAddress.fromJSON(json.token_address),
      avgBuyPriceUsd: json.avg_buy_price_usd,
      avgSellPriceUsd: json.avg_sell_price_usd,
      totalUsdInvested: json.total_usd_invested,
      totalTokensSold: json.total_tokens_sold,
      totalTokensBought: json.total_tokens_bought,
      totalSoldUsd: json.total_sold_usd,
      avgCostOfQuantitySold: json.avg_cost_of_quantity_sold,
      countOfTrades: json.count_of_trades,
      realizedProfitUsd: json.realized_profit_usd,
      realizedProfitPercentage: json.realized_profit_percentage,
      totalBuys: json.total_buys,
      totalSells: json.total_sells,
      name: json.name,
      symbol: json.symbol,
      decimals: Number(json.decimals),
      logo: json.logo,
      logoHash: json.logo_hash,
      thumbnail: json.thumbnail,
      possibleSpam: json.possible_spam,
    };
    return EvmWalletProfitabilityTokenData.create(input);
  }

  /**
   * @description The address of the traded token.
   */
  public readonly tokenAddress: EvmAddress;
  /**
   * @description Average buy price in USD.
   */
  public readonly avgBuyPriceUsd: string;
  /**
   * @description Average sell price in USD.
   */
  public readonly avgSellPriceUsd: string;
  /**
   * @description Total USD invested.
   */
  public readonly totalUsdInvested: string;
  /**
   * @description Total tokens sold.
   */
  public readonly totalTokensSold: string;
  /**
   * @description Total tokens bought.
   */
  public readonly totalTokensBought: string;
  /**
   * @description Total USD received from selling tokens.
   */
  public readonly totalSoldUsd: string;
  /**
   * @description Average cost of sold quantity.
   */
  public readonly avgCostOfQuantitySold: string;
  /**
   * @description Count of trades for the token.
   */
  public readonly countOfTrades: number;
  /**
   * @description Realized profit in USD for the token.
   */
  public readonly realizedProfitUsd: string;
  /**
   * @description Realized profit percentage for the token.
   */
  public readonly realizedProfitPercentage: number;
  /**
   * @description Total number of buys.
   */
  public readonly totalBuys: number;
  /**
   * @description Total number of sells.
   */
  public readonly totalSells: number;
  /**
   * @description Name of the token.
   */
  public readonly name: string;
  /**
   * @description Symbol of the token.
   */
  public readonly symbol: string;
  /**
   * @description Decimals of the token.
   */
  public readonly decimals: number;
  /**
   * @description Logo URL of the token.
   */
  public readonly logo: string;
  /**
   * @description Logo hash of the token.
   */
  public readonly logoHash: string;
  /**
   * @description Thumbnail image URL of the token.
   */
  public readonly thumbnail: string;
  /**
   * @description Indicates whether the token is possibly spam.
   */
  public readonly possibleSpam?: boolean;

  private constructor(input: EvmWalletProfitabilityTokenDataInput) {
    this.tokenAddress = EvmAddress.create(input.tokenAddress);
    this.avgBuyPriceUsd = input.avgBuyPriceUsd;
    this.avgSellPriceUsd = input.avgSellPriceUsd;
    this.totalUsdInvested = input.totalUsdInvested;
    this.totalTokensSold = input.totalTokensSold;
    this.totalTokensBought = input.totalTokensBought;
    this.totalSoldUsd = input.totalSoldUsd;
    this.avgCostOfQuantitySold = input.avgCostOfQuantitySold;
    this.countOfTrades = input.countOfTrades;
    this.realizedProfitUsd = input.realizedProfitUsd;
    this.realizedProfitPercentage = input.realizedProfitPercentage;
    this.totalBuys = input.totalBuys;
    this.totalSells = input.totalSells;
    this.name = input.name;
    this.symbol = input.symbol;
    this.decimals = input.decimals;
    this.logo = input.logo;
    this.logoHash = input.logoHash;
    this.thumbnail = input.thumbnail;
    this.possibleSpam = input.possibleSpam;
  }

  public toJSON(): EvmWalletProfitabilityTokenDataJSON {
    return {
      token_address: this.tokenAddress.toJSON(),
      avg_buy_price_usd: this.avgBuyPriceUsd,
      avg_sell_price_usd: this.avgSellPriceUsd,
      total_usd_invested: this.totalUsdInvested,
      total_tokens_sold: this.totalTokensSold,
      total_tokens_bought: this.totalTokensBought,
      total_sold_usd: this.totalSoldUsd,
      avg_cost_of_quantity_sold: this.avgCostOfQuantitySold,
      count_of_trades: this.countOfTrades,
      realized_profit_usd: this.realizedProfitUsd,
      realized_profit_percentage: this.realizedProfitPercentage,
      total_buys: this.totalBuys,
      total_sells: this.totalSells,
      name: this.name,
      symbol: this.symbol,
      decimals: String(this.decimals),
      logo: this.logo,
      logo_hash: this.logoHash,
      thumbnail: this.thumbnail,
      possible_spam: this.possibleSpam,
    }
  }
}
