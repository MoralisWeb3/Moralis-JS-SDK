import { AptosNFTCollectionItemResponse, AptosNFTCollectionItemResponseInput, AptosNFTCollectionItemResponseJSON } from '../types/AptosNFTCollectionItemResponse';

// $ref: #/components/schemas/NFTCollectionsByNameRangeResponse
// type: NFTCollectionsByNameRangeResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTCollectionsByNameRangeResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTCollectionsByNameRangeResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTCollectionItemResponse)

export interface AptosNFTCollectionsByNameRangeResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTCollectionItemResponseJSON[];
}

export interface AptosNFTCollectionsByNameRangeResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTCollectionItemResponseInput[] | AptosNFTCollectionItemResponse[];
}

export class AptosNFTCollectionsByNameRangeResponse {
  public static create(input: AptosNFTCollectionsByNameRangeResponseInput | AptosNFTCollectionsByNameRangeResponse): AptosNFTCollectionsByNameRangeResponse {
    if (input instanceof AptosNFTCollectionsByNameRangeResponse) {
      return input;
    }
    return new AptosNFTCollectionsByNameRangeResponse(input);
  }

  public static fromJSON(json: AptosNFTCollectionsByNameRangeResponseJSON): AptosNFTCollectionsByNameRangeResponse {
    const input: AptosNFTCollectionsByNameRangeResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTCollectionItemResponse.fromJSON(item)),
    };
    return AptosNFTCollectionsByNameRangeResponse.create(input);
  }

  /**
   * @description The cursor to use for the next page of results. (Cursor is null on last page)
   */
  public readonly cursor: string;
  /**
   * @description Indicates if there is a next page of results
   */
  public readonly hasNextPage: boolean;
  /**
   * @description The collections for the given creator
   */
  public readonly result: AptosNFTCollectionItemResponse[];

  private constructor(input: AptosNFTCollectionsByNameRangeResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTCollectionItemResponse.create(item));
  }

  public toJSON(): AptosNFTCollectionsByNameRangeResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
