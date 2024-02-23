import { EvmErc20TokenBalanceWithPrice, EvmErc20TokenBalanceWithPriceInput, EvmErc20TokenBalanceWithPriceJSON } from '../types/EvmErc20TokenBalanceWithPrice';

// $ref: #/components/schemas/erc20TokenBalanceWithPriceResult
// type: erc20TokenBalanceWithPriceResult
// properties:
// - page ($ref: #/components/schemas/erc20TokenBalanceWithPriceResult/properties/page)
// - page_size ($ref: #/components/schemas/erc20TokenBalanceWithPriceResult/properties/page_size)
// - cursor ($ref: #/components/schemas/erc20TokenBalanceWithPriceResult/properties/cursor)
// - result ($ref: #/components/schemas/erc20TokenBalanceWithPrice)

export interface EvmErc20TokenBalanceWithPriceResultJSON {
  readonly page?: number;
  readonly page_size?: number;
  readonly cursor?: string;
  readonly result: EvmErc20TokenBalanceWithPriceJSON[];
}

export interface EvmErc20TokenBalanceWithPriceResultInput {
  readonly page?: number;
  readonly pageSize?: number;
  readonly cursor?: string;
  readonly result: EvmErc20TokenBalanceWithPriceInput[] | EvmErc20TokenBalanceWithPrice[];
}

export class EvmErc20TokenBalanceWithPriceResult {
  public static create(input: EvmErc20TokenBalanceWithPriceResultInput | EvmErc20TokenBalanceWithPriceResult): EvmErc20TokenBalanceWithPriceResult {
    if (input instanceof EvmErc20TokenBalanceWithPriceResult) {
      return input;
    }
    return new EvmErc20TokenBalanceWithPriceResult(input);
  }

  public static fromJSON(json: EvmErc20TokenBalanceWithPriceResultJSON): EvmErc20TokenBalanceWithPriceResult {
    const input: EvmErc20TokenBalanceWithPriceResultInput = {
      page: json.page,
      pageSize: json.page_size,
      cursor: json.cursor,
      result: json.result.map((item) => EvmErc20TokenBalanceWithPrice.fromJSON(item)),
    };
    return EvmErc20TokenBalanceWithPriceResult.create(input);
  }

  /**
   * @description The current page of the result
   */
  public readonly page?: number;
  /**
   * @description The number of results per page
   */
  public readonly pageSize?: number;
  /**
   * @description The cursor to get to the next page
   */
  public readonly cursor?: string;
  public readonly result: EvmErc20TokenBalanceWithPrice[];

  private constructor(input: EvmErc20TokenBalanceWithPriceResultInput) {
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.cursor = input.cursor;
    this.result = input.result.map((item) => EvmErc20TokenBalanceWithPrice.create(item));
  }

  public toJSON(): EvmErc20TokenBalanceWithPriceResultJSON {
    return {
      page: this.page,
      page_size: this.pageSize,
      cursor: this.cursor,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
