import {
  AptNativeBalancesItemWalletBalancesItem,
  AptNativeBalancesItemWalletBalancesItemJSON,
} from '../types/AptNativeBalancesItemWalletBalancesItem';

// $ref: #/components/schemas/nativeBalances/items

export interface AptNativeBalancesItemJSON {
  readonly chain: string;
  readonly chain_id: string;
  readonly total_balance: string;
  readonly block_number: string;
  readonly block_timestamp: string;
  readonly total_balance_formatted: string;
  readonly wallet_balances: AptNativeBalancesItemWalletBalancesItemJSON[];
}

export interface AptNativeBalancesItemInput {
  readonly chain: string;
  readonly chainId: string;
  readonly totalBalance: string;
  readonly blockNumber: string;
  readonly blockTimestamp: string;
  readonly totalBalanceFormatted: string;
  readonly walletBalances: AptNativeBalancesItemWalletBalancesItem[];
}

export class AptNativeBalancesItem {
  public static create(input: AptNativeBalancesItemInput): AptNativeBalancesItem {
    return new AptNativeBalancesItem(input);
  }

  public static fromJSON(json: AptNativeBalancesItemJSON): AptNativeBalancesItem {
    const input: AptNativeBalancesItemInput = {
      chain: json.chain,
      chainId: json.chain_id,
      totalBalance: json.total_balance,
      blockNumber: json.block_number,
      blockTimestamp: json.block_timestamp,
      totalBalanceFormatted: json.total_balance_formatted,
      walletBalances: json.wallet_balances.map((item) => AptNativeBalancesItemWalletBalancesItem.fromJSON(item)),
    };
    return AptNativeBalancesItem.create(input);
  }

  /**
   * @description The chain
   */
  public readonly chain: string;
  /**
   * @description The chain id
   */
  public readonly chainId: string;
  /**
   * @description The total balances for all the walttes
   */
  public readonly totalBalance: string;
  /**
   * @description The block Number
   */
  public readonly blockNumber: string;
  /**
   * @description The block timestamp
   */
  public readonly blockTimestamp: string;
  /**
   * @description The total balances for all the walttes formatted
   */
  public readonly totalBalanceFormatted: string;
  public readonly walletBalances: AptNativeBalancesItemWalletBalancesItem[];

  private constructor(input: AptNativeBalancesItemInput) {
    this.chain = input.chain;
    this.chainId = input.chainId;
    this.totalBalance = input.totalBalance;
    this.blockNumber = input.blockNumber;
    this.blockTimestamp = input.blockTimestamp;
    this.totalBalanceFormatted = input.totalBalanceFormatted;
    this.walletBalances = input.walletBalances;
  }

  public toJSON(): AptNativeBalancesItemJSON {
    return {
      chain: this.chain,
      chain_id: this.chainId,
      total_balance: this.totalBalance,
      block_number: this.blockNumber,
      block_timestamp: this.blockTimestamp,
      total_balance_formatted: this.totalBalanceFormatted,
      wallet_balances: this.walletBalances.map((item) => item.toJSON()),
    };
  }
}
