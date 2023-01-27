
// $ref: #/components/schemas/transaction

export interface AptTransactionJSON {
  readonly hash: string;
  readonly nonce: string;
  readonly transaction_index: string;
  readonly from_address: string;
  readonly to_address: string;
  readonly value: string;
  readonly gas: string;
  readonly gas_price: string;
  readonly input: string;
  readonly receipt_cumulative_gas_used: string;
  readonly receipt_gas_used: string;
  readonly receipt_contract_address: string;
  readonly receipt_root: string;
  readonly receipt_status: string;
  readonly block_timestamp: string;
  readonly block_number: string;
  readonly block_hash: string;
}

export interface AptTransactionInput {
  readonly hash: string;
  readonly nonce: string;
  readonly transactionIndex: string;
  readonly fromAddress: string;
  readonly toAddress: string;
  readonly value: string;
  readonly gas: string;
  readonly gasPrice: string;
  readonly input: string;
  readonly receiptCumulativeGasUsed: string;
  readonly receiptGasUsed: string;
  readonly receiptContractAddress: string;
  readonly receiptRoot: string;
  readonly receiptStatus: string;
  readonly blockTimestamp: string;
  readonly blockNumber: string;
  readonly blockHash: string;
}

export class AptTransaction {
  public static create(input: AptTransactionInput): AptTransaction {
    return new AptTransaction(input);
  }

  public static fromJSON(json: AptTransactionJSON): AptTransaction {
    const input: AptTransactionInput = {
      hash: json.hash,
      nonce: json.nonce,
      transactionIndex: json.transaction_index,
      fromAddress: json.from_address,
      toAddress: json.to_address,
      value: json.value,
      gas: json.gas,
      gasPrice: json.gas_price,
      input: json.input,
      receiptCumulativeGasUsed: json.receipt_cumulative_gas_used,
      receiptGasUsed: json.receipt_gas_used,
      receiptContractAddress: json.receipt_contract_address,
      receiptRoot: json.receipt_root,
      receiptStatus: json.receipt_status,
      blockTimestamp: json.block_timestamp,
      blockNumber: json.block_number,
      blockHash: json.block_hash,
    };
    return AptTransaction.create(input);
  }

  /**
   * @description The hash of the transaction
   */
  public readonly hash: string;
  /**
   * @description The nonce of the transaction
   */
  public readonly nonce: string;
  /**
   * @description The transaction index
   */
  public readonly transactionIndex: string;
  /**
   * @description The sender
   */
  public readonly fromAddress: string;
  /**
   * @description The recipient
   */
  public readonly toAddress: string;
  /**
   * @description The value that was transferred (in wei)
   */
  public readonly value: string;
  /**
   * @description The gas of the transaction
   */
  public readonly gas: string;
  /**
   * @description The gas price
   */
  public readonly gasPrice: string;
  /**
   * @description The input
   */
  public readonly input: string;
  /**
   * @description The receipt cumulative gas used
   */
  public readonly receiptCumulativeGasUsed: string;
  /**
   * @description The receipt gas used
   */
  public readonly receiptGasUsed: string;
  /**
   * @description The receipt contract address
   */
  public readonly receiptContractAddress: string;
  /**
   * @description The receipt root
   */
  public readonly receiptRoot: string;
  /**
   * @description The receipt status
   */
  public readonly receiptStatus: string;
  /**
   * @description The block timestamp
   */
  public readonly blockTimestamp: string;
  /**
   * @description The block number
   */
  public readonly blockNumber: string;
  /**
   * @description The block hash
   */
  public readonly blockHash: string;

  private constructor(input: AptTransactionInput) {
    this.hash = input.hash;
    this.nonce = input.nonce;
    this.transactionIndex = input.transactionIndex;
    this.fromAddress = input.fromAddress;
    this.toAddress = input.toAddress;
    this.value = input.value;
    this.gas = input.gas;
    this.gasPrice = input.gasPrice;
    this.input = input.input;
    this.receiptCumulativeGasUsed = input.receiptCumulativeGasUsed;
    this.receiptGasUsed = input.receiptGasUsed;
    this.receiptContractAddress = input.receiptContractAddress;
    this.receiptRoot = input.receiptRoot;
    this.receiptStatus = input.receiptStatus;
    this.blockTimestamp = input.blockTimestamp;
    this.blockNumber = input.blockNumber;
    this.blockHash = input.blockHash;
  }

  public toJSON(): AptTransactionJSON {
    return {
      hash: this.hash,
      nonce: this.nonce,
      transaction_index: this.transactionIndex,
      from_address: this.fromAddress,
      to_address: this.toAddress,
      value: this.value,
      gas: this.gas,
      gas_price: this.gasPrice,
      input: this.input,
      receipt_cumulative_gas_used: this.receiptCumulativeGasUsed,
      receipt_gas_used: this.receiptGasUsed,
      receipt_contract_address: this.receiptContractAddress,
      receipt_root: this.receiptRoot,
      receipt_status: this.receiptStatus,
      block_timestamp: this.blockTimestamp,
      block_number: this.blockNumber,
      block_hash: this.blockHash,
    }
  }
}
