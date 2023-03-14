import { AptosNFTCollectionItemResponse, AptosNFTCollectionItemResponseInput, AptosNFTCollectionItemResponseJSON } from '../types/AptosNFTCollectionItemResponse';

// $ref: #/components/schemas/NFTCollectionsByCreatorResponse
// type: NFTCollectionsByCreatorResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTCollectionsByCreatorResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTCollectionsByCreatorResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTCollectionItemResponse)

export interface AptosNFTCollectionsByCreatorResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTCollectionItemResponseJSON[];
}

export interface AptosNFTCollectionsByCreatorResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTCollectionItemResponseInput[] | AptosNFTCollectionItemResponse[];
}

export class AptosNFTCollectionsByCreatorResponse {
  public static create(input: AptosNFTCollectionsByCreatorResponseInput | AptosNFTCollectionsByCreatorResponse): AptosNFTCollectionsByCreatorResponse {
    if (input instanceof AptosNFTCollectionsByCreatorResponse) {
      return input;
    }
    return new AptosNFTCollectionsByCreatorResponse(input);
  }

  public static fromJSON(json: AptosNFTCollectionsByCreatorResponseJSON): AptosNFTCollectionsByCreatorResponse {
    const input: AptosNFTCollectionsByCreatorResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTCollectionItemResponse.fromJSON(item)),
    };
    return AptosNFTCollectionsByCreatorResponse.create(input);
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

  private constructor(input: AptosNFTCollectionsByCreatorResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTCollectionItemResponse.create(item));
  }

  public toJSON(): AptosNFTCollectionsByCreatorResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
