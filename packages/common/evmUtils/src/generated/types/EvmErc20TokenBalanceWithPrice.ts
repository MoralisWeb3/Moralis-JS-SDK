import { EvmAddress, EvmAddressInput, EvmAddressJSON, EvmNative, EvmNativeInput, EvmNativeJSON } from '../../dataTypes';

// $ref: #/components/schemas/erc20TokenBalanceWithPrice
// type: erc20TokenBalanceWithPrice
// properties:
// - token_address ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/token_address)
// - name ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/name)
// - symbol ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/symbol)
// - logo ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/logo)
// - thumbnail ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/thumbnail)
// - decimals ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/decimals)
// - balance ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/balance)
// - possible_spam ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/possible_spam)
// - verified_contract ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/verified_contract)
// - usd_price ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/usd_price)
// - usd_price_24hr_percent_change ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/usd_price_24hr_percent_change)
// - usd_price_24hr_usd_change ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/usd_price_24hr_usd_change)
// - usd_value_24hr_usd_change ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/usd_value_24hr_usd_change)
// - usd_value ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/usd_value)
// - portfolio_percentage ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/portfolio_percentage)
// - balance_formatted ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/balance_formatted)
// - native_token ($ref: #/components/schemas/erc20TokenBalanceWithPrice/properties/native_token)

export interface EvmErc20TokenBalanceWithPriceJSON {
  readonly token_address?: EvmAddressJSON;
  readonly name: string;
  readonly symbol: string;
  readonly logo?: string;
  readonly thumbnail?: string;
  readonly decimals: number;
  readonly balance: EvmNativeJSON;
  readonly possible_spam: boolean;
  readonly verified_contract?: boolean;
  readonly usd_price: string;
  readonly usd_price_24hr_percent_change: string;
  readonly usd_price_24hr_usd_change: string;
  readonly usd_value_24hr_usd_change?: string;
  readonly usd_value: number;
  readonly portfolio_percentage: number;
  readonly balance_formatted: string;
  readonly native_token: boolean;
}

export interface EvmErc20TokenBalanceWithPriceInput {
  readonly tokenAddress?: EvmAddressInput | EvmAddress;
  readonly name: string;
  readonly symbol: string;
  readonly logo?: string;
  readonly thumbnail?: string;
  readonly decimals: number;
  readonly balance: EvmNativeInput | EvmNative;
  readonly possibleSpam: boolean;
  readonly verifiedContract?: boolean;
  readonly usdPrice: string;
  readonly usdPrice24hrPercentChange: string;
  readonly usdPrice24hrUsdChange: string;
  readonly usdValue24hrUsdChange?: string;
  readonly usdValue: number;
  readonly portfolioPercentage: number;
  readonly balanceFormatted: string;
  readonly nativeToken: boolean;
}

export class EvmErc20TokenBalanceWithPrice {
  public static create(input: EvmErc20TokenBalanceWithPriceInput | EvmErc20TokenBalanceWithPrice): EvmErc20TokenBalanceWithPrice {
    if (input instanceof EvmErc20TokenBalanceWithPrice) {
      return input;
    }
    return new EvmErc20TokenBalanceWithPrice(input);
  }

  public static fromJSON(json: EvmErc20TokenBalanceWithPriceJSON): EvmErc20TokenBalanceWithPrice {
    const input: EvmErc20TokenBalanceWithPriceInput = {
      tokenAddress: json.token_address ? EvmAddress.fromJSON(json.token_address) : undefined,
      name: json.name,
      symbol: json.symbol,
      logo: json.logo,
      thumbnail: json.thumbnail,
      decimals: json.decimals,
      balance: EvmNative.fromJSON(json.balance),
      possibleSpam: json.possible_spam,
      verifiedContract: json.verified_contract,
      usdPrice: json.usd_price,
      usdPrice24hrPercentChange: json.usd_price_24hr_percent_change,
      usdPrice24hrUsdChange: json.usd_price_24hr_usd_change,
      usdValue24hrUsdChange: json.usd_value_24hr_usd_change,
      usdValue: json.usd_value,
      portfolioPercentage: json.portfolio_percentage,
      balanceFormatted: json.balance_formatted,
      nativeToken: json.native_token,
    };
    return EvmErc20TokenBalanceWithPrice.create(input);
  }

