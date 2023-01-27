import { AptNativeErc20Price, AptNativeErc20PriceJSON } from '../types/AptNativeErc20Price';

// $ref: #/components/schemas/erc20Price

export interface AptErc20PriceJSON {
  readonly nativePrice?: AptNativeErc20PriceJSON;
  readonly usdPrice: number;
  readonly exchangeAddress?: string;
  readonly exchangeName?: string;
}

export interface AptErc20PriceInput {
  readonly nativePrice?: AptNativeErc20Price;
  readonly usdPrice: number;
  readonly exchangeAddress?: string;
  readonly exchangeName?: string;
}

export class AptErc20Price {
  public static create(input: AptErc20PriceInput): AptErc20Price {
    return new AptErc20Price(input);
  }

  public static fromJSON(json: AptErc20PriceJSON): AptErc20Price {
    const input: AptErc20PriceInput = {
      nativePrice: json.nativePrice ? AptNativeErc20Price.fromJSON(json.nativePrice) : undefined,
      usdPrice: json.usdPrice,
      exchangeAddress: json.exchangeAddress,
      exchangeName: json.exchangeName,
    };
    return AptErc20Price.create(input);
  }

  public readonly nativePrice?: AptNativeErc20Price;
  /**
   * @description The price in USD for the token
   */
  public readonly usdPrice: number;
  /**
   * @description The address of the exchange used to calculate the price
   */
  public readonly exchangeAddress?: string;
  /**
   * @description The name of the exchange used to calculate the price
   */
  public readonly exchangeName?: string;

  private constructor(input: AptErc20PriceInput) {
    this.nativePrice = input.nativePrice;
    this.usdPrice = input.usdPrice;
    this.exchangeAddress = input.exchangeAddress;
    this.exchangeName = input.exchangeName;
  }

  public toJSON(): AptErc20PriceJSON {
    return {
      nativePrice: this.nativePrice ? this.nativePrice.toJSON() : undefined,
      usdPrice: this.usdPrice,
      exchangeAddress: this.exchangeAddress,
      exchangeName: this.exchangeName,
    };
  }
}
