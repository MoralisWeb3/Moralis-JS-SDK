import { AptosNFTTransferResponse, AptosNFTTransferResponseInput, AptosNFTTransferResponseJSON } from '../types/AptosNFTTransferResponse';

// $ref: #/components/schemas/GetNFTTransfersByCreatorsResponse
// type: GetNFTTransfersByCreatorsResponse
// properties:
// - cursor ($ref: #/components/schemas/GetNFTTransfersByCreatorsResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetNFTTransfersByCreatorsResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTTransferResponse)

export interface AptosGetNFTTransfersByCreatorsResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTransferResponseJSON[];
}

export interface AptosGetNFTTransfersByCreatorsResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTransferResponseInput[] | AptosNFTTransferResponse[];
}

export class AptosGetNFTTransfersByCreatorsResponse {
  public static create(input: AptosGetNFTTransfersByCreatorsResponseInput | AptosGetNFTTransfersByCreatorsResponse): AptosGetNFTTransfersByCreatorsResponse {
    if (input instanceof AptosGetNFTTransfersByCreatorsResponse) {
      return input;
    }
    return new AptosGetNFTTransfersByCreatorsResponse(input);
  }

  public static fromJSON(json: AptosGetNFTTransfersByCreatorsResponseJSON): AptosGetNFTTransfersByCreatorsResponse {
    const input: AptosGetNFTTransfersByCreatorsResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTTransferResponse.fromJSON(item)),
    };
    return AptosGetNFTTransfersByCreatorsResponse.create(input);
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

  private constructor(input: AptosGetNFTTransfersByCreatorsResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTTransferResponse.create(item));
  }

  public toJSON(): AptosGetNFTTransfersByCreatorsResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