  /**
   * @description The address of the token contract
   */
  public readonly tokenAddress?: EvmAddress;
  /**
   * @description The name of the token
   */
  public readonly name: string;
  /**
   * @description The symbol of the token
   */
  public readonly symbol: string;
  /**
   * @description The logo of the token
   */
  public readonly logo?: string;
  /**
   * @description The thumbnail of the token logo
   */
  public readonly thumbnail?: string;
  /**
   * @description The number of decimals on the token
   */
  public readonly decimals: number;
  /**
   * @description The balance of the token
   */
  public readonly balance: EvmNative;
  /**
   * @description Indicates if a contract is possibly a spam contract
   */
  public readonly possibleSpam: boolean;
  /**
   * @description Indicates if a contract is verified
   */
  public readonly verifiedContract?: boolean;
  /**
   * @description USD price of the token
   */
  public readonly usdPrice: string;
  /**
   * @description 24-hour percent change in USD price of the token
   */
  public readonly usdPrice24hrPercentChange: string;
  /**
   * @description 24-hour change in USD price of the token
   */
  public readonly usdPrice24hrUsdChange: string;
  /**
   * @description 24-hour change in USD value of the token based on the balance
   */
  public readonly usdValue24hrUsdChange?: string;
  /**
   * @description USD value of the token balance
   */
  public readonly usdValue: number;
  /**
   * @description Percentage of the token in the entire portfolio
   */
  public readonly portfolioPercentage: number;
  /**
   * @description Balance of the token in decimal format
   */
  public readonly balanceFormatted: string;
  /**
   * @description Indicates if the token is a native coin
   */
  public readonly nativeToken: boolean;

  private constructor(input: EvmErc20TokenBalanceWithPriceInput) {
    this.tokenAddress = input.tokenAddress ? EvmAddress.create(input.tokenAddress) : undefined;
    this.name = input.name;
    this.symbol = input.symbol;
    this.logo = input.logo;
    this.thumbnail = input.thumbnail;
    this.decimals = input.decimals;
    this.balance = EvmNative.create(input.balance);
    this.possibleSpam = input.possibleSpam;
    this.verifiedContract = input.verifiedContract;
    this.usdPrice = input.usdPrice;
    this.usdPrice24hrPercentChange = input.usdPrice24hrPercentChange;
    this.usdPrice24hrUsdChange = input.usdPrice24hrUsdChange;
    this.usdValue24hrUsdChange = input.usdValue24hrUsdChange;
    this.usdValue = input.usdValue;
    this.portfolioPercentage = input.portfolioPercentage;
    this.balanceFormatted = input.balanceFormatted;
    this.nativeToken = input.nativeToken;
  }

  public toJSON(): EvmErc20TokenBalanceWithPriceJSON {
    return {
      token_address: this.tokenAddress ? this.tokenAddress.toJSON() : undefined,
      name: this.name,
      symbol: this.symbol,
      logo: this.logo,
      thumbnail: this.thumbnail,
      decimals: this.decimals,
      balance: this.balance.toJSON(),
      possible_spam: this.possibleSpam,
      verified_contract: this.verifiedContract,
      usd_price: this.usdPrice,
      usd_price_24hr_percent_change: this.usdPrice24hrPercentChange,
      usd_price_24hr_usd_change: this.usdPrice24hrUsdChange,
      usd_value_24hr_usd_change: this.usdValue24hrUsdChange,
      usd_value: this.usdValue,
      portfolio_percentage: this.portfolioPercentage,
      balance_formatted: this.balanceFormatted,
      native_token: this.nativeToken,
    }
  }
}
