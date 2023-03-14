import { AptosNFTTokenResponse, AptosNFTTokenResponseInput, AptosNFTTokenResponseJSON } from '../types/AptosNFTTokenResponse';

// $ref: #/components/schemas/NFTTokensByCreatorsResponse
// type: NFTTokensByCreatorsResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTTokensByCreatorsResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTTokensByCreatorsResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTTokenResponse)

export interface AptosNFTTokensByCreatorsResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTokenResponseJSON[];
}

export interface AptosNFTTokensByCreatorsResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTokenResponseInput[] | AptosNFTTokenResponse[];
}

export class AptosNFTTokensByCreatorsResponse {
  public static create(input: AptosNFTTokensByCreatorsResponseInput | AptosNFTTokensByCreatorsResponse): AptosNFTTokensByCreatorsResponse {
    if (input instanceof AptosNFTTokensByCreatorsResponse) {
      return input;
    }
    return new AptosNFTTokensByCreatorsResponse(input);
  }

  public static fromJSON(json: AptosNFTTokensByCreatorsResponseJSON): AptosNFTTokensByCreatorsResponse {
    const input: AptosNFTTokensByCreatorsResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTTokenResponse.fromJSON(item)),
    };
    return AptosNFTTokensByCreatorsResponse.create(input);
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
   * @description The collections for the given creators
   */
  public readonly result: AptosNFTTokenResponse[];

  private constructor(input: AptosNFTTokensByCreatorsResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTTokenResponse.create(item));
  }

  public toJSON(): AptosNFTTokensByCreatorsResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
