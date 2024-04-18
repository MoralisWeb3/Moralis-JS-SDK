import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/nativeErc20Price
// type: nativeErc20Price
// properties:
// - value ($ref: #/components/schemas/nativeErc20Price/properties/value)
// - decimals ($ref: #/components/schemas/nativeErc20Price/properties/decimals)
// - name ($ref: #/components/schemas/nativeErc20Price/properties/name)
// - symbol ($ref: #/components/schemas/nativeErc20Price/properties/symbol)
// - address ($ref: #/components/schemas/nativeErc20Price/properties/address)

export interface EvmNativeErc20PriceJSON {
  readonly value: string;
  readonly decimals: number;
  readonly name: string;
  readonly symbol: string;
  readonly address: EvmAddressJSON;
}

export interface EvmNativeErc20PriceInput {
  readonly value: string;
  readonly decimals: number;
  readonly name: string;
  readonly symbol: string;
  readonly address: EvmAddressInput | EvmAddress;
}

export class EvmNativeErc20Price {
  public static create(input: EvmNativeErc20PriceInput | EvmNativeErc20Price): EvmNativeErc20Price {
    if (input instanceof EvmNativeErc20Price) {
      return input;
    }
    return new EvmNativeErc20Price(input);
  }

  public static fromJSON(json: EvmNativeErc20PriceJSON): EvmNativeErc20Price {
    const input: EvmNativeErc20PriceInput = {
      value: json.value,
      decimals: json.decimals,
      name: json.name,
      symbol: json.symbol,
      address: EvmAddress.fromJSON(json.address),
    };
    return EvmNativeErc20Price.create(input);
  }

  /**
   * @description The native price of the token
   */
  public readonly value: string;
  /**
   * @description The number of decimals on the token
   */
  public readonly decimals: number;
  /**
   * @description The name of the token
   */
  public readonly name: string;
  /**
   * @description The symbol of the token
   */
  public readonly symbol: string;
  /**
   * @description The address of the native token
   */
  public readonly address: EvmAddress;

  private constructor(input: EvmNativeErc20PriceInput) {
    this.value = input.value;
    this.decimals = input.decimals;
    this.name = input.name;
    this.symbol = input.symbol;
    this.address = EvmAddress.create(input.address);
  }

  public toJSON(): EvmNativeErc20PriceJSON {
    return {
      value: this.value,
      decimals: this.decimals,
      name: this.name,
      symbol: this.symbol,
      address: this.address.toJSON(),
    }
  }
}
