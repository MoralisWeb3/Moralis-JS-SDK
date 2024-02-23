import { EvmNative, EvmNativeInput, EvmNativeJSON } from '../../dataTypes';

// $ref: #/components/schemas/chainNetWorth
// type: chainNetWorth
// properties:
// - chain ($ref: #/components/schemas/chainNetWorth/properties/chain)
// - native_balance ($ref: #/components/schemas/chainNetWorth/properties/native_balance)
// - native_balance_formatted ($ref: #/components/schemas/chainNetWorth/properties/native_balance_formatted)
// - native_balance_usd ($ref: #/components/schemas/chainNetWorth/properties/native_balance_usd)
// - token_balance_usd ($ref: #/components/schemas/chainNetWorth/properties/token_balance_usd)
// - networth_usd ($ref: #/components/schemas/chainNetWorth/properties/networth_usd)

export interface EvmChainNetWorthJSON {
  readonly chain: string;
  readonly native_balance: EvmNativeJSON;
  readonly native_balance_formatted: string;
  readonly native_balance_usd: string;
  readonly token_balance_usd: string;
  readonly networth_usd: string;
}

export interface EvmChainNetWorthInput {
  readonly chain: string;
  readonly nativeBalance: EvmNativeInput | EvmNative;
  readonly nativeBalanceFormatted: string;
  readonly nativeBalanceUsd: string;
  readonly tokenBalanceUsd: string;
  readonly networthUsd: string;
}

export class EvmChainNetWorth {
  public static create(input: EvmChainNetWorthInput | EvmChainNetWorth): EvmChainNetWorth {
    if (input instanceof EvmChainNetWorth) {
      return input;
    }
    return new EvmChainNetWorth(input);
  }

  public static fromJSON(json: EvmChainNetWorthJSON): EvmChainNetWorth {
    const input: EvmChainNetWorthInput = {
      chain: json.chain,
      nativeBalance: EvmNative.fromJSON(json.native_balance),
      nativeBalanceFormatted: json.native_balance_formatted,
      nativeBalanceUsd: json.native_balance_usd,
      tokenBalanceUsd: json.token_balance_usd,
      networthUsd: json.networth_usd,
    };
    return EvmChainNetWorth.create(input);
  }

  /**
   * @description The chain
   */
  public readonly chain: string;
  /**
   * @description The native balance
   */
  public readonly nativeBalance: EvmNative;
  /**
   * @description The native balance formatted
   */
  public readonly nativeBalanceFormatted: string;
  /**
   * @description The native balance in USD
   */
  public readonly nativeBalanceUsd: string;
  /**
   * @description The token balance in USD
   */
  public readonly tokenBalanceUsd: string;
  /**
   * @description The networth in USD
   */
  public readonly networthUsd: string;

  private constructor(input: EvmChainNetWorthInput) {
    this.chain = input.chain;
    this.nativeBalance = EvmNative.create(input.nativeBalance);
    this.nativeBalanceFormatted = input.nativeBalanceFormatted;
    this.nativeBalanceUsd = input.nativeBalanceUsd;
    this.tokenBalanceUsd = input.tokenBalanceUsd;
    this.networthUsd = input.networthUsd;
  }

  public toJSON(): EvmChainNetWorthJSON {
    return {
      chain: this.chain,
      native_balance: this.nativeBalance.toJSON(),
      native_balance_formatted: this.nativeBalanceFormatted,
      native_balance_usd: this.nativeBalanceUsd,
      token_balance_usd: this.tokenBalanceUsd,
      networth_usd: this.networthUsd,
    }
  }
}
