import { AptErc20Transaction, AptErc20TransactionJSON } from '../types/AptErc20Transaction';

// $ref: #/components/schemas/erc20TransactionCollection

export interface AptErc20TransactionCollectionJSON {
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
  readonly result?: AptErc20TransactionJSON[];
}

export interface AptErc20TransactionCollectionInput {
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly result?: AptErc20Transaction[];
}

export class AptErc20TransactionCollection {
  public static create(input: AptErc20TransactionCollectionInput): AptErc20TransactionCollection {
    return new AptErc20TransactionCollection(input);
  }

  public static fromJSON(json: AptErc20TransactionCollectionJSON): AptErc20TransactionCollection {
    const input: AptErc20TransactionCollectionInput = {
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      result: json.result ? json.result.map((item) => AptErc20Transaction.fromJSON(item)) : undefined,
    };
    return AptErc20TransactionCollection.create(input);
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
  public readonly result?: AptErc20Transaction[];

  private constructor(input: AptErc20TransactionCollectionInput) {
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.result = input.result;
  }

  public toJSON(): AptErc20TransactionCollectionJSON {
    return {
      total: this.total,
      page: this.page,
      page_size: this.pageSize,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    }
  }
}
