import { EvmChainNetWorth, EvmChainNetWorthInput, EvmChainNetWorthJSON } from '../types/EvmChainNetWorth';

// $ref: #/components/schemas/netWorthResult
// type: netWorthResult
// properties:
// - total_networth_usd ($ref: #/components/schemas/netWorthResult/properties/total_networth_usd)
// - chains ($ref: #/components/schemas/chainNetWorth)

export interface EvmNetWorthResultJSON {
  readonly total_networth_usd: string;
  readonly chains: EvmChainNetWorthJSON[];
}

export interface EvmNetWorthResultInput {
  readonly totalNetworthUsd: string;
  readonly chains: EvmChainNetWorthInput[] | EvmChainNetWorth[];
}

export class EvmNetWorthResult {
  public static create(input: EvmNetWorthResultInput | EvmNetWorthResult): EvmNetWorthResult {
    if (input instanceof EvmNetWorthResult) {
      return input;
    }
    return new EvmNetWorthResult(input);
  }

  public static fromJSON(json: EvmNetWorthResultJSON): EvmNetWorthResult {
    const input: EvmNetWorthResultInput = {
      totalNetworthUsd: json.total_networth_usd,
      chains: json.chains.map((item) => EvmChainNetWorth.fromJSON(item)),
    };
    return EvmNetWorthResult.create(input);
  }

  /**
   * @description The total networth in USD
   */
  public readonly totalNetworthUsd: string;
  public readonly chains: EvmChainNetWorth[];

  private constructor(input: EvmNetWorthResultInput) {
    this.totalNetworthUsd = input.totalNetworthUsd;
    this.chains = input.chains.map((item) => EvmChainNetWorth.create(item));
  }

  public toJSON(): EvmNetWorthResultJSON {
    return {
      total_networth_usd: this.totalNetworthUsd,
      chains: this.chains.map((item) => item.toJSON()),
    }
  }
}
