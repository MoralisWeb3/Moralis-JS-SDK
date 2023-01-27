// $ref: #/components/schemas/nativeBalance

export interface AptNativeBalanceJSON {
  readonly balance: string;
}

export interface AptNativeBalanceInput {
  readonly balance: string;
}

export class AptNativeBalance {
  public static create(input: AptNativeBalanceInput): AptNativeBalance {
    return new AptNativeBalance(input);
  }

  public static fromJSON(json: AptNativeBalanceJSON): AptNativeBalance {
    const input: AptNativeBalanceInput = {
      balance: json.balance,
    };
    return AptNativeBalance.create(input);
  }

  /**
   * @description The balance
   */
  public readonly balance: string;

  private constructor(input: AptNativeBalanceInput) {
    this.balance = input.balance;
  }

  public toJSON(): AptNativeBalanceJSON {
    return {
      balance: this.balance,
    };
  }
}
