import { AptosNFTOwnerResponse, AptosNFTOwnerResponseInput, AptosNFTOwnerResponseJSON } from '../types/AptosNFTOwnerResponse';

// $ref: #/components/schemas/NFTsByOwnersResponse
// type: NFTsByOwnersResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTsByOwnersResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTsByOwnersResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTOwnerResponse)

export interface AptosNFTsByOwnersResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTOwnerResponseJSON[];
}

export interface AptosNFTsByOwnersResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTOwnerResponseInput[] | AptosNFTOwnerResponse[];
}

export class AptosNFTsByOwnersResponse {
  public static create(input: AptosNFTsByOwnersResponseInput | AptosNFTsByOwnersResponse): AptosNFTsByOwnersResponse {
    if (input instanceof AptosNFTsByOwnersResponse) {
      return input;
    }
    return new AptosNFTsByOwnersResponse(input);
  }

  public static fromJSON(json: AptosNFTsByOwnersResponseJSON): AptosNFTsByOwnersResponse {
    const input: AptosNFTsByOwnersResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTOwnerResponse.fromJSON(item)),
    };
    return AptosNFTsByOwnersResponse.create(input);
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
   * @description The tokens for the given owners
   */
  public readonly result: AptosNFTOwnerResponse[];

  private constructor(input: AptosNFTsByOwnersResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTOwnerResponse.create(item));
  }

  public toJSON(): AptosNFTsByOwnersResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
