// $ref: #/components/schemas/SPLNativePrice
// type: SPLNativePrice
// properties:
// - value ($ref: #/components/schemas/SPLNativePrice/properties/value)
// - decimals ($ref: #/components/schemas/SPLNativePrice/properties/decimals)
// - name ($ref: #/components/schemas/SPLNativePrice/properties/name)
// - symbol ($ref: #/components/schemas/SPLNativePrice/properties/symbol)

export interface SolSPLNativePriceJSON {
  readonly value: string;
  readonly decimals: number;
  readonly name: string;
  readonly symbol: string;
}

export interface SolSPLNativePriceInput {
  readonly value: string;
  readonly decimals: number;
  readonly name: string;
  readonly symbol: string;
}

export class SolSPLNativePrice {
  public static create(input: SolSPLNativePriceInput | SolSPLNativePrice): SolSPLNativePrice {
    if (input instanceof SolSPLNativePrice) {
      return input;
    }
    return new SolSPLNativePrice(input);
  }

  public static fromJSON(json: SolSPLNativePriceJSON): SolSPLNativePrice {
    const input: SolSPLNativePriceInput = {
      value: json.value,
      decimals: json.decimals,
      name: json.name,
      symbol: json.symbol,
    };
    return SolSPLNativePrice.create(input);
  }

  public readonly value: string;
  public readonly decimals: number;
  public readonly name: string;
  public readonly symbol: string;

  private constructor(input: SolSPLNativePriceInput) {
    this.value = input.value;
    this.decimals = input.decimals;
    this.name = input.name;
    this.symbol = input.symbol;
  }

  public toJSON(): SolSPLNativePriceJSON {
    return {
      value: this.value,
      decimals: this.decimals,
      name: this.name,
      symbol: this.symbol,
    }
  }
}
