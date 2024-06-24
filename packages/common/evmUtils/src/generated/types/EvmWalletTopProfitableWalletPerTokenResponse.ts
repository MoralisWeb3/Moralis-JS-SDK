import { EvmTopProfitableWalletPerTokenResponse, EvmTopProfitableWalletPerTokenResponseInput, EvmTopProfitableWalletPerTokenResponseJSON } from '../types/EvmTopProfitableWalletPerTokenResponse';

// $ref: #/components/schemas/WalletTopProfitableWalletPerTokenResponse
// type: WalletTopProfitableWalletPerTokenResponse
// properties:
// - wallets ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse)

export interface EvmWalletTopProfitableWalletPerTokenResponseJSON {
  readonly wallets: EvmTopProfitableWalletPerTokenResponseJSON[];
}

export interface EvmWalletTopProfitableWalletPerTokenResponseInput {
  readonly wallets: EvmTopProfitableWalletPerTokenResponseInput[] | EvmTopProfitableWalletPerTokenResponse[];
}

export class EvmWalletTopProfitableWalletPerTokenResponse {
  public static create(input: EvmWalletTopProfitableWalletPerTokenResponseInput | EvmWalletTopProfitableWalletPerTokenResponse): EvmWalletTopProfitableWalletPerTokenResponse {
    if (input instanceof EvmWalletTopProfitableWalletPerTokenResponse) {
      return input;
    }
    return new EvmWalletTopProfitableWalletPerTokenResponse(input);
  }

  public static fromJSON(json: EvmWalletTopProfitableWalletPerTokenResponseJSON): EvmWalletTopProfitableWalletPerTokenResponse {
    const input: EvmWalletTopProfitableWalletPerTokenResponseInput = {
      wallets: json.wallets.map((item) => EvmTopProfitableWalletPerTokenResponse.fromJSON(item)),
    };
    return EvmWalletTopProfitableWalletPerTokenResponse.create(input);
  }

  /**
   * @description List of top profitable wallets per token.
   */
  public readonly wallets: EvmTopProfitableWalletPerTokenResponse[];

  private constructor(input: EvmWalletTopProfitableWalletPerTokenResponseInput) {
    this.wallets = input.wallets.map((item) => EvmTopProfitableWalletPerTokenResponse.create(item));
  }

  public toJSON(): EvmWalletTopProfitableWalletPerTokenResponseJSON {
    return {
      wallets: this.wallets.map((item) => item.toJSON()),
    }
  }
}
