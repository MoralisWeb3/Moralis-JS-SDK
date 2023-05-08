import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/marketDataERC20Token/items
// type: marketDataERC20Token_Item
// properties:
// - rank ($ref: #/components/schemas/marketDataERC20Token/items/properties/rank)
// - token_name ($ref: #/components/schemas/marketDataERC20Token/items/properties/token_name)
// - token_symbol ($ref: #/components/schemas/marketDataERC20Token/items/properties/token_symbol)
// - token_logo ($ref: #/components/schemas/marketDataERC20Token/items/properties/token_logo)
// - token_decimals ($ref: #/components/schemas/marketDataERC20Token/items/properties/token_decimals)
// - contract_address ($ref: #/components/schemas/marketDataERC20Token/items/properties/contract_address)
// - price_usd ($ref: #/components/schemas/marketDataERC20Token/items/properties/price_usd)
// - price_24h_percent_change ($ref: #/components/schemas/marketDataERC20Token/items/properties/price_24h_percent_change)
// - price_7d_percent_change ($ref: #/components/schemas/marketDataERC20Token/items/properties/price_7d_percent_change)
// - market_cap_usd ($ref: #/components/schemas/marketDataERC20Token/items/properties/market_cap_usd)

export interface EvmMarketDataERC20TokenItemJSON {
  readonly rank: string;
  readonly token_name: string;
  readonly token_symbol: string;
  readonly token_logo: string;
  readonly token_decimals: string;
  readonly contract_address: EvmAddressJSON;
  readonly price_usd: string;
  readonly price_24h_percent_change: string;
  readonly price_7d_percent_change: string;
  readonly market_cap_usd: string;
}

export interface EvmMarketDataERC20TokenItemInput {
  readonly rank: string;
  readonly tokenName: string;
  readonly tokenSymbol: string;
  readonly tokenLogo: string;
  readonly tokenDecimals: string;
  readonly contractAddress: EvmAddressInput | EvmAddress;
  readonly priceUsd: string;
  readonly price24hPercentChange: string;
  readonly price7dPercentChange: string;
  readonly marketCapUsd: string;
}

export class EvmMarketDataERC20TokenItem {
  public static create(input: EvmMarketDataERC20TokenItemInput | EvmMarketDataERC20TokenItem): EvmMarketDataERC20TokenItem {
    if (input instanceof EvmMarketDataERC20TokenItem) {
      return input;
    }
    return new EvmMarketDataERC20TokenItem(input);
  }

  public static fromJSON(json: EvmMarketDataERC20TokenItemJSON): EvmMarketDataERC20TokenItem {
    const input: EvmMarketDataERC20TokenItemInput = {
      rank: json.rank,
      tokenName: json.token_name,
      tokenSymbol: json.token_symbol,
      tokenLogo: json.token_logo,
      tokenDecimals: json.token_decimals,
      contractAddress: EvmAddress.fromJSON(json.contract_address),
      priceUsd: json.price_usd,
      price24hPercentChange: json.price_24h_percent_change,
      price7dPercentChange: json.price_7d_percent_change,
      marketCapUsd: json.market_cap_usd,
    };
    return EvmMarketDataERC20TokenItem.create(input);
  }

  /**
   * @description The rank
   */
  public readonly rank: string;
  /**
   * @description The token name
   */
  public readonly tokenName: string;
  /**
   * @description The token symbol
   */
  public readonly tokenSymbol: string;
  /**
   * @description The token image
   */
  public readonly tokenLogo: string;
  /**
   * @description The token decimals
   */
  public readonly tokenDecimals: string;
  /**
   * @description The contract address
   */
  public readonly contractAddress: EvmAddress;
  /**
   * @description The price in USD
   */
  public readonly priceUsd: string;
  /**
   * @description The price change in the last 24h
   */
  public readonly price24hPercentChange: string;
  /**
   * @description The price change in the last 7d
   */
  public readonly price7dPercentChange: string;
  /**
   * @description The market cap in USD
   */
  public readonly marketCapUsd: string;

  private constructor(input: EvmMarketDataERC20TokenItemInput) {
    this.rank = input.rank;
    this.tokenName = input.tokenName;
    this.tokenSymbol = input.tokenSymbol;
    this.tokenLogo = input.tokenLogo;
    this.tokenDecimals = input.tokenDecimals;
    this.contractAddress = EvmAddress.create(input.contractAddress);
    this.priceUsd = input.priceUsd;
    this.price24hPercentChange = input.price24hPercentChange;
    this.price7dPercentChange = input.price7dPercentChange;
    this.marketCapUsd = input.marketCapUsd;
  }

  public toJSON(): EvmMarketDataERC20TokenItemJSON {
    return {
      rank: this.rank,
      token_name: this.tokenName,
      token_symbol: this.tokenSymbol,
      token_logo: this.tokenLogo,
      token_decimals: this.tokenDecimals,
      contract_address: this.contractAddress.toJSON(),
      price_usd: this.priceUsd,
      price_24h_percent_change: this.price24hPercentChange,
      price_7d_percent_change: this.price7dPercentChange,
      market_cap_usd: this.marketCapUsd,
    }
  }
}
