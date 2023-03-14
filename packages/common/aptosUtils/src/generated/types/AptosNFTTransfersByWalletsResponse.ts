import { AptosNFTTransferResponse, AptosNFTTransferResponseInput, AptosNFTTransferResponseJSON } from '../types/AptosNFTTransferResponse';

// $ref: #/components/schemas/NFTTransfersByWalletsResponse
// type: NFTTransfersByWalletsResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTTransfersByWalletsResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTTransfersByWalletsResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTTransferResponse)

export interface AptosNFTTransfersByWalletsResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTransferResponseJSON[];
}

export interface AptosNFTTransfersByWalletsResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTransferResponseInput[] | AptosNFTTransferResponse[];
}

export class AptosNFTTransfersByWalletsResponse {
  public static create(input: AptosNFTTransfersByWalletsResponseInput | AptosNFTTransfersByWalletsResponse): AptosNFTTransfersByWalletsResponse {
    if (input instanceof AptosNFTTransfersByWalletsResponse) {
      return input;
    }
    return new AptosNFTTransfersByWalletsResponse(input);
  }

  public static fromJSON(json: AptosNFTTransfersByWalletsResponseJSON): AptosNFTTransfersByWalletsResponse {
    const input: AptosNFTTransfersByWalletsResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTTransferResponse.fromJSON(item)),
    };
    return AptosNFTTransfersByWalletsResponse.create(input);
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

  private constructor(input: AptosNFTTransfersByWalletsResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTTransferResponse.create(item));
  }

  public toJSON(): AptosNFTTransfersByWalletsResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
