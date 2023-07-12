import { BigNumber, BigNumberInput, BigNumberJSON } from '@moralisweb3/common-core';

// $ref: #/components/schemas/transactionTimestamp
// type: transactionTimestamp
// properties:
// - block_number ($ref: #/components/schemas/transactionTimestamp/properties/block_number)
// - block_timestamp ($ref: #/components/schemas/transactionTimestamp/properties/block_timestamp)
// - transaction_hash ($ref: #/components/schemas/transactionTimestamp/properties/transaction_hash)

export interface EvmTransactionTimestampJSON {
  readonly block_number: BigNumberJSON;
  readonly block_timestamp: string;
  readonly transaction_hash?: string;
}

export interface EvmTransactionTimestampInput {
  readonly blockNumber: BigNumberInput | BigNumber;
  readonly blockTimestamp: string;
  readonly transactionHash?: string;
}

export class EvmTransactionTimestamp {
  public static create(input: EvmTransactionTimestampInput | EvmTransactionTimestamp): EvmTransactionTimestamp {
    if (input instanceof EvmTransactionTimestamp) {
      return input;
    }
    return new EvmTransactionTimestamp(input);
  }

  public static fromJSON(json: EvmTransactionTimestampJSON): EvmTransactionTimestamp {
    const input: EvmTransactionTimestampInput = {
      blockNumber: BigNumber.fromJSON(json.block_number),
      blockTimestamp: json.block_timestamp,
      transactionHash: json.transaction_hash,
    };
    return EvmTransactionTimestamp.create(input);
  }

  /**
   * @description The block number
   */
  public readonly blockNumber: BigNumber;
  /**
   * @description The block timestamp
   */
  public readonly blockTimestamp: string;
  /**
   * @description The hash of the transaction
   */
  public readonly transactionHash?: string;

  private constructor(input: EvmTransactionTimestampInput) {
    this.blockNumber = BigNumber.create(input.blockNumber);
    this.blockTimestamp = input.blockTimestamp;
    this.transactionHash = input.transactionHash;
  }

  public toJSON(): EvmTransactionTimestampJSON {
    return {
      block_number: this.blockNumber.toJSON(),
      block_timestamp: this.blockTimestamp,
      transaction_hash: this.transactionHash,
    }
  }
}
