import { AptosCoinInfoDto, AptosCoinInfoDtoInput, AptosCoinInfoDtoJSON } from '../types/AptosCoinInfoDto';

// $ref: #/components/schemas/GetCoinsByCreatorsResponse
// type: GetCoinsByCreatorsResponse
// properties:
// - cursor ($ref: #/components/schemas/GetCoinsByCreatorsResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetCoinsByCreatorsResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/CoinInfoDto)

export interface AptosGetCoinsByCreatorsResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinInfoDtoJSON[];
}

export interface AptosGetCoinsByCreatorsResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinInfoDtoInput[] | AptosCoinInfoDto[];
}

export class AptosGetCoinsByCreatorsResponse {
  public static create(input: AptosGetCoinsByCreatorsResponseInput | AptosGetCoinsByCreatorsResponse): AptosGetCoinsByCreatorsResponse {
    if (input instanceof AptosGetCoinsByCreatorsResponse) {
      return input;
    }
    return new AptosGetCoinsByCreatorsResponse(input);
  }

  public static fromJSON(json: AptosGetCoinsByCreatorsResponseJSON): AptosGetCoinsByCreatorsResponse {
    const input: AptosGetCoinsByCreatorsResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosCoinInfoDto.fromJSON(item)),
    };
    return AptosGetCoinsByCreatorsResponse.create(input);
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
   * @description The coins created by the given creators
   */
  public readonly result: AptosCoinInfoDto[];

  private constructor(input: AptosGetCoinsByCreatorsResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosCoinInfoDto.create(item));
  }

  public toJSON(): AptosGetCoinsByCreatorsResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
