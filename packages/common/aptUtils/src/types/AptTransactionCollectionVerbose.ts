import { AptBlockTransaction, AptBlockTransactionJSON } from '../types/AptBlockTransaction';

// $ref: #/components/schemas/transactionCollectionVerbose

export interface AptTransactionCollectionVerboseJSON {
  readonly page?: number;
  readonly page_size?: number;
  readonly result?: AptBlockTransactionJSON[];
}

export interface AptTransactionCollectionVerboseInput {
  readonly page?: number;
  readonly pageSize?: number;
  readonly result?: AptBlockTransaction[];
}

export class AptTransactionCollectionVerbose {
  public static create(input: AptTransactionCollectionVerboseInput): AptTransactionCollectionVerbose {
    return new AptTransactionCollectionVerbose(input);
  }

  public static fromJSON(json: AptTransactionCollectionVerboseJSON): AptTransactionCollectionVerbose {
    const input: AptTransactionCollectionVerboseInput = {
      page: json.page,
      pageSize: json.page_size,
      result: json.result ? json.result.map((item) => AptBlockTransaction.fromJSON(item)) : undefined,
    };
    return AptTransactionCollectionVerbose.create(input);
  }

  /**
   * @description The current page of the result
   */
  public readonly page?: number;
  /**
   * @description The number of results per page
   */
  public readonly pageSize?: number;
  public readonly result?: AptBlockTransaction[];

  private constructor(input: AptTransactionCollectionVerboseInput) {
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.result = input.result;
  }

  public toJSON(): AptTransactionCollectionVerboseJSON {
    return {
      page: this.page,
      page_size: this.pageSize,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    };
  }
}
