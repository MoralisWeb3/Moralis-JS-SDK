import { AptosNFTOwnerResponse, AptosNFTOwnerResponseInput, AptosNFTOwnerResponseJSON } from '../types/AptosNFTOwnerResponse';

// $ref: #/components/schemas/NFTOwnersByCollectionResponse
// type: NFTOwnersByCollectionResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTOwnersByCollectionResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTOwnersByCollectionResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTOwnerResponse)

export interface AptosNFTOwnersByCollectionResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTOwnerResponseJSON[];
}

export interface AptosNFTOwnersByCollectionResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTOwnerResponseInput[] | AptosNFTOwnerResponse[];
}

export class AptosNFTOwnersByCollectionResponse {
  public static create(input: AptosNFTOwnersByCollectionResponseInput | AptosNFTOwnersByCollectionResponse): AptosNFTOwnersByCollectionResponse {
    if (input instanceof AptosNFTOwnersByCollectionResponse) {
      return input;
    }
    return new AptosNFTOwnersByCollectionResponse(input);
  }

  public static fromJSON(json: AptosNFTOwnersByCollectionResponseJSON): AptosNFTOwnersByCollectionResponse {
    const input: AptosNFTOwnersByCollectionResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTOwnerResponse.fromJSON(item)),
    };
    return AptosNFTOwnersByCollectionResponse.create(input);
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
   * @description The owners for the given collection
   */
  public readonly result: AptosNFTOwnerResponse[];

  private constructor(input: AptosNFTOwnersByCollectionResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTOwnerResponse.create(item));
  }

  public toJSON(): AptosNFTOwnersByCollectionResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
