import { AptNftCollections, AptNftCollectionsJSON } from '../types/AptNftCollections';

// $ref: #/components/schemas/nftWalletCollections

export interface AptNftWalletCollectionsJSON {
  readonly status?: string;
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
  readonly cursor?: string;
  readonly result?: AptNftCollectionsJSON[];
}

export interface AptNftWalletCollectionsInput {
  readonly status?: string;
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly cursor?: string;
  readonly result?: AptNftCollections[];
}

export class AptNftWalletCollections {
  public static create(input: AptNftWalletCollectionsInput): AptNftWalletCollections {
    return new AptNftWalletCollections(input);
  }

  public static fromJSON(json: AptNftWalletCollectionsJSON): AptNftWalletCollections {
    const input: AptNftWalletCollectionsInput = {
      status: json.status,
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      cursor: json.cursor,
      result: json.result ? json.result.map((item) => AptNftCollections.fromJSON(item)) : undefined,
    };
    return AptNftWalletCollections.create(input);
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
  public readonly result?: AptNftCollections[];

  private constructor(input: AptNftWalletCollectionsInput) {
    this.status = input.status;
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.cursor = input.cursor;
    this.result = input.result;
  }

  public toJSON(): AptNftWalletCollectionsJSON {
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
