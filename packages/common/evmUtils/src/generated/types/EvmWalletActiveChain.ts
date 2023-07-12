import { EvmTransactionTimestamp, EvmTransactionTimestampInput, EvmTransactionTimestampJSON } from '../types/EvmTransactionTimestamp';

// $ref: #/components/schemas/walletActiveChain
// type: walletActiveChain
// properties:
// - chain ($ref: #/components/schemas/walletActiveChain/properties/chain)
// - chain_id ($ref: #/components/schemas/walletActiveChain/properties/chain_id)
// - first_transaction ($ref: #/components/schemas/transactionTimestamp)
// - last_transaction ($ref: #/components/schemas/transactionTimestamp)

export interface EvmWalletActiveChainJSON {
  readonly chain: string;
  readonly chain_id: string;
  readonly first_transaction?: EvmTransactionTimestampJSON;
  readonly last_transaction?: EvmTransactionTimestampJSON;
}

export interface EvmWalletActiveChainInput {
  readonly chain: string;
  readonly chainId: string;
  readonly firstTransaction?: EvmTransactionTimestampInput | EvmTransactionTimestamp;
  readonly lastTransaction?: EvmTransactionTimestampInput | EvmTransactionTimestamp;
}

export class EvmWalletActiveChain {
  public static create(input: EvmWalletActiveChainInput | EvmWalletActiveChain): EvmWalletActiveChain {
    if (input instanceof EvmWalletActiveChain) {
      return input;
    }
    return new EvmWalletActiveChain(input);
  }

  public static fromJSON(json: EvmWalletActiveChainJSON): EvmWalletActiveChain {
    const input: EvmWalletActiveChainInput = {
      chain: json.chain,
      chainId: json.chain_id,
      firstTransaction: json.first_transaction ? EvmTransactionTimestamp.fromJSON(json.first_transaction) : undefined,
      lastTransaction: json.last_transaction ? EvmTransactionTimestamp.fromJSON(json.last_transaction) : undefined,
    };
    return EvmWalletActiveChain.create(input);
  }

  /**
   * @description The chain name
   */
  public readonly chain: string;
  /**
   * @description The chain id
   */
  public readonly chainId: string;
  public readonly firstTransaction?: EvmTransactionTimestamp;
  public readonly lastTransaction?: EvmTransactionTimestamp;

  private constructor(input: EvmWalletActiveChainInput) {
    this.chain = input.chain;
    this.chainId = input.chainId;
    this.firstTransaction = input.firstTransaction ? EvmTransactionTimestamp.create(input.firstTransaction) : undefined;
    this.lastTransaction = input.lastTransaction ? EvmTransactionTimestamp.create(input.lastTransaction) : undefined;
  }

  public toJSON(): EvmWalletActiveChainJSON {
    return {
      chain: this.chain,
      chain_id: this.chainId,
      first_transaction: this.firstTransaction ? this.firstTransaction.toJSON() : undefined,
      last_transaction: this.lastTransaction ? this.lastTransaction.toJSON() : undefined,
    }
  }
}
