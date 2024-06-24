import { EvmWalletProfitabilityTokenData, EvmWalletProfitabilityTokenDataInput, EvmWalletProfitabilityTokenDataJSON } from '../types/EvmWalletProfitabilityTokenData';

// $ref: #/components/schemas/WalletProfitabilityResponse
// type: WalletProfitabilityResponse
// properties:
// - result ($ref: #/components/schemas/WalletProfitabilityTokenData)

export interface EvmWalletProfitabilityResponseJSON {
  readonly result?: EvmWalletProfitabilityTokenDataJSON[];
}

export interface EvmWalletProfitabilityResponseInput {
  readonly result?: EvmWalletProfitabilityTokenDataInput[] | EvmWalletProfitabilityTokenData[];
}

export class EvmWalletProfitabilityResponse {
  public static create(input: EvmWalletProfitabilityResponseInput | EvmWalletProfitabilityResponse): EvmWalletProfitabilityResponse {
    if (input instanceof EvmWalletProfitabilityResponse) {
      return input;
    }
    return new EvmWalletProfitabilityResponse(input);
  }

  public static fromJSON(json: EvmWalletProfitabilityResponseJSON): EvmWalletProfitabilityResponse {
    const input: EvmWalletProfitabilityResponseInput = {
      result: json.result ? json.result.map((item) => EvmWalletProfitabilityTokenData.fromJSON(item)) : undefined,
    };
    return EvmWalletProfitabilityResponse.create(input);
  }

  /**
   * @description List of tokens traded with their respective profitability data.
   */
  public readonly result?: EvmWalletProfitabilityTokenData[];

  private constructor(input: EvmWalletProfitabilityResponseInput) {
    this.result = input.result ? input.result.map((item) => EvmWalletProfitabilityTokenData.create(item)) : undefined;
  }

  public toJSON(): EvmWalletProfitabilityResponseJSON {
    return {
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    }
  }
}
