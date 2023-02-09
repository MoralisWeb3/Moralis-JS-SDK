import { AptosCurrentCoinBalanceDto, AptosCurrentCoinBalanceDtoInput, AptosCurrentCoinBalanceDtoJSON } from '../types/AptosCurrentCoinBalanceDto';

// $ref: #/components/schemas/GetCoinBalancesByWalletsResponse
// type: GetCoinBalancesByWalletsResponse
// properties:
// - cursor ($ref: #/components/schemas/GetCoinBalancesByWalletsResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetCoinBalancesByWalletsResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/CurrentCoinBalanceDto)

export interface AptosGetCoinBalancesByWalletsResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCurrentCoinBalanceDtoJSON[];
}

export interface AptosGetCoinBalancesByWalletsResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCurrentCoinBalanceDtoInput[] | AptosCurrentCoinBalanceDto[];
}

export class AptosGetCoinBalancesByWalletsResponse {
  public static create(input: AptosGetCoinBalancesByWalletsResponseInput | AptosGetCoinBalancesByWalletsResponse): AptosGetCoinBalancesByWalletsResponse {
    if (input instanceof AptosGetCoinBalancesByWalletsResponse) {
      return input;
    }
    return new AptosGetCoinBalancesByWalletsResponse(input);
  }

  public static fromJSON(json: AptosGetCoinBalancesByWalletsResponseJSON): AptosGetCoinBalancesByWalletsResponse {
    const input: AptosGetCoinBalancesByWalletsResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosCurrentCoinBalanceDto.fromJSON(item)),
    };
    return AptosGetCoinBalancesByWalletsResponse.create(input);
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
  public readonly result: AptosCurrentCoinBalanceDto[];

  private constructor(input: AptosGetCoinBalancesByWalletsResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosCurrentCoinBalanceDto.create(item));
  }

  public toJSON(): AptosGetCoinBalancesByWalletsResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
