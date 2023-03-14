import { AptosNFTTransferResponse, AptosNFTTransferResponseInput, AptosNFTTransferResponseJSON } from '../types/AptosNFTTransferResponse';

// $ref: #/components/schemas/NFTTransfersByTokensResponse
// type: NFTTransfersByTokensResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTTransfersByTokensResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTTransfersByTokensResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTTransferResponse)

export interface AptosNFTTransfersByTokensResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTransferResponseJSON[];
}

export interface AptosNFTTransfersByTokensResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTransferResponseInput[] | AptosNFTTransferResponse[];
}

export class AptosNFTTransfersByTokensResponse {
  public static create(input: AptosNFTTransfersByTokensResponseInput | AptosNFTTransfersByTokensResponse): AptosNFTTransfersByTokensResponse {
    if (input instanceof AptosNFTTransfersByTokensResponse) {
      return input;
    }
    return new AptosNFTTransfersByTokensResponse(input);
  }

  public static fromJSON(json: AptosNFTTransfersByTokensResponseJSON): AptosNFTTransfersByTokensResponse {
    const input: AptosNFTTransfersByTokensResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTTransferResponse.fromJSON(item)),
    };
    return AptosNFTTransfersByTokensResponse.create(input);
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
  public readonly result: AptosNFTTransferResponse[];

  private constructor(input: AptosNFTTransfersByTokensResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTTransferResponse.create(item));
  }

  public toJSON(): AptosNFTTransfersByTokensResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
