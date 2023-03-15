// $ref: #/components/schemas/NFTOwnersOfCollectionResponse
// type: NFTOwnersOfCollectionResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTOwnersOfCollectionResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTOwnersOfCollectionResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTOwnersOfCollectionResponse/properties/result)

export interface AptosNFTOwnersOfCollectionResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: string[];
}

export interface AptosNFTOwnersOfCollectionResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: string[];
}

export class AptosNFTOwnersOfCollectionResponse {
  public static create(input: AptosNFTOwnersOfCollectionResponseInput | AptosNFTOwnersOfCollectionResponse): AptosNFTOwnersOfCollectionResponse {
    if (input instanceof AptosNFTOwnersOfCollectionResponse) {
      return input;
    }
    return new AptosNFTOwnersOfCollectionResponse(input);
  }

  public static fromJSON(json: AptosNFTOwnersOfCollectionResponseJSON): AptosNFTOwnersOfCollectionResponse {
    const input: AptosNFTOwnersOfCollectionResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result,
    };
    return AptosNFTOwnersOfCollectionResponse.create(input);
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
   * @description The owner addresses for the given collection
   */
  public readonly result: string[];

  private constructor(input: AptosNFTOwnersOfCollectionResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result;
  }

  public toJSON(): AptosNFTOwnersOfCollectionResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result,
    }
  }
}
