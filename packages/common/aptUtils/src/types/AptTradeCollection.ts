import { AptTrade, AptTradeJSON } from '../types/AptTrade';

// $ref: #/components/schemas/tradeCollection

export interface AptTradeCollectionJSON {
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
  readonly result?: AptTradeJSON[];
}

export interface AptTradeCollectionInput {
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly result?: AptTrade[];
}

export class AptTradeCollection {
  public static create(input: AptTradeCollectionInput): AptTradeCollection {
    return new AptTradeCollection(input);
  }

  public static fromJSON(json: AptTradeCollectionJSON): AptTradeCollection {
    const input: AptTradeCollectionInput = {
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      result: json.result ? json.result.map((item) => AptTrade.fromJSON(item)) : undefined,
    };
    return AptTradeCollection.create(input);
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
  public readonly result?: AptTrade[];

  private constructor(input: AptTradeCollectionInput) {
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.result = input.result;
  }

  public toJSON(): AptTradeCollectionJSON {
    return {
      total: this.total,
      page: this.page,
      page_size: this.pageSize,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    }
  }
}
