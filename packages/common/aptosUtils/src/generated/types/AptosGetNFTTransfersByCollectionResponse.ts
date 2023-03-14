import { AptosNFTTransferResponse, AptosNFTTransferResponseInput, AptosNFTTransferResponseJSON } from '../types/AptosNFTTransferResponse';

// $ref: #/components/schemas/GetNFTTransfersByCollectionResponse
// type: GetNFTTransfersByCollectionResponse
// properties:
// - cursor ($ref: #/components/schemas/GetNFTTransfersByCollectionResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetNFTTransfersByCollectionResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTTransferResponse)

export interface AptosGetNFTTransfersByCollectionResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTransferResponseJSON[];
}

export interface AptosGetNFTTransfersByCollectionResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosNFTTransferResponseInput[] | AptosNFTTransferResponse[];
}

export class AptosGetNFTTransfersByCollectionResponse {
  public static create(input: AptosGetNFTTransfersByCollectionResponseInput | AptosGetNFTTransfersByCollectionResponse): AptosGetNFTTransfersByCollectionResponse {
    if (input instanceof AptosGetNFTTransfersByCollectionResponse) {
      return input;
    }
    return new AptosGetNFTTransfersByCollectionResponse(input);
  }

  public static fromJSON(json: AptosGetNFTTransfersByCollectionResponseJSON): AptosGetNFTTransfersByCollectionResponse {
    const input: AptosGetNFTTransfersByCollectionResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosNFTTransferResponse.fromJSON(item)),
    };
    return AptosGetNFTTransfersByCollectionResponse.create(input);
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

  private constructor(input: AptosGetNFTTransfersByCollectionResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosNFTTransferResponse.create(item));
  }

  public toJSON(): AptosGetNFTTransfersByCollectionResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
