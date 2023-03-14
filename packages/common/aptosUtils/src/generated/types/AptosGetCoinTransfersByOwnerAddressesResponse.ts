import { AptosCoinTransferDto, AptosCoinTransferDtoInput, AptosCoinTransferDtoJSON } from '../types/AptosCoinTransferDto';

// $ref: #/components/schemas/GetCoinTransfersByOwnerAddressesResponse
// type: GetCoinTransfersByOwnerAddressesResponse
// properties:
// - cursor ($ref: #/components/schemas/GetCoinTransfersByOwnerAddressesResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/GetCoinTransfersByOwnerAddressesResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/CoinTransferDto)

export interface AptosGetCoinTransfersByOwnerAddressesResponseJSON {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinTransferDtoJSON[];
}

export interface AptosGetCoinTransfersByOwnerAddressesResponseInput {
  readonly cursor: string;
  readonly hasNextPage: boolean;
  readonly result: AptosCoinTransferDtoInput[] | AptosCoinTransferDto[];
}

export class AptosGetCoinTransfersByOwnerAddressesResponse {
  public static create(input: AptosGetCoinTransfersByOwnerAddressesResponseInput | AptosGetCoinTransfersByOwnerAddressesResponse): AptosGetCoinTransfersByOwnerAddressesResponse {
    if (input instanceof AptosGetCoinTransfersByOwnerAddressesResponse) {
      return input;
    }
    return new AptosGetCoinTransfersByOwnerAddressesResponse(input);
  }

  public static fromJSON(json: AptosGetCoinTransfersByOwnerAddressesResponseJSON): AptosGetCoinTransfersByOwnerAddressesResponse {
    const input: AptosGetCoinTransfersByOwnerAddressesResponseInput = {
      cursor: json.cursor,
      hasNextPage: json.hasNextPage,
      result: json.result.map((item) => AptosCoinTransferDto.fromJSON(item)),
    };
    return AptosGetCoinTransfersByOwnerAddressesResponse.create(input);
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
   * @description The coins transfers for the provided owner addresses
   */
  public readonly result: AptosCoinTransferDto[];

  private constructor(input: AptosGetCoinTransfersByOwnerAddressesResponseInput) {
    this.cursor = input.cursor;
    this.hasNextPage = input.hasNextPage;
    this.result = input.result.map((item) => AptosCoinTransferDto.create(item));
  }

  public toJSON(): AptosGetCoinTransfersByOwnerAddressesResponseJSON {
    return {
      cursor: this.cursor,
      hasNextPage: this.hasNextPage,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
