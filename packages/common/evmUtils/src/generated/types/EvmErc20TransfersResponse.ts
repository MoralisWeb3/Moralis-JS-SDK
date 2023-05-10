import { EvmErc20Transfer, EvmErc20TransferInput, EvmErc20TransferJSON } from '../types/EvmErc20Transfer';

// $ref: #/components/schemas/erc20TransfersResponse
// type: erc20TransfersResponse
// properties:
// - cursor ($ref: #/components/schemas/erc20TransfersResponse/properties/cursor)
// - result ($ref: #/components/schemas/erc20Transfer)

export interface EvmErc20TransfersResponseJSON {
  readonly cursor?: string;
  readonly result?: EvmErc20TransferJSON[];
}

export interface EvmErc20TransfersResponseInput {
  readonly cursor?: string;
  readonly result?: EvmErc20TransferInput[] | EvmErc20Transfer[];
}

export class EvmErc20TransfersResponse {
  public static create(input: EvmErc20TransfersResponseInput | EvmErc20TransfersResponse): EvmErc20TransfersResponse {
    if (input instanceof EvmErc20TransfersResponse) {
      return input;
    }
    return new EvmErc20TransfersResponse(input);
  }

  public static fromJSON(json: EvmErc20TransfersResponseJSON): EvmErc20TransfersResponse {
    const input: EvmErc20TransfersResponseInput = {
      cursor: json.cursor,
      result: json.result ? json.result.map((item) => EvmErc20Transfer.fromJSON(item)) : undefined,
    };
    return EvmErc20TransfersResponse.create(input);
  }

  /**
   * @description The cursor to get to the next page
   */
  public readonly cursor?: string;
  public readonly result?: EvmErc20Transfer[];

  private constructor(input: EvmErc20TransfersResponseInput) {
    this.cursor = input.cursor;
    this.result = input.result ? input.result.map((item) => EvmErc20Transfer.create(item)) : undefined;
  }

  public toJSON(): EvmErc20TransfersResponseJSON {
    return {
      cursor: this.cursor,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    }
  }
}
