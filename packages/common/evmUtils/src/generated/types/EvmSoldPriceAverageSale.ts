// $ref: #/components/schemas/soldPrice/properties/average_sale
// type: soldPrice_average_sale
// properties:
// - price ($ref: #/components/schemas/soldPrice/properties/average_sale/properties/price)
// - price_formatted ($ref: #/components/schemas/soldPrice/properties/average_sale/properties/price_formatted)
// - current_usd_value ($ref: #/components/schemas/soldPrice/properties/average_sale/properties/current_usd_value)

export interface EvmSoldPriceAverageSaleJSON {
  readonly price: string;
  readonly price_formatted: string;
  readonly current_usd_value?: string;
}

export interface EvmSoldPriceAverageSaleInput {
  readonly price: string;
  readonly priceFormatted: string;
  readonly currentUsdValue?: string;
}

export class EvmSoldPriceAverageSale {
  public static create(input: EvmSoldPriceAverageSaleInput | EvmSoldPriceAverageSale): EvmSoldPriceAverageSale {
    if (input instanceof EvmSoldPriceAverageSale) {
      return input;
    }
    return new EvmSoldPriceAverageSale(input);
  }

  public static fromJSON(json: EvmSoldPriceAverageSaleJSON): EvmSoldPriceAverageSale {
    const input: EvmSoldPriceAverageSaleInput = {
      price: json.price,
      priceFormatted: json.price_formatted,
      currentUsdValue: json.current_usd_value,
    };
    return EvmSoldPriceAverageSale.create(input);
  }

  /**
   * @description The price of the average sale
   */
  public readonly price: string;
  /**
   * @description The formatted price of the average sale
   */
  public readonly priceFormatted: string;
  /**
   * @description The USD price of the last sale at the current value
   */
  public readonly currentUsdValue?: string;

  private constructor(input: EvmSoldPriceAverageSaleInput) {
    this.price = input.price;
    this.priceFormatted = input.priceFormatted;
    this.currentUsdValue = input.currentUsdValue;
  }

  public toJSON(): EvmSoldPriceAverageSaleJSON {
    return {
      price: this.price,
      price_formatted: this.priceFormatted,
      current_usd_value: this.currentUsdValue,
    }
  }
}
