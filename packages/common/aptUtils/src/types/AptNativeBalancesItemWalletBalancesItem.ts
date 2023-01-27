// $ref: #/components/schemas/nativeBalances/items/properties/wallet_balances/items

export interface AptNativeBalancesItemWalletBalancesItemJSON {
  readonly address: string;
  readonly balance: string;
  readonly balance_formatted: string;
}

export interface AptNativeBalancesItemWalletBalancesItemInput {
  readonly address: string;
  readonly balance: string;
  readonly balanceFormatted: string;
}

export class AptNativeBalancesItemWalletBalancesItem {
  public static create(input: AptNativeBalancesItemWalletBalancesItemInput): AptNativeBalancesItemWalletBalancesItem {
    return new AptNativeBalancesItemWalletBalancesItem(input);
  }

  public static fromJSON(json: AptNativeBalancesItemWalletBalancesItemJSON): AptNativeBalancesItemWalletBalancesItem {
    const input: AptNativeBalancesItemWalletBalancesItemInput = {
      address: json.address,
      balance: json.balance,
      balanceFormatted: json.balance_formatted,
    };
    return AptNativeBalancesItemWalletBalancesItem.create(input);
  }

  /**
   * @description address
   */
  public readonly address: string;
  /**
   * @description balance
   */
  public readonly balance: string;
  /**
   * @description balance formatted
   */
  public readonly balanceFormatted: string;

  private constructor(input: AptNativeBalancesItemWalletBalancesItemInput) {
    this.address = input.address;
    this.balance = input.balance;
    this.balanceFormatted = input.balanceFormatted;
  }

  public toJSON(): AptNativeBalancesItemWalletBalancesItemJSON {
    return {
      address: this.address,
      balance: this.balance,
      balance_formatted: this.balanceFormatted,
    };
  }
}
