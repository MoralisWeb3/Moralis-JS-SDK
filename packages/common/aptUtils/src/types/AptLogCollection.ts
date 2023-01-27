import { AptLogEventByAddress, AptLogEventByAddressJSON } from '../types/AptLogEventByAddress';

// $ref: #/components/schemas/logCollection

export interface AptLogCollectionJSON {
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
  readonly cursor?: string;
  readonly result?: AptLogEventByAddressJSON[];
}

export interface AptLogCollectionInput {
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly cursor?: string;
  readonly result?: AptLogEventByAddress[];
}

export class AptLogCollection {
  public static create(input: AptLogCollectionInput): AptLogCollection {
    return new AptLogCollection(input);
  }

  public static fromJSON(json: AptLogCollectionJSON): AptLogCollection {
    const input: AptLogCollectionInput = {
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      cursor: json.cursor,
      result: json.result ? json.result.map((item) => AptLogEventByAddress.fromJSON(item)) : undefined,
    };
    return AptLogCollection.create(input);
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
  /**
   * @description The cursor to get to the next page
   */
  public readonly cursor?: string;
  public readonly result?: AptLogEventByAddress[];

  private constructor(input: AptLogCollectionInput) {
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.cursor = input.cursor;
    this.result = input.result;
  }

  public toJSON(): AptLogCollectionJSON {
    return {
      total: this.total,
      page: this.page,
      page_size: this.pageSize,
      cursor: this.cursor,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    }
  }
}
