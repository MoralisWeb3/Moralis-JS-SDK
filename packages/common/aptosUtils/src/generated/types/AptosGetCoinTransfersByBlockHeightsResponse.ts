import { AptosCoinTransferDto, AptosCoinTransferDtoInput, AptosCoinTransferDtoJSON } from '../types/AptosCoinTransferDto';

// $ref: #/components/schemas/GetCoinTransfersByBlockHeightsResponse
// type: GetCoinTransfersByBlockHeightsResponse
// properties:
// - cursor ($ref: #/components/schemas/GetCoinTransfersByBlockHeightsResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetCoinTransfersByBlockHeightsResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/CoinTransferDto)

export interface AptosGetCoinTransfersByBlockHeightsResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinTransferDtoJSON[];
}

export interface AptosGetCoinTransfersByBlockHeightsResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinTransferDtoInput[] | AptosCoinTransferDto[];
}

export class AptosGetCoinTransfersByBlockHeightsResponse {
  public static create(input: AptosGetCoinTransfersByBlockHeightsResponseInput | AptosGetCoinTransfersByBlockHeightsResponse): AptosGetCoinTransfersByBlockHeightsResponse {
    if (input instanceof AptosGetCoinTransfersByBlockHeightsResponse) {
      return input;
    }
    return new AptosGetCoinTransfersByBlockHeightsResponse(input);
  }

  public static fromJSON(json: AptosGetCoinTransfersByBlockHeightsResponseJSON): AptosGetCoinTransfersByBlockHeightsResponse {
    const input: AptosGetCoinTransfersByBlockHeightsResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosCoinTransferDto.fromJSON(item)),
    };
    return AptosGetCoinTransfersByBlockHeightsResponse.create(input);
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
   * @description The coins transfers for the provided block heights
   */
  public readonly result: AptosCoinTransferDto[];

  private constructor(input: AptosGetCoinTransfersByBlockHeightsResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosCoinTransferDto.create(item));
  }

  public toJSON(): AptosGetCoinTransfersByBlockHeightsResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
