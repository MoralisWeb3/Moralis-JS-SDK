// $ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items
// type: marketDataTopCryptoCurrenciesByMarketCap_Item
// properties:
// - symbol ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/symbol)
// - name ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/name)
// - logo ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/logo)
// - circulating_supply ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/circulating_supply)
// - total_supply ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/total_supply)
// - max_supply ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/max_supply)
// - market_cap_usd ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/market_cap_usd)
// - market_cap_rank ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/market_cap_rank)
// - market_cap_24h_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/market_cap_24h_change)
// - market_cap_24h_percent_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/market_cap_24h_percent_change)
// - total_volume ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/total_volume)
// - price_usd ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/price_usd)
// - usd_price_24h_high ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_24h_high)
// - usd_price_24h_low ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_24h_low)
// - usd_price_24h_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_24h_change)
// - usd_price_24h_percent_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_24h_percent_change)
// - usd_price_ath ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_ath)
// - ath_percent_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/ath_percent_change)
// - ath_date ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/ath_date)

export interface EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON {
  readonly symbol: string;
  readonly name: string;
  readonly logo: string;
  readonly circulating_supply: string;
  readonly total_supply: string;
  readonly max_supply: string;
  readonly market_cap_usd: string;
  readonly market_cap_rank: string;
  readonly market_cap_24h_change: string;
  readonly market_cap_24h_percent_change: string;
  readonly total_volume: string;
  readonly price_usd: string;
  readonly usd_price_24h_high: string;
  readonly usd_price_24h_low: string;
  readonly usd_price_24h_change: string;
  readonly usd_price_24h_percent_change: string;
  readonly usd_price_ath: string;
  readonly ath_percent_change: string;
  readonly ath_date: string;
}

export interface EvmMarketDataTopCryptoCurrenciesByMarketCapItemInput {
  readonly symbol: string;
  readonly name: string;
  readonly logo: string;
  readonly circulatingSupply: string;
  readonly totalSupply: string;
  readonly maxSupply: string;
  readonly marketCapUsd: string;
  readonly marketCapRank: string;
  readonly marketCap24hChange: string;
  readonly marketCap24hPercentChange: string;
  readonly totalVolume: string;
  readonly priceUsd: string;
  readonly usdPrice24hHigh: string;
  readonly usdPrice24hLow: string;
  readonly usdPrice24hChange: string;
  readonly usdPrice24hPercentChange: string;
  readonly usdPriceAth: string;
  readonly athPercentChange: string;
  readonly athDate: string;
}

export class EvmMarketDataTopCryptoCurrenciesByMarketCapItem {
  public static create(input: EvmMarketDataTopCryptoCurrenciesByMarketCapItemInput | EvmMarketDataTopCryptoCurrenciesByMarketCapItem): EvmMarketDataTopCryptoCurrenciesByMarketCapItem {
    if (input instanceof EvmMarketDataTopCryptoCurrenciesByMarketCapItem) {
      return input;
    }
    return new EvmMarketDataTopCryptoCurrenciesByMarketCapItem(input);
  }

  public static fromJSON(json: EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON): EvmMarketDataTopCryptoCurrenciesByMarketCapItem {
    const input: EvmMarketDataTopCryptoCurrenciesByMarketCapItemInput = {
      symbol: json.symbol,
      name: json.name,
      logo: json.logo,
      circulatingSupply: json.circulating_supply,
      totalSupply: json.total_supply,
      maxSupply: json.max_supply,
      marketCapUsd: json.market_cap_usd,
      marketCapRank: json.market_cap_rank,
      marketCap24hChange: json.market_cap_24h_change,
      marketCap24hPercentChange: json.market_cap_24h_percent_change,
      totalVolume: json.total_volume,
      priceUsd: json.price_usd,
      usdPrice24hHigh: json.usd_price_24h_high,
      usdPrice24hLow: json.usd_price_24h_low,
      usdPrice24hChange: json.usd_price_24h_change,
      usdPrice24hPercentChange: json.usd_price_24h_percent_change,
      usdPriceAth: json.usd_price_ath,
      athPercentChange: json.ath_percent_change,
      athDate: json.ath_date,
    };
    return EvmMarketDataTopCryptoCurrenciesByMarketCapItem.create(input);
  }

