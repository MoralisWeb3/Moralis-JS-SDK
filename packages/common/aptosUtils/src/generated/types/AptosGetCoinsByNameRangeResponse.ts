import { AptosCoinInfoDto, AptosCoinInfoDtoInput, AptosCoinInfoDtoJSON } from '../types/AptosCoinInfoDto';

// $ref: #/components/schemas/GetCoinsByNameRangeResponse
// type: GetCoinsByNameRangeResponse
// properties:
// - cursor ($ref: #/components/schemas/GetCoinsByNameRangeResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetCoinsByNameRangeResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/CoinInfoDto)

export interface AptosGetCoinsByNameRangeResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinInfoDtoJSON[];
}

export interface AptosGetCoinsByNameRangeResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinInfoDtoInput[] | AptosCoinInfoDto[];
}

export class AptosGetCoinsByNameRangeResponse {
  public static create(input: AptosGetCoinsByNameRangeResponseInput | AptosGetCoinsByNameRangeResponse): AptosGetCoinsByNameRangeResponse {
    if (input instanceof AptosGetCoinsByNameRangeResponse) {
      return input;
    }
    return new AptosGetCoinsByNameRangeResponse(input);
  }

  public static fromJSON(json: AptosGetCoinsByNameRangeResponseJSON): AptosGetCoinsByNameRangeResponse {
    const input: AptosGetCoinsByNameRangeResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosCoinInfoDto.fromJSON(item)),
    };
    return AptosGetCoinsByNameRangeResponse.create(input);
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

  private constructor(input: AptosGetCoinsByNameRangeResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosCoinInfoDto.create(item));
  }

  public toJSON(): AptosGetCoinsByNameRangeResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
