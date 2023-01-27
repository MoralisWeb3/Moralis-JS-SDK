import { AptNftTransfer, AptNftTransferJSON } from '../types/AptNftTransfer';

// $ref: #/components/schemas/nftTransferCollection

export interface AptNftTransferCollectionJSON {
  readonly total: number;
  readonly page: number;
  readonly page_size: number;
  readonly cursor: string;
  readonly result: AptNftTransferJSON[];
  readonly block_exists?: boolean;
  readonly index_complete?: boolean;
}

export interface AptNftTransferCollectionInput {
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly cursor: string;
  readonly result: AptNftTransfer[];
  readonly blockExists?: boolean;
  readonly indexComplete?: boolean;
}

export class AptNftTransferCollection {
  public static create(input: AptNftTransferCollectionInput): AptNftTransferCollection {
    return new AptNftTransferCollection(input);
  }

  public static fromJSON(json: AptNftTransferCollectionJSON): AptNftTransferCollection {
    const input: AptNftTransferCollectionInput = {
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      cursor: json.cursor,
      result: json.result.map((item) => AptNftTransfer.fromJSON(item)),
      blockExists: json.block_exists,
      indexComplete: json.index_complete,
    };
    return AptNftTransferCollection.create(input);
  }

  /**
   * @description The total number of matches for this query
   */
  public readonly total: number;
  /**
   * @description The current page of the result
   */
  public readonly page: number;
  /**
   * @description The number of results per page
   */
  public readonly pageSize: number;
  /**
   * @description The cursor to get to the next page
   */
  public readonly cursor: string;
  public readonly result: AptNftTransfer[];
  /**
   * @description Indicator if the block exists
   */
  public readonly blockExists?: boolean;
  /**
   * @description Indicator if the block is fully indexed
   */
  public readonly indexComplete?: boolean;

  private constructor(input: AptNftTransferCollectionInput) {
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.cursor = input.cursor;
    this.result = input.result;
    this.blockExists = input.blockExists;
    this.indexComplete = input.indexComplete;
  }

  public toJSON(): AptNftTransferCollectionJSON {
    return {
      total: this.total,
      page: this.page,
      page_size: this.pageSize,
      cursor: this.cursor,
      result: this.result.map((item) => item.toJSON()),
      block_exists: this.blockExists,
      index_complete: this.indexComplete,
    };
  }
}
