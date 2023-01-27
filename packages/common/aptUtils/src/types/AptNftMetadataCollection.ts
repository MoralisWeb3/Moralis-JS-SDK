import { AptNftMetadata, AptNftMetadataJSON } from '../types/AptNftMetadata';

// $ref: #/components/schemas/nftMetadataCollection

export interface AptNftMetadataCollectionJSON {
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
  readonly result?: AptNftMetadataJSON[];
}

export interface AptNftMetadataCollectionInput {
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly result?: AptNftMetadata[];
}

export class AptNftMetadataCollection {
  public static create(input: AptNftMetadataCollectionInput): AptNftMetadataCollection {
    return new AptNftMetadataCollection(input);
  }

  public static fromJSON(json: AptNftMetadataCollectionJSON): AptNftMetadataCollection {
    const input: AptNftMetadataCollectionInput = {
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      result: json.result ? json.result.map((item) => AptNftMetadata.fromJSON(item)) : undefined,
    };
    return AptNftMetadataCollection.create(input);
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
  public readonly result?: AptNftMetadata[];

  private constructor(input: AptNftMetadataCollectionInput) {
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.result = input.result;
  }

  public toJSON(): AptNftMetadataCollectionJSON {
    return {
      total: this.total,
      page: this.page,
      page_size: this.pageSize,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    };
  }
}
