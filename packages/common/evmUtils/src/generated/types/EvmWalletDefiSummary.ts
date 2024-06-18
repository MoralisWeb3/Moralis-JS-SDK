import { EvmDefiProtocolBalance, EvmDefiProtocolBalanceInput, EvmDefiProtocolBalanceJSON } from '../types/EvmDefiProtocolBalance';

// $ref: #/components/schemas/walletDefiSummary
// type: walletDefiSummary
// properties:
// - active_protocols ($ref: #/components/schemas/walletDefiSummary/properties/active_protocols)
// - total_positions ($ref: #/components/schemas/walletDefiSummary/properties/total_positions)
// - total_usd_value ($ref: #/components/schemas/walletDefiSummary/properties/total_usd_value)
// - total_unclaimed_usd_value ($ref: #/components/schemas/walletDefiSummary/properties/total_unclaimed_usd_value)
// - protocols ($ref: #/components/schemas/defiProtocolBalance)

export interface EvmWalletDefiSummaryJSON {
  readonly active_protocols: number;
  readonly total_positions: number;
  readonly total_usd_value: number;
  readonly total_unclaimed_usd_value?: number;
  readonly protocols: EvmDefiProtocolBalanceJSON[];
}

export interface EvmWalletDefiSummaryInput {
  readonly activeProtocols: number;
  readonly totalPositions: number;
  readonly totalUsdValue: number;
  readonly totalUnclaimedUsdValue?: number;
  readonly protocols: EvmDefiProtocolBalanceInput[] | EvmDefiProtocolBalance[];
}

export class EvmWalletDefiSummary {
  public static create(input: EvmWalletDefiSummaryInput | EvmWalletDefiSummary): EvmWalletDefiSummary {
    if (input instanceof EvmWalletDefiSummary) {
      return input;
    }
    return new EvmWalletDefiSummary(input);
  }

  public static fromJSON(json: EvmWalletDefiSummaryJSON): EvmWalletDefiSummary {
    const input: EvmWalletDefiSummaryInput = {
      activeProtocols: json.active_protocols,
      totalPositions: json.total_positions,
      totalUsdValue: json.total_usd_value,
      totalUnclaimedUsdValue: json.total_unclaimed_usd_value,
      protocols: json.protocols.map((item) => EvmDefiProtocolBalance.fromJSON(item)),
    };
    return EvmWalletDefiSummary.create(input);
  }

  /**
   * @description The number of active protocols
   */
  public readonly activeProtocols: number;
  /**
   * @description The number of total positions
   */
  public readonly totalPositions: number;
  /**
   * @description The total USD value of the wallet
   */
  public readonly totalUsdValue: number;
  /**
   * @description The total unclaimed USD value of the wallet
   */
  public readonly totalUnclaimedUsdValue?: number;
  public readonly protocols: EvmDefiProtocolBalance[];

  private constructor(input: EvmWalletDefiSummaryInput) {
    this.activeProtocols = input.activeProtocols;
    this.totalPositions = input.totalPositions;
    this.totalUsdValue = input.totalUsdValue;
    this.totalUnclaimedUsdValue = input.totalUnclaimedUsdValue;
    this.protocols = input.protocols.map((item) => EvmDefiProtocolBalance.create(item));
  }

  public toJSON(): EvmWalletDefiSummaryJSON {
    return {
      active_protocols: this.activeProtocols,
      total_positions: this.totalPositions,
      total_usd_value: this.totalUsdValue,
      total_unclaimed_usd_value: this.totalUnclaimedUsdValue,
      protocols: this.protocols.map((item) => item.toJSON()),
    }
  }
}
