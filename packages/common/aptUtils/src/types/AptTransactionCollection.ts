import { AptTransaction, AptTransactionJSON } from '../types/AptTransaction';

// $ref: #/components/schemas/transactionCollection

export interface AptTransactionCollectionJSON {
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
  readonly result?: AptTransactionJSON[];
}

export interface AptTransactionCollectionInput {
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly result?: AptTransaction[];
}

export class AptTransactionCollection {
  public static create(input: AptTransactionCollectionInput): AptTransactionCollection {
    return new AptTransactionCollection(input);
  }

  public static fromJSON(json: AptTransactionCollectionJSON): AptTransactionCollection {
    const input: AptTransactionCollectionInput = {
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      result: json.result ? json.result.map((item) => AptTransaction.fromJSON(item)) : undefined,
    };
    return AptTransactionCollection.create(input);
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
  public readonly result?: AptTransaction[];

  private constructor(input: AptTransactionCollectionInput) {
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.result = input.result;
  }

  public toJSON(): AptTransactionCollectionJSON {
    return {
      total: this.total,
      page: this.page,
      page_size: this.pageSize,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    };
  }
}
