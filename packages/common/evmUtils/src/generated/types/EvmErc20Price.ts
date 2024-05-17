import { EvmNativeErc20Price, EvmNativeErc20PriceInput, EvmNativeErc20PriceJSON } from '../types/EvmNativeErc20Price';

// $ref: #/components/schemas/erc20Price
// type: erc20Price
// properties:
// - tokenName ($ref: #/components/schemas/erc20Price/properties/tokenName)
// - tokenSymbol ($ref: #/components/schemas/erc20Price/properties/tokenSymbol)
// - tokenLogo ($ref: #/components/schemas/erc20Price/properties/tokenLogo)
// - tokenDecimals ($ref: #/components/schemas/erc20Price/properties/tokenDecimals)
// - nativePrice ($ref: #/components/schemas/nativeErc20Price)
// - usdPrice ($ref: #/components/schemas/erc20Price/properties/usdPrice)
// - usdPriceFormatted ($ref: #/components/schemas/erc20Price/properties/usdPriceFormatted)
// - 24hrPercentChange ($ref: #/components/schemas/erc20Price/properties/24hrPercentChange)
// - exchangeAddress ($ref: #/components/schemas/erc20Price/properties/exchangeAddress)
// - exchangeName ($ref: #/components/schemas/erc20Price/properties/exchangeName)
// - tokenAddress ($ref: #/components/schemas/erc20Price/properties/tokenAddress)
// - toBlock ($ref: #/components/schemas/erc20Price/properties/toBlock)
// - possibleSpam ($ref: #/components/schemas/erc20Price/properties/possibleSpam)
// - verifiedContract ($ref: #/components/schemas/erc20Price/properties/verifiedContract)

export interface EvmErc20PriceJSON {
  readonly tokenName?: string;
  readonly tokenSymbol?: string;
  readonly tokenLogo?: string;
  readonly tokenDecimals?: string;
  readonly nativePrice?: EvmNativeErc20PriceJSON;
  readonly usdPrice: number;
  readonly usdPriceFormatted?: string;
  readonly '24hrPercentChange'?: string;
  readonly exchangeAddress?: string;
  readonly exchangeName?: string;
  readonly tokenAddress?: string;
  readonly toBlock?: string;
  readonly possibleSpam: boolean;
  readonly verifiedContract: boolean;
}

export interface EvmErc20PriceInput {
  readonly tokenName?: string;
  readonly tokenSymbol?: string;
  readonly tokenLogo?: string;
  readonly tokenDecimals?: string;
  readonly nativePrice?: EvmNativeErc20PriceInput | EvmNativeErc20Price;
  readonly usdPrice: number;
  readonly usdPriceFormatted?: string;
  readonly '24hrPercentChange'?: string;
  readonly exchangeAddress?: string;
  readonly exchangeName?: string;
  readonly tokenAddress?: string;
  readonly toBlock?: string;
  readonly possibleSpam: boolean;
  readonly verifiedContract: boolean;
}

export class EvmErc20Price {
  public static create(input: EvmErc20PriceInput | EvmErc20Price): EvmErc20Price {
    if (input instanceof EvmErc20Price) {
      return input;
    }
    return new EvmErc20Price(input);
  }

  public static fromJSON(json: EvmErc20PriceJSON): EvmErc20Price {
    const input: EvmErc20PriceInput = {
      tokenName: json.tokenName,
      tokenSymbol: json.tokenSymbol,
      tokenLogo: json.tokenLogo,
      tokenDecimals: json.tokenDecimals,
      nativePrice: json.nativePrice ? EvmNativeErc20Price.fromJSON(json.nativePrice) : undefined,
      usdPrice: json.usdPrice,
      usdPriceFormatted: json.usdPriceFormatted,
      '24hrPercentChange': json['24hrPercentChange'],
      exchangeAddress: json.exchangeAddress,
      exchangeName: json.exchangeName,
      tokenAddress: json.tokenAddress,
      toBlock: json.toBlock,
      possibleSpam: json.possibleSpam,
      verifiedContract: json.verifiedContract,
    };
    return EvmErc20Price.create(input);
  }

  /**
   * @description The name of the token
   */
  public readonly tokenName?: string;
  /**
   * @description The symbol of the token
   */
  public readonly tokenSymbol?: string;
  /**
   * @description The logo of the token
   */
  public readonly tokenLogo?: string;
  /**
   * @description The number of decimals of the token
   */
  public readonly tokenDecimals?: string;
  public readonly nativePrice?: EvmNativeErc20Price;
  /**
   * @description The price in USD for the token
   */
  public readonly usdPrice: number;
  /**
   * @description The price in USD for the token in string format
   */
  public readonly usdPriceFormatted?: string;
  /**
   * @description The 24hr percent change of the token
   */
  public readonly '24hrPercentChange'?: string;
  /**
   * @description The address of the exchange used to calculate the price
   */
  public readonly exchangeAddress?: string;
  /**
   * @description The name of the exchange used to calculate the price
   */
  public readonly exchangeName?: string;
  /**
   * @description The address of the token
   */
  public readonly tokenAddress?: string;
  /**
   * @description toBlock
   */
  public readonly toBlock?: string;
  /**
   * @description Indicates if a contract is possibly a spam contract
   */
  public readonly possibleSpam: boolean;
  /**
   * @description Indicates if the contract is verified
   */
  public readonly verifiedContract: boolean;

  private constructor(input: EvmErc20PriceInput) {
    this.tokenName = input.tokenName;
    this.tokenSymbol = input.tokenSymbol;
    this.tokenLogo = input.tokenLogo;
    this.tokenDecimals = input.tokenDecimals;
    this.nativePrice = input.nativePrice ? EvmNativeErc20Price.create(input.nativePrice) : undefined;
    this.usdPrice = input.usdPrice;
    this.usdPriceFormatted = input.usdPriceFormatted;
    this['24hrPercentChange'] = input['24hrPercentChange'];
    this.exchangeAddress = input.exchangeAddress;
    this.exchangeName = input.exchangeName;
    this.tokenAddress = input.tokenAddress;
    this.toBlock = input.toBlock;
    this.possibleSpam = input.possibleSpam;
    this.verifiedContract = input.verifiedContract;
  }

  public toJSON(): EvmErc20PriceJSON {
    return {
      tokenName: this.tokenName,
      tokenSymbol: this.tokenSymbol,
      tokenLogo: this.tokenLogo,
      tokenDecimals: this.tokenDecimals,
      nativePrice: this.nativePrice ? this.nativePrice.toJSON() : undefined,
      usdPrice: this.usdPrice,
      usdPriceFormatted: this.usdPriceFormatted,
      '24hrPercentChange': this['24hrPercentChange'],
      exchangeAddress: this.exchangeAddress,
      exchangeName: this.exchangeName,
      tokenAddress: this.tokenAddress,
      toBlock: this.toBlock,
      possibleSpam: this.possibleSpam,
      verifiedContract: this.verifiedContract,
    }
  }
}
