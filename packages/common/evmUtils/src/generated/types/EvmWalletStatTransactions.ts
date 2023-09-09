// $ref: #/components/schemas/walletStat/properties/transactions
// type: walletStat_transactions
// properties:
// - total ($ref: #/components/schemas/walletStat/properties/transactions/properties/total)

export interface EvmWalletStatTransactionsJSON {
  readonly total: string;
}

export interface EvmWalletStatTransactionsInput {
  readonly total: string;
}

export class EvmWalletStatTransactions {
  public static create(input: EvmWalletStatTransactionsInput | EvmWalletStatTransactions): EvmWalletStatTransactions {
    if (input instanceof EvmWalletStatTransactions) {
      return input;
    }
    return new EvmWalletStatTransactions(input);
  }

  public static fromJSON(json: EvmWalletStatTransactionsJSON): EvmWalletStatTransactions {
    const input: EvmWalletStatTransactionsInput = {
      total: json.total,
    };
    return EvmWalletStatTransactions.create(input);
  }

  /**
   * @description The number of transactions sent by a wallet
   */
  public readonly total: string;

  private constructor(input: EvmWalletStatTransactionsInput) {
    this.total = input.total;
  }

  public toJSON(): EvmWalletStatTransactionsJSON {
    return {
      total: this.total,
    }
  }
}
