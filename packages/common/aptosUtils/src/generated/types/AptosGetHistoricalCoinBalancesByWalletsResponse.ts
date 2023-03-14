import { AptosHistoricalCoinBalanceDto, AptosHistoricalCoinBalanceDtoInput, AptosHistoricalCoinBalanceDtoJSON } from '../types/AptosHistoricalCoinBalanceDto';

// $ref: #/components/schemas/GetHistoricalCoinBalancesByWalletsResponse
// type: GetHistoricalCoinBalancesByWalletsResponse
// properties:
// - cursor ($ref: #/components/schemas/GetHistoricalCoinBalancesByWalletsResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetHistoricalCoinBalancesByWalletsResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/HistoricalCoinBalanceDto)

export interface AptosGetHistoricalCoinBalancesByWalletsResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosHistoricalCoinBalanceDtoJSON[];
}

export interface AptosGetHistoricalCoinBalancesByWalletsResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosHistoricalCoinBalanceDtoInput[] | AptosHistoricalCoinBalanceDto[];
}

export class AptosGetHistoricalCoinBalancesByWalletsResponse {
  public static create(input: AptosGetHistoricalCoinBalancesByWalletsResponseInput | AptosGetHistoricalCoinBalancesByWalletsResponse): AptosGetHistoricalCoinBalancesByWalletsResponse {
    if (input instanceof AptosGetHistoricalCoinBalancesByWalletsResponse) {
      return input;
    }
    return new AptosGetHistoricalCoinBalancesByWalletsResponse(input);
  }

  public static fromJSON(json: AptosGetHistoricalCoinBalancesByWalletsResponseJSON): AptosGetHistoricalCoinBalancesByWalletsResponse {
    const input: AptosGetHistoricalCoinBalancesByWalletsResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosHistoricalCoinBalanceDto.fromJSON(item)),
    };
    return AptosGetHistoricalCoinBalancesByWalletsResponse.create(input);
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
   * @description The coins balances for the provided wallets
   */
  public readonly result: AptosHistoricalCoinBalanceDto[];

  private constructor(input: AptosGetHistoricalCoinBalancesByWalletsResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosHistoricalCoinBalanceDto.create(item));
  }

  public toJSON(): AptosGetHistoricalCoinBalancesByWalletsResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
