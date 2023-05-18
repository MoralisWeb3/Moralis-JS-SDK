import { SolSPLNativePrice, SolSPLNativePriceInput, SolSPLNativePriceJSON } from '../types/SolSPLNativePrice';
import { SolAddress, SolAddressInput, SolAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/SPLTokenPrice
// type: SPLTokenPrice
// properties:
// - nativePrice ($ref: #/components/schemas/SPLNativePrice)
// - usdPrice ($ref: #/components/schemas/SPLTokenPrice/properties/usdPrice)
// - exchangeAddress ($ref: #/components/schemas/SPLTokenPrice/properties/exchangeAddress)
// - exchangeName ($ref: #/components/schemas/SPLTokenPrice/properties/exchangeName)

export interface SolSPLTokenPriceJSON {
  readonly nativePrice: SolSPLNativePriceJSON;
  readonly usdPrice: number;
  readonly exchangeAddress: SolAddressJSON;
  readonly exchangeName: string;
}

export interface SolSPLTokenPriceInput {
  readonly nativePrice: SolSPLNativePriceInput | SolSPLNativePrice;
  readonly usdPrice: number;
  readonly exchangeAddress: SolAddressInput | SolAddress;
  readonly exchangeName: string;
}

export class SolSPLTokenPrice {
  public static create(input: SolSPLTokenPriceInput | SolSPLTokenPrice): SolSPLTokenPrice {
    if (input instanceof SolSPLTokenPrice) {
      return input;
    }
    return new SolSPLTokenPrice(input);
  }

  public static fromJSON(json: SolSPLTokenPriceJSON): SolSPLTokenPrice {
    const input: SolSPLTokenPriceInput = {
      nativePrice: SolSPLNativePrice.fromJSON(json.nativePrice),
      usdPrice: json.usdPrice,
      exchangeAddress: SolAddress.fromJSON(json.exchangeAddress),
      exchangeName: json.exchangeName,
    };
    return SolSPLTokenPrice.create(input);
  }

  public readonly nativePrice: SolSPLNativePrice;
  public readonly usdPrice: number;
  public readonly exchangeAddress: SolAddress;
  public readonly exchangeName: string;

  private constructor(input: SolSPLTokenPriceInput) {
    this.nativePrice = SolSPLNativePrice.create(input.nativePrice);
    this.usdPrice = input.usdPrice;
    this.exchangeAddress = SolAddress.create(input.exchangeAddress);
    this.exchangeName = input.exchangeName;
  }

  public toJSON(): SolSPLTokenPriceJSON {
    return {
      nativePrice: this.nativePrice.toJSON(),
      usdPrice: this.usdPrice,
      exchangeAddress: this.exchangeAddress.toJSON(),
      exchangeName: this.exchangeName,
    }
  }
}
