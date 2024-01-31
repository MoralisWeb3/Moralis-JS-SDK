import { EvmOhlcResult, EvmOhlcResultInput, EvmOhlcResultJSON } from '../types/EvmOhlcResult';

// $ref: #/components/schemas/ohlcResponse
// type: ohlcResponse
// properties:
// - page ($ref: #/components/schemas/ohlcResponse/properties/page)
// - page_size ($ref: #/components/schemas/ohlcResponse/properties/page_size)
// - cursor ($ref: #/components/schemas/ohlcResponse/properties/cursor)
// - result ($ref: #/components/schemas/ohlcResult)

export interface EvmOhlcResponseJSON {
  readonly page?: number;
  readonly page_size?: number;
  readonly cursor?: string;
  readonly result: EvmOhlcResultJSON;
}

export interface EvmOhlcResponseInput {
  readonly page?: number;
  readonly pageSize?: number;
  readonly cursor?: string;
  readonly result: EvmOhlcResultInput | EvmOhlcResult;
}

export class EvmOhlcResponse {
  public static create(input: EvmOhlcResponseInput | EvmOhlcResponse): EvmOhlcResponse {
    if (input instanceof EvmOhlcResponse) {
      return input;
    }
    return new EvmOhlcResponse(input);
  }

  public static fromJSON(json: EvmOhlcResponseJSON): EvmOhlcResponse {
    const input: EvmOhlcResponseInput = {
      page: json.page,
      pageSize: json.page_size,
      cursor: json.cursor,
      result: EvmOhlcResult.fromJSON(json.result),
    };
    return EvmOhlcResponse.create(input);
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
  public readonly result: EvmOhlcResult;

  private constructor(input: EvmOhlcResponseInput) {
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.cursor = input.cursor;
    this.result = EvmOhlcResult.create(input.result);
  }

  public toJSON(): EvmOhlcResponseJSON {
    return {
      page: this.page,
      page_size: this.pageSize,
      cursor: this.cursor,
      result: this.result.toJSON(),
    }
  }
}
