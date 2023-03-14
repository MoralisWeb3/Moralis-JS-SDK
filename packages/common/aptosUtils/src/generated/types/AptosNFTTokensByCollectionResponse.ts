import { AptosNFTTokenResponse, AptosNFTTokenResponseInput, AptosNFTTokenResponseJSON } from '../types/AptosNFTTokenResponse';

// $ref: #/components/schemas/NFTTokensByCollectionResponse
// type: NFTTokensByCollectionResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTTokensByCollectionResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTTokensByCollectionResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTTokenResponse)

export interface AptosNFTTokensByCollectionResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTokenResponseJSON[];
}

export interface AptosNFTTokensByCollectionResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTokenResponseInput[] | AptosNFTTokenResponse[];
}

export class AptosNFTTokensByCollectionResponse {
  public static create(input: AptosNFTTokensByCollectionResponseInput | AptosNFTTokensByCollectionResponse): AptosNFTTokensByCollectionResponse {
    if (input instanceof AptosNFTTokensByCollectionResponse) {
      return input;
    }
    return new AptosNFTTokensByCollectionResponse(input);
  }

  public static fromJSON(json: AptosNFTTokensByCollectionResponseJSON): AptosNFTTokensByCollectionResponse {
    const input: AptosNFTTokensByCollectionResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTTokenResponse.fromJSON(item)),
    };
    return AptosNFTTokensByCollectionResponse.create(input);
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
   * @description The tokens for the given collection
   */
  public readonly result: AptosNFTTokenResponse[];

  private constructor(input: AptosNFTTokensByCollectionResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTTokenResponse.create(item));
  }

  public toJSON(): AptosNFTTokensByCollectionResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
