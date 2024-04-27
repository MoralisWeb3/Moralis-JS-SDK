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
// - market_cap_24hr_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/market_cap_24hr_change)
// - market_cap_24hr_percent_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/market_cap_24hr_percent_change)
// - total_volume ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/total_volume)
// - usd_price ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price)
// - usd_price_24hr_high ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_24hr_high)
// - usd_price_24hr_low ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_24hr_low)
// - usd_price_24hr_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_24hr_change)
// - usd_price_24hr_percent_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_24hr_percent_change)
// - usd_price_ath ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_ath)
// - ath_percent_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/ath_percent_change)
// - ath_date ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/ath_date)
// - usd_price_1hr_percent_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_1hr_percent_change)
// - usd_price_7d_percent_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_7d_percent_change)
// - usd_price_30d_percent_change ($ref: #/components/schemas/marketDataTopCryptoCurrenciesByMarketCap/items/properties/usd_price_30d_percent_change)

export interface EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON {
  readonly symbol: string;
  readonly name: string;
  readonly logo: string;
  readonly circulating_supply: string;
  readonly total_supply: string;
  readonly max_supply: string;
  readonly market_cap_usd: string;
  readonly market_cap_rank: string;
  readonly market_cap_24hr_change: string;
  readonly market_cap_24hr_percent_change: string;
  readonly total_volume: string;
  readonly usd_price?: string;
  readonly usd_price_24hr_high: string;
  readonly usd_price_24hr_low: string;
  readonly usd_price_24hr_change: string;
  readonly usd_price_24hr_percent_change: string;
  readonly usd_price_ath: string;
  readonly ath_percent_change: string;
  readonly ath_date: string;
  readonly usd_price_1hr_percent_change?: string;
  readonly usd_price_7d_percent_change?: string;
  readonly usd_price_30d_percent_change?: string;
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
  readonly marketCap24hrChange: string;
  readonly marketCap24hrPercentChange: string;
  readonly totalVolume: string;
  readonly usdPrice?: string;
  readonly usdPrice24hrHigh: string;
  readonly usdPrice24hrLow: string;
  readonly usdPrice24hrChange: string;
  readonly usdPrice24hrPercentChange: string;
  readonly usdPriceAth: string;
  readonly athPercentChange: string;
  readonly athDate: string;
  readonly usdPrice1hrPercentChange?: string;
  readonly usdPrice7dPercentChange?: string;
  readonly usdPrice30dPercentChange?: string;
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
      marketCap24hrChange: json.market_cap_24hr_change,
      marketCap24hrPercentChange: json.market_cap_24hr_percent_change,
      totalVolume: json.total_volume,
      usdPrice: json.usd_price,
      usdPrice24hrHigh: json.usd_price_24hr_high,
      usdPrice24hrLow: json.usd_price_24hr_low,
      usdPrice24hrChange: json.usd_price_24hr_change,
      usdPrice24hrPercentChange: json.usd_price_24hr_percent_change,
      usdPriceAth: json.usd_price_ath,
      athPercentChange: json.ath_percent_change,
      athDate: json.ath_date,
      usdPrice1hrPercentChange: json.usd_price_1hr_percent_change,
      usdPrice7dPercentChange: json.usd_price_7d_percent_change,
      usdPrice30dPercentChange: json.usd_price_30d_percent_change,
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
  public readonly marketCap24hrChange: string;
  /**
   * @description The market cap 24h percent change
   */
  public readonly marketCap24hrPercentChange: string;
  /**
   * @description The total volume
   */
  public readonly totalVolume: string;
  /**
   * @description The price in USD
   */
  public readonly usdPrice?: string;
  /**
   * @description The price 24h high
   */
  public readonly usdPrice24hrHigh: string;
  /**
   * @description The price 24h low
   */
  public readonly usdPrice24hrLow: string;
  /**
   * @description The price 24h change
   */
  public readonly usdPrice24hrChange: string;
  /**
   * @description The price 24h percent change
   */
  public readonly usdPrice24hrPercentChange: string;
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
  /**
   * @description The price 1h percent change
   */
  public readonly usdPrice1hrPercentChange?: string;
  /**
   * @description The price 7d percent change
   */
  public readonly usdPrice7dPercentChange?: string;
  /**
   * @description The price 30d percent change
   */
  public readonly usdPrice30dPercentChange?: string;

  private constructor(input: EvmMarketDataTopCryptoCurrenciesByMarketCapItemInput) {
    this.symbol = input.symbol;
    this.name = input.name;
    this.logo = input.logo;
    this.circulatingSupply = input.circulatingSupply;
    this.totalSupply = input.totalSupply;
    this.maxSupply = input.maxSupply;
    this.marketCapUsd = input.marketCapUsd;
    this.marketCapRank = input.marketCapRank;
    this.marketCap24hrChange = input.marketCap24hrChange;
    this.marketCap24hrPercentChange = input.marketCap24hrPercentChange;
    this.totalVolume = input.totalVolume;
    this.usdPrice = input.usdPrice;
    this.usdPrice24hrHigh = input.usdPrice24hrHigh;
    this.usdPrice24hrLow = input.usdPrice24hrLow;
    this.usdPrice24hrChange = input.usdPrice24hrChange;
    this.usdPrice24hrPercentChange = input.usdPrice24hrPercentChange;
    this.usdPriceAth = input.usdPriceAth;
    this.athPercentChange = input.athPercentChange;
    this.athDate = input.athDate;
    this.usdPrice1hrPercentChange = input.usdPrice1hrPercentChange;
    this.usdPrice7dPercentChange = input.usdPrice7dPercentChange;
    this.usdPrice30dPercentChange = input.usdPrice30dPercentChange;
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
      market_cap_24hr_change: this.marketCap24hrChange,
      market_cap_24hr_percent_change: this.marketCap24hrPercentChange,
      total_volume: this.totalVolume,
      usd_price: this.usdPrice,
      usd_price_24hr_high: this.usdPrice24hrHigh,
      usd_price_24hr_low: this.usdPrice24hrLow,
      usd_price_24hr_change: this.usdPrice24hrChange,
      usd_price_24hr_percent_change: this.usdPrice24hrPercentChange,
      usd_price_ath: this.usdPriceAth,
      ath_percent_change: this.athPercentChange,
      ath_date: this.athDate,
      usd_price_1hr_percent_change: this.usdPrice1hrPercentChange,
      usd_price_7d_percent_change: this.usdPrice7dPercentChange,
      usd_price_30d_percent_change: this.usdPrice30dPercentChange,
    }
  }
}
