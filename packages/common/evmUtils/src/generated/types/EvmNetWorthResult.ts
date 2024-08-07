import { EvmChainNetWorth, EvmChainNetWorthInput, EvmChainNetWorthJSON } from '../types/EvmChainNetWorth';
import { EvmUnavailableChainNetWorth, EvmUnavailableChainNetWorthInput, EvmUnavailableChainNetWorthJSON } from '../types/EvmUnavailableChainNetWorth';

// $ref: #/components/schemas/netWorthResult
// type: netWorthResult
// properties:
// - total_networth_usd ($ref: #/components/schemas/netWorthResult/properties/total_networth_usd)
// - chains ($ref: #/components/schemas/chainNetWorth)
// - unsupported_chain_ids ($ref: #/components/schemas/netWorthResult/properties/unsupported_chain_ids)
// - unavailable_chains ($ref: #/components/schemas/unavailableChainNetWorth)

export interface EvmNetWorthResultJSON {
  readonly total_networth_usd: string;
  readonly chains: EvmChainNetWorthJSON[];
  readonly unsupported_chain_ids?: string[];
  readonly unavailable_chains?: EvmUnavailableChainNetWorthJSON[];
}

export interface EvmNetWorthResultInput {
  readonly totalNetworthUsd: string;
  readonly chains: EvmChainNetWorthInput[] | EvmChainNetWorth[];
  readonly unsupportedChainIds?: string[];
  readonly unavailableChains?: EvmUnavailableChainNetWorthInput[] | EvmUnavailableChainNetWorth[];
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
      unsupportedChainIds: json.unsupported_chain_ids,
      unavailableChains: json.unavailable_chains ? json.unavailable_chains.map((item) => EvmUnavailableChainNetWorth.fromJSON(item)) : undefined,
    };
    return EvmNetWorthResult.create(input);
  }

  /**
   * @description The total networth in USD
   */
  public readonly totalNetworthUsd: string;
  public readonly chains: EvmChainNetWorth[];
  /**
   * @description The chain ids that are not supported
   */
  public readonly unsupportedChainIds?: string[];
  /**
   * @description The chains that are not available during the request
   */
  public readonly unavailableChains?: EvmUnavailableChainNetWorth[];

  private constructor(input: EvmNetWorthResultInput) {
    this.totalNetworthUsd = input.totalNetworthUsd;
    this.chains = input.chains.map((item) => EvmChainNetWorth.create(item));
    this.unsupportedChainIds = input.unsupportedChainIds;
    this.unavailableChains = input.unavailableChains ? input.unavailableChains.map((item) => EvmUnavailableChainNetWorth.create(item)) : undefined;
  }

  public toJSON(): EvmNetWorthResultJSON {
    return {
      total_networth_usd: this.totalNetworthUsd,
      chains: this.chains.map((item) => item.toJSON()),
      unsupported_chain_ids: this.unsupportedChainIds,
      unavailable_chains: this.unavailableChains ? this.unavailableChains.map((item) => item.toJSON()) : undefined,
    }
  }
}
