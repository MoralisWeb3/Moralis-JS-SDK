// $ref: #/components/schemas/nativeErc20Price

export interface AptNativeErc20PriceJSON {
  readonly value: string;
  readonly decimals: number;
  readonly name: string;
  readonly symbol: string;
}

export interface AptNativeErc20PriceInput {
  readonly value: string;
  readonly decimals: number;
  readonly name: string;
  readonly symbol: string;
}

export class AptNativeErc20Price {
  public static create(input: AptNativeErc20PriceInput): AptNativeErc20Price {
    return new AptNativeErc20Price(input);
  }

  public static fromJSON(json: AptNativeErc20PriceJSON): AptNativeErc20Price {
    const input: AptNativeErc20PriceInput = {
      value: json.value,
      decimals: json.decimals,
      name: json.name,
      symbol: json.symbol,
    };
    return AptNativeErc20Price.create(input);
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

  private constructor(input: AptNativeErc20PriceInput) {
    this.value = input.value;
    this.decimals = input.decimals;
    this.name = input.name;
    this.symbol = input.symbol;
  }

  public toJSON(): AptNativeErc20PriceJSON {
    return {
      value: this.value,
      decimals: this.decimals,
      name: this.name,
      symbol: this.symbol,
    };
  }
}
