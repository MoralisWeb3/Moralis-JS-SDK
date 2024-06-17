// $ref: #/components/schemas/defiProtocolBalance
// type: defiProtocolBalance
// properties:
// - total_usd_value ($ref: #/components/schemas/defiProtocolBalance/properties/total_usd_value)
// - total_unclaimed_usd_value ($ref: #/components/schemas/defiProtocolBalance/properties/total_unclaimed_usd_value)
// - positions ($ref: #/components/schemas/defiProtocolBalance/properties/positions)

export interface EvmDefiProtocolBalanceJSON {
  readonly total_usd_value: number;
  readonly total_unclaimed_usd_value?: number;
  readonly positions: number;
}

export interface EvmDefiProtocolBalanceInput {
  readonly totalUsdValue: number;
  readonly totalUnclaimedUsdValue?: number;
  readonly positions: number;
}

export class EvmDefiProtocolBalance {
  public static create(input: EvmDefiProtocolBalanceInput | EvmDefiProtocolBalance): EvmDefiProtocolBalance {
    if (input instanceof EvmDefiProtocolBalance) {
      return input;
    }
    return new EvmDefiProtocolBalance(input);
  }

  public static fromJSON(json: EvmDefiProtocolBalanceJSON): EvmDefiProtocolBalance {
    const input: EvmDefiProtocolBalanceInput = {
      totalUsdValue: json.total_usd_value,
      totalUnclaimedUsdValue: json.total_unclaimed_usd_value,
      positions: json.positions,
    };
    return EvmDefiProtocolBalance.create(input);
  }

  /**
   * @description The total USD value of the protocol
   */
  public readonly totalUsdValue: number;
  /**
   * @description The total unclaimed USD value of the protocol
   */
  public readonly totalUnclaimedUsdValue?: number;
  /**
   * @description The number of positions
   */
  public readonly positions: number;

  private constructor(input: EvmDefiProtocolBalanceInput) {
    this.totalUsdValue = input.totalUsdValue;
    this.totalUnclaimedUsdValue = input.totalUnclaimedUsdValue;
    this.positions = input.positions;
  }

  public toJSON(): EvmDefiProtocolBalanceJSON {
    return {
      total_usd_value: this.totalUsdValue,
      total_unclaimed_usd_value: this.totalUnclaimedUsdValue,
      positions: this.positions,
    }
  }
}
