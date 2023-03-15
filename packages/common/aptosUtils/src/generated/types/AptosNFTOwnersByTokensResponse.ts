import { AptosNFTOwnerResponse, AptosNFTOwnerResponseInput, AptosNFTOwnerResponseJSON } from '../types/AptosNFTOwnerResponse';

// $ref: #/components/schemas/NFTOwnersByTokensResponse
// type: NFTOwnersByTokensResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTOwnersByTokensResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTOwnersByTokensResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTOwnerResponse)

export interface AptosNFTOwnersByTokensResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTOwnerResponseJSON[];
}

export interface AptosNFTOwnersByTokensResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTOwnerResponseInput[] | AptosNFTOwnerResponse[];
}

export class AptosNFTOwnersByTokensResponse {
  public static create(input: AptosNFTOwnersByTokensResponseInput | AptosNFTOwnersByTokensResponse): AptosNFTOwnersByTokensResponse {
    if (input instanceof AptosNFTOwnersByTokensResponse) {
      return input;
    }
    return new AptosNFTOwnersByTokensResponse(input);
  }

  public static fromJSON(json: AptosNFTOwnersByTokensResponseJSON): AptosNFTOwnersByTokensResponse {
    const input: AptosNFTOwnersByTokensResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTOwnerResponse.fromJSON(item)),
    };
    return AptosNFTOwnersByTokensResponse.create(input);
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
   * @description The owners for the given tokens
   */
  public readonly result: AptosNFTOwnerResponse[];

  private constructor(input: AptosNFTOwnersByTokensResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTOwnerResponse.create(item));
  }

  public toJSON(): AptosNFTOwnersByTokensResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
