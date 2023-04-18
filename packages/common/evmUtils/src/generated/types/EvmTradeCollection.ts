import { EvmTrade, EvmTradeInput, EvmTradeJSON } from '../types/EvmTrade';

// $ref: #/components/schemas/tradeCollection
// type: tradeCollection
// properties:
// - total ($ref: #/components/schemas/tradeCollection/properties/total)
// - page ($ref: #/components/schemas/tradeCollection/properties/page)
// - page_size ($ref: #/components/schemas/tradeCollection/properties/page_size)
// - result ($ref: #/components/schemas/trade)

export interface EvmTradeCollectionJSON {
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
  readonly result?: EvmTradeJSON[];
}

export interface EvmTradeCollectionInput {
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly result?: EvmTradeInput[] | EvmTrade[];
}

export class EvmTradeCollection {
  public static create(input: EvmTradeCollectionInput | EvmTradeCollection): EvmTradeCollection {
    if (input instanceof EvmTradeCollection) {
      return input;
    }
    return new EvmTradeCollection(input);
  }

  public static fromJSON(json: EvmTradeCollectionJSON): EvmTradeCollection {
    const input: EvmTradeCollectionInput = {
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      result: json.result ? json.result.map((item) => EvmTrade.fromJSON(item)) : undefined,
    };
    return EvmTradeCollection.create(input);
  }

  /**
   * @description The total number of matches for this query
   */
  public readonly total?: number;
  /**
   * @description The current page of the result
   */
  public readonly page?: number;
  /**
   * @description The number of results per page
   */
  public readonly pageSize?: number;
  public readonly result?: EvmTrade[];

  private constructor(input: EvmTradeCollectionInput) {
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.result = input.result ? input.result.map((item) => EvmTrade.create(item)) : undefined;
  }

  public toJSON(): EvmTradeCollectionJSON {
    return {
      total: this.total,
      page: this.page,
      page_size: this.pageSize,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    }
  }
}