  /**
   * @description The symbol of the token
   */
  public readonly symbol: string;
  /**
   * @description The name of the token
   */
  public readonly name: string;
  /**
   * @description The logo of the token
   */
  public readonly logo: string;
  /**
   * @description The circulating supply
   */
  public readonly circulatingSupply: string;
  /**
   * @description The total supply
   */
  public readonly totalSupply: string;
  /**
   * @description The max supply
   */
  public readonly maxSupply: string;
  /**
   * @description The market cap in USD
   */
  public readonly marketCapUsd: string;
  /**
   * @description The market cap rank
   */
  public readonly marketCapRank: string;
  /**
   * @description The market cap 24h change
   */
  public readonly marketCap24hChange: string;
  /**
   * @description The market cap 24h percent change
   */
  public readonly marketCap24hPercentChange: string;
  /**
   * @description The total volume
   */
  public readonly totalVolume: string;
  /**
   * @description The price in USD
   */
  public readonly priceUsd: string;
  /**
   * @description The price 24h high
   */
  public readonly usdPrice24hHigh: string;
  /**
   * @description The price 24h low
   */
  public readonly usdPrice24hLow: string;
  /**
   * @description The price 24h change
   */
  public readonly usdPrice24hChange: string;
  /**
   * @description The price 24h percent change
   */
  public readonly usdPrice24hPercentChange: string;
  /**
   * @description The price ath
   */
  public readonly usdPriceAth: string;
  /**
   * @description The ath percent change
   */
  public readonly athPercentChange: string;
  /**
   * @description The ath date
   */
  public readonly athDate: string;

  private constructor(input: EvmMarketDataTopCryptoCurrenciesByMarketCapItemInput) {
    this.symbol = input.symbol;
    this.name = input.name;
    this.logo = input.logo;
    this.circulatingSupply = input.circulatingSupply;
    this.totalSupply = input.totalSupply;
    this.maxSupply = input.maxSupply;
    this.marketCapUsd = input.marketCapUsd;
    this.marketCapRank = input.marketCapRank;
    this.marketCap24hChange = input.marketCap24hChange;
    this.marketCap24hPercentChange = input.marketCap24hPercentChange;
    this.totalVolume = input.totalVolume;
    this.priceUsd = input.priceUsd;
    this.usdPrice24hHigh = input.usdPrice24hHigh;
    this.usdPrice24hLow = input.usdPrice24hLow;
    this.usdPrice24hChange = input.usdPrice24hChange;
    this.usdPrice24hPercentChange = input.usdPrice24hPercentChange;
    this.usdPriceAth = input.usdPriceAth;
    this.athPercentChange = input.athPercentChange;
    this.athDate = input.athDate;
  }

  public toJSON(): EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON {
    return {
      symbol: this.symbol,
      name: this.name,
      logo: this.logo,
      circulating_supply: this.circulatingSupply,
      total_supply: this.totalSupply,
      max_supply: this.maxSupply,
      market_cap_usd: this.marketCapUsd,
      market_cap_rank: this.marketCapRank,
      market_cap_24h_change: this.marketCap24hChange,
      market_cap_24h_percent_change: this.marketCap24hPercentChange,
      total_volume: this.totalVolume,
      price_usd: this.priceUsd,
      usd_price_24h_high: this.usdPrice24hHigh,
      usd_price_24h_low: this.usdPrice24hLow,
      usd_price_24h_change: this.usdPrice24hChange,
      usd_price_24h_percent_change: this.usdPrice24hPercentChange,
      usd_price_ath: this.usdPriceAth,
      ath_percent_change: this.athPercentChange,
      ath_date: this.athDate,
    }
  }
}
