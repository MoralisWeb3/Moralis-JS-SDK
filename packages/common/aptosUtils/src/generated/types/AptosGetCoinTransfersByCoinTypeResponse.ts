import { AptosCoinTransferDto, AptosCoinTransferDtoInput, AptosCoinTransferDtoJSON } from '../types/AptosCoinTransferDto';

// $ref: #/components/schemas/GetCoinTransfersByCoinTypeResponse
// type: GetCoinTransfersByCoinTypeResponse
// properties:
// - cursor ($ref: #/components/schemas/GetCoinTransfersByCoinTypeResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetCoinTransfersByCoinTypeResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/CoinTransferDto)

export interface AptosGetCoinTransfersByCoinTypeResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinTransferDtoJSON[];
}

export interface AptosGetCoinTransfersByCoinTypeResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinTransferDtoInput[] | AptosCoinTransferDto[];
}

export class AptosGetCoinTransfersByCoinTypeResponse {
  public static create(input: AptosGetCoinTransfersByCoinTypeResponseInput | AptosGetCoinTransfersByCoinTypeResponse): AptosGetCoinTransfersByCoinTypeResponse {
    if (input instanceof AptosGetCoinTransfersByCoinTypeResponse) {
      return input;
    }
    return new AptosGetCoinTransfersByCoinTypeResponse(input);
  }

  public static fromJSON(json: AptosGetCoinTransfersByCoinTypeResponseJSON): AptosGetCoinTransfersByCoinTypeResponse {
    const input: AptosGetCoinTransfersByCoinTypeResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosCoinTransferDto.fromJSON(item)),
    };
    return AptosGetCoinTransfersByCoinTypeResponse.create(input);
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
   * @description The coins transfers for the provided coin type
   */
  public readonly result: AptosCoinTransferDto[];

  private constructor(input: AptosGetCoinTransfersByCoinTypeResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosCoinTransferDto.create(item));
  }

  public toJSON(): AptosGetCoinTransfersByCoinTypeResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
