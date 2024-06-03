import { EvmSoldPriceLastSale, EvmSoldPriceLastSaleInput, EvmSoldPriceLastSaleJSON } from '../types/EvmSoldPriceLastSale';
import { EvmSoldPriceLowestSale, EvmSoldPriceLowestSaleInput, EvmSoldPriceLowestSaleJSON } from '../types/EvmSoldPriceLowestSale';
import { EvmSoldPriceHighestSale, EvmSoldPriceHighestSaleInput, EvmSoldPriceHighestSaleJSON } from '../types/EvmSoldPriceHighestSale';
import { EvmSoldPriceAverageSale, EvmSoldPriceAverageSaleInput, EvmSoldPriceAverageSaleJSON } from '../types/EvmSoldPriceAverageSale';

// $ref: #/components/schemas/soldPrice
// type: soldPrice
// properties:
// - last_sale ($ref: #/components/schemas/soldPrice/properties/last_sale)
// - lowest_sale ($ref: #/components/schemas/soldPrice/properties/lowest_sale)
// - highest_sale ($ref: #/components/schemas/soldPrice/properties/highest_sale)
// - average_sale ($ref: #/components/schemas/soldPrice/properties/average_sale)
// - total_trades ($ref: #/components/schemas/soldPrice/properties/total_trades)

export interface EvmSoldPriceJSON {
  readonly last_sale: EvmSoldPriceLastSaleJSON;
  readonly lowest_sale: EvmSoldPriceLowestSaleJSON;
  readonly highest_sale: EvmSoldPriceHighestSaleJSON;
  readonly average_sale: EvmSoldPriceAverageSaleJSON;
  readonly total_trades?: number;
}

export interface EvmSoldPriceInput {
  readonly lastSale: EvmSoldPriceLastSaleInput | EvmSoldPriceLastSale;
  readonly lowestSale: EvmSoldPriceLowestSaleInput | EvmSoldPriceLowestSale;
  readonly highestSale: EvmSoldPriceHighestSaleInput | EvmSoldPriceHighestSale;
  readonly averageSale: EvmSoldPriceAverageSaleInput | EvmSoldPriceAverageSale;
  readonly totalTrades?: number;
}

export class EvmSoldPrice {
  public static create(input: EvmSoldPriceInput | EvmSoldPrice): EvmSoldPrice {
    if (input instanceof EvmSoldPrice) {
      return input;
    }
    return new EvmSoldPrice(input);
  }

  public static fromJSON(json: EvmSoldPriceJSON): EvmSoldPrice {
    const input: EvmSoldPriceInput = {
      lastSale: EvmSoldPriceLastSale.fromJSON(json.last_sale),
      lowestSale: EvmSoldPriceLowestSale.fromJSON(json.lowest_sale),
      highestSale: EvmSoldPriceHighestSale.fromJSON(json.highest_sale),
      averageSale: EvmSoldPriceAverageSale.fromJSON(json.average_sale),
      totalTrades: json.total_trades,
    };
    return EvmSoldPrice.create(input);
  }

  /**
   * @description The sales price of the NFT collection
   */
  public readonly lastSale: EvmSoldPriceLastSale;
  /**
   * @description The lowest sale of the NFT collection
   */
  public readonly lowestSale: EvmSoldPriceLowestSale;
  /**
   * @description The highest sale of the NFT collection
   */
  public readonly highestSale: EvmSoldPriceHighestSale;
  /**
   * @description The average sale of the NFT collection
   */
  public readonly averageSale: EvmSoldPriceAverageSale;
  /**
   * @description The total trades in the timeframe
   */
  public readonly totalTrades?: number;

  private constructor(input: EvmSoldPriceInput) {
    this.lastSale = EvmSoldPriceLastSale.create(input.lastSale);
    this.lowestSale = EvmSoldPriceLowestSale.create(input.lowestSale);
    this.highestSale = EvmSoldPriceHighestSale.create(input.highestSale);
    this.averageSale = EvmSoldPriceAverageSale.create(input.averageSale);
    this.totalTrades = input.totalTrades;
  }

  public toJSON(): EvmSoldPriceJSON {
    return {
      last_sale: this.lastSale.toJSON(),
      lowest_sale: this.lowestSale.toJSON(),
      highest_sale: this.highestSale.toJSON(),
      average_sale: this.averageSale.toJSON(),
      total_trades: this.totalTrades,
    }
  }
}
