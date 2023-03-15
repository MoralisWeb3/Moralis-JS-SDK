import { AptosCoinInfoDto, AptosCoinInfoDtoInput, AptosCoinInfoDtoJSON } from '../types/AptosCoinInfoDto';

// $ref: #/components/schemas/GetCoinsBySymbolRangeResponse
// type: GetCoinsBySymbolRangeResponse
// properties:
// - cursor ($ref: #/components/schemas/GetCoinsBySymbolRangeResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetCoinsBySymbolRangeResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/CoinInfoDto)

export interface AptosGetCoinsBySymbolRangeResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinInfoDtoJSON[];
}

export interface AptosGetCoinsBySymbolRangeResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinInfoDtoInput[] | AptosCoinInfoDto[];
}

export class AptosGetCoinsBySymbolRangeResponse {
  public static create(input: AptosGetCoinsBySymbolRangeResponseInput | AptosGetCoinsBySymbolRangeResponse): AptosGetCoinsBySymbolRangeResponse {
    if (input instanceof AptosGetCoinsBySymbolRangeResponse) {
      return input;
    }
    return new AptosGetCoinsBySymbolRangeResponse(input);
  }

  public static fromJSON(json: AptosGetCoinsBySymbolRangeResponseJSON): AptosGetCoinsBySymbolRangeResponse {
    const input: AptosGetCoinsBySymbolRangeResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosCoinInfoDto.fromJSON(item)),
    };
    return AptosGetCoinsBySymbolRangeResponse.create(input);
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
   * @description The coins matching the query
   */
  public readonly result: AptosCoinInfoDto[];

  private constructor(input: AptosGetCoinsBySymbolRangeResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosCoinInfoDto.create(item));
  }

  public toJSON(): AptosGetCoinsBySymbolRangeResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
