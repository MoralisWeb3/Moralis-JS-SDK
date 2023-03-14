import { AptosCurrentCoinBalanceDto, AptosCurrentCoinBalanceDtoInput, AptosCurrentCoinBalanceDtoJSON } from '../types/AptosCurrentCoinBalanceDto';

// $ref: #/components/schemas/GetTopHoldersByCoinResponse
// type: GetTopHoldersByCoinResponse
// properties:
// - cursor ($ref: #/components/schemas/GetTopHoldersByCoinResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetTopHoldersByCoinResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/CurrentCoinBalanceDto)

export interface AptosGetTopHoldersByCoinResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCurrentCoinBalanceDtoJSON[];
}

export interface AptosGetTopHoldersByCoinResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCurrentCoinBalanceDtoInput[] | AptosCurrentCoinBalanceDto[];
}

export class AptosGetTopHoldersByCoinResponse {
  public static create(input: AptosGetTopHoldersByCoinResponseInput | AptosGetTopHoldersByCoinResponse): AptosGetTopHoldersByCoinResponse {
    if (input instanceof AptosGetTopHoldersByCoinResponse) {
      return input;
    }
    return new AptosGetTopHoldersByCoinResponse(input);
  }

  public static fromJSON(json: AptosGetTopHoldersByCoinResponseJSON): AptosGetTopHoldersByCoinResponse {
    const input: AptosGetTopHoldersByCoinResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosCurrentCoinBalanceDto.fromJSON(item)),
    };
    return AptosGetTopHoldersByCoinResponse.create(input);
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
   * @description The top holders of the given coin
   */
  public readonly result: AptosCurrentCoinBalanceDto[];

  private constructor(input: AptosGetTopHoldersByCoinResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosCurrentCoinBalanceDto.create(item));
  }

  public toJSON(): AptosGetTopHoldersByCoinResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
