// $ref: #/components/schemas/blockTokenStat/properties/transactions
// type: blockTokenStat_transactions
// properties:
// - total ($ref: #/components/schemas/blockTokenStat/properties/transactions/properties/total)

export interface EvmBlockTokenStatTransactionsJSON {
  readonly total: string;
}

export interface EvmBlockTokenStatTransactionsInput {
  readonly total: string;
}

export class EvmBlockTokenStatTransactions {
  public static create(input: EvmBlockTokenStatTransactionsInput | EvmBlockTokenStatTransactions): EvmBlockTokenStatTransactions {
    if (input instanceof EvmBlockTokenStatTransactions) {
      return input;
    }
    return new EvmBlockTokenStatTransactions(input);
  }

  public static fromJSON(json: EvmBlockTokenStatTransactionsJSON): EvmBlockTokenStatTransactions {
    const input: EvmBlockTokenStatTransactionsInput = {
      total: json.total,
    };
    return EvmBlockTokenStatTransactions.create(input);
  }

  /**
   * @description The number of transactions made in a block
   */
  public readonly total: string;

  private constructor(input: EvmBlockTokenStatTransactionsInput) {
    this.total = input.total;
  }

  public toJSON(): EvmBlockTokenStatTransactionsJSON {
    return {
      total: this.total,
    }
  }
}
