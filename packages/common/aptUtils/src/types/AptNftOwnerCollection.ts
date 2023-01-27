import { AptNftOwner, AptNftOwnerJSON } from '../types/AptNftOwner';

// $ref: #/components/schemas/nftOwnerCollection

export interface AptNftOwnerCollectionJSON {
  readonly status?: string;
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
  readonly cursor?: string;
  readonly result?: AptNftOwnerJSON[];
}

export interface AptNftOwnerCollectionInput {
  readonly status?: string;
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly cursor?: string;
  readonly result?: AptNftOwner[];
}

export class AptNftOwnerCollection {
  public static create(input: AptNftOwnerCollectionInput): AptNftOwnerCollection {
    return new AptNftOwnerCollection(input);
  }

  public static fromJSON(json: AptNftOwnerCollectionJSON): AptNftOwnerCollection {
    const input: AptNftOwnerCollectionInput = {
      status: json.status,
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      cursor: json.cursor,
      result: json.result ? json.result.map((item) => AptNftOwner.fromJSON(item)) : undefined,
    };
    return AptNftOwnerCollection.create(input);
  }

  /**
   * @description The syncing status of the address [SYNCING/SYNCED]
   */
  public readonly status?: string;
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
  public readonly result?: AptNftOwner[];

  private constructor(input: AptNftOwnerCollectionInput) {
    this.status = input.status;
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.cursor = input.cursor;
    this.result = input.result;
  }

  public toJSON(): AptNftOwnerCollectionJSON {
    return {
      status: this.status,
      total: this.total,
      page: this.page,
      page_size: this.pageSize,
      cursor: this.cursor,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    }
  }
}
