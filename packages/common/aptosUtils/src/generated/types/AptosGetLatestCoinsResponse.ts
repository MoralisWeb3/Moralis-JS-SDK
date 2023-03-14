import { AptosCoinInfoDto, AptosCoinInfoDtoInput, AptosCoinInfoDtoJSON } from '../types/AptosCoinInfoDto';

// $ref: #/components/schemas/GetLatestCoinsResponse
// type: GetLatestCoinsResponse
// properties:
// - cursor ($ref: #/components/schemas/GetLatestCoinsResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetLatestCoinsResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/CoinInfoDto)

export interface AptosGetLatestCoinsResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinInfoDtoJSON[];
}

export interface AptosGetLatestCoinsResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinInfoDtoInput[] | AptosCoinInfoDto[];
}

export class AptosGetLatestCoinsResponse {
  public static create(input: AptosGetLatestCoinsResponseInput | AptosGetLatestCoinsResponse): AptosGetLatestCoinsResponse {
    if (input instanceof AptosGetLatestCoinsResponse) {
      return input;
    }
    return new AptosGetLatestCoinsResponse(input);
  }

  public static fromJSON(json: AptosGetLatestCoinsResponseJSON): AptosGetLatestCoinsResponse {
    const input: AptosGetLatestCoinsResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosCoinInfoDto.fromJSON(item)),
    };
    return AptosGetLatestCoinsResponse.create(input);
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

  private constructor(input: AptosGetLatestCoinsResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosCoinInfoDto.create(item));
  }

  public toJSON(): AptosGetLatestCoinsResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
