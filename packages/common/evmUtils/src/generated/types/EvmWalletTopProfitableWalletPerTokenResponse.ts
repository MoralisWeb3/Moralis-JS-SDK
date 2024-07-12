import { EvmTopProfitableWalletPerTokenResponse, EvmTopProfitableWalletPerTokenResponseInput, EvmTopProfitableWalletPerTokenResponseJSON } from '../types/EvmTopProfitableWalletPerTokenResponse';

// $ref: #/components/schemas/WalletTopProfitableWalletPerTokenResponse
// type: WalletTopProfitableWalletPerTokenResponse
// properties:
// - name ($ref: #/components/schemas/WalletTopProfitableWalletPerTokenResponse/properties/name)
// - symbol ($ref: #/components/schemas/WalletTopProfitableWalletPerTokenResponse/properties/symbol)
// - decimals ($ref: #/components/schemas/WalletTopProfitableWalletPerTokenResponse/properties/decimals)
// - logo ($ref: #/components/schemas/WalletTopProfitableWalletPerTokenResponse/properties/logo)
// - possible_spam ($ref: #/components/schemas/WalletTopProfitableWalletPerTokenResponse/properties/possible_spam)
// - result ($ref: #/components/schemas/TopProfitableWalletPerTokenResponse)

export interface EvmWalletTopProfitableWalletPerTokenResponseJSON {
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly logo: string;
  readonly possible_spam: boolean;
  readonly result: EvmTopProfitableWalletPerTokenResponseJSON[];
}

export interface EvmWalletTopProfitableWalletPerTokenResponseInput {
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly logo: string;
  readonly possibleSpam: boolean;
  readonly result: EvmTopProfitableWalletPerTokenResponseInput[] | EvmTopProfitableWalletPerTokenResponse[];
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
      name: json.name,
      symbol: json.symbol,
      decimals: json.decimals,
      logo: json.logo,
      possibleSpam: json.possible_spam,
      result: json.result.map((item) => EvmTopProfitableWalletPerTokenResponse.fromJSON(item)),
    };
    return EvmWalletTopProfitableWalletPerTokenResponse.create(input);
  }

  /**
   * @description The name of the token contract
   */
  public readonly name: string;
  /**
   * @description The symbol of the NFT contract
   */
  public readonly symbol: string;
  /**
   * @description The number of decimals on the token
   */
  public readonly decimals: number;
  /**
   * @description The logo of the token
   */
  public readonly logo: string;
  /**
   * @description Indicates if a contract is possibly a spam contract
   */
  public readonly possibleSpam: boolean;
  /**
   * @description List of top profitable wallets per token.
   */
  public readonly result: EvmTopProfitableWalletPerTokenResponse[];

  private constructor(input: EvmWalletTopProfitableWalletPerTokenResponseInput) {
    this.name = input.name;
    this.symbol = input.symbol;
    this.decimals = input.decimals;
    this.logo = input.logo;
    this.possibleSpam = input.possibleSpam;
    this.result = input.result.map((item) => EvmTopProfitableWalletPerTokenResponse.create(item));
  }

  public toJSON(): EvmWalletTopProfitableWalletPerTokenResponseJSON {
    return {
      name: this.name,
      symbol: this.symbol,
      decimals: this.decimals,
      logo: this.logo,
      possible_spam: this.possibleSpam,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
