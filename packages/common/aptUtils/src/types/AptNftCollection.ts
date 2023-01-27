import { AptNft, AptNftJSON } from '../types/AptNft';

// $ref: #/components/schemas/nftCollection

export interface AptNftCollectionJSON {
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
  readonly cursor?: string;
  readonly result?: AptNftJSON[];
}

export interface AptNftCollectionInput {
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly cursor?: string;
  readonly result?: AptNft[];
}

export class AptNftCollection {
  public static create(input: AptNftCollectionInput): AptNftCollection {
    return new AptNftCollection(input);
  }

  public static fromJSON(json: AptNftCollectionJSON): AptNftCollection {
    const input: AptNftCollectionInput = {
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      cursor: json.cursor,
      result: json.result ? json.result.map((item) => AptNft.fromJSON(item)) : undefined,
    };
    return AptNftCollection.create(input);
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
  public readonly result?: AptNft[];

  private constructor(input: AptNftCollectionInput) {
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.cursor = input.cursor;
    this.result = input.result;
  }

  public toJSON(): AptNftCollectionJSON {
    return {
      total: this.total,
      page: this.page,
      page_size: this.pageSize,
      cursor: this.cursor,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    }
  }
}
