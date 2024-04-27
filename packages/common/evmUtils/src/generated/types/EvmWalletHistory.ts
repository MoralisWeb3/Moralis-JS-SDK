import { EvmWalletHistoryTransaction, EvmWalletHistoryTransactionInput, EvmWalletHistoryTransactionJSON } from '../types/EvmWalletHistoryTransaction';

// $ref: #/components/schemas/walletHistory
// type: walletHistory
// properties:
// - page ($ref: #/components/schemas/walletHistory/properties/page)
// - page_size ($ref: #/components/schemas/walletHistory/properties/page_size)
// - cursor ($ref: #/components/schemas/walletHistory/properties/cursor)
// - result ($ref: #/components/schemas/walletHistoryTransaction)

export interface EvmWalletHistoryJSON {
  readonly page: number;
  readonly page_size: number;
  readonly cursor: string;
  readonly result: EvmWalletHistoryTransactionJSON[];
}

export interface EvmWalletHistoryInput {
  readonly page: number;
  readonly pageSize: number;
  readonly cursor: string;
  readonly result: EvmWalletHistoryTransactionInput[] | EvmWalletHistoryTransaction[];
}

export class EvmWalletHistory {
  public static create(input: EvmWalletHistoryInput | EvmWalletHistory): EvmWalletHistory {
    if (input instanceof EvmWalletHistory) {
      return input;
    }
    return new EvmWalletHistory(input);
  }

  public static fromJSON(json: EvmWalletHistoryJSON): EvmWalletHistory {
    const input: EvmWalletHistoryInput = {
      page: json.page,
      pageSize: json.page_size,
      cursor: json.cursor,
      result: json.result.map((item) => EvmWalletHistoryTransaction.fromJSON(item)),
    };
    return EvmWalletHistory.create(input);
  }

  /**
   * @description The current page of the result
   */
  public readonly page: number;
  /**
   * @description The number of results per page
   */
  public readonly pageSize: number;
  /**
   * @description The cursor to get to the next page
   */
  public readonly cursor: string;
  public readonly result: EvmWalletHistoryTransaction[];

  private constructor(input: EvmWalletHistoryInput) {
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.cursor = input.cursor;
    this.result = input.result.map((item) => EvmWalletHistoryTransaction.create(item));
  }

  public toJSON(): EvmWalletHistoryJSON {
    return {
      page: this.page,
      page_size: this.pageSize,
      cursor: this.cursor,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
