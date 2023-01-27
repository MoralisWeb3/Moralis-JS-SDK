import { AptLog, AptLogJSON } from '../types/AptLog';

// $ref: #/components/schemas/blockTransaction

export interface AptBlockTransactionJSON {
  readonly hash: string;
  readonly nonce: string;
  readonly transaction_index: string;
  readonly from_address: string;
  readonly to_address: string;
  readonly value: string;
  readonly gas?: string;
  readonly gas_price: string;
  readonly input: string;
  readonly receipt_cumulative_gas_used: string;
  readonly receipt_gas_used: string;
  readonly receipt_contract_address?: string;
  readonly receipt_root?: string;
  readonly receipt_status: string;
  readonly block_timestamp: string;
  readonly block_number: string;
  readonly block_hash: string;
  readonly logs?: AptLogJSON[];
}

export interface AptBlockTransactionInput {
  readonly hash: string;
  readonly nonce: string;
  readonly transactionIndex: string;
  readonly fromAddress: string;
  readonly toAddress: string;
  readonly value: string;
  readonly gas?: string;
  readonly gasPrice: string;
  readonly input: string;
  readonly receiptCumulativeGasUsed: string;
  readonly receiptGasUsed: string;
  readonly receiptContractAddress?: string;
  readonly receiptRoot?: string;
  readonly receiptStatus: string;
  readonly blockTimestamp: string;
  readonly blockNumber: string;
  readonly blockHash: string;
  readonly logs?: AptLog[];
}

export class AptBlockTransaction {
  public static create(input: AptBlockTransactionInput): AptBlockTransaction {
    return new AptBlockTransaction(input);
  }

  public static fromJSON(json: AptBlockTransactionJSON): AptBlockTransaction {
    const input: AptBlockTransactionInput = {
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
      logs: json.logs ? json.logs.map((item) => AptLog.fromJSON(item)) : undefined,
    };
    return AptBlockTransaction.create(input);
  }

  /**
   * @description The hash of the transaction
   */
  public readonly hash: string;
  /**
   * @description The nonce
   */
  public readonly nonce: string;
  public readonly transactionIndex: string;
  /**
   * @description The from address
   */
  public readonly fromAddress: string;
  /**
   * @description The to address
   */
  public readonly toAddress: string;
  /**
   * @description The value sent
   */
  public readonly value: string;
  public readonly gas?: string;
  /**
   * @description The gas price
   */
  public readonly gasPrice: string;
  public readonly input: string;
  public readonly receiptCumulativeGasUsed: string;
  public readonly receiptGasUsed: string;
  public readonly receiptContractAddress?: string;
  public readonly receiptRoot?: string;
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
   * @description The hash of the block
   */
  public readonly blockHash: string;
  /**
   * @description The logs of the transaction
   */
  public readonly logs?: AptLog[];

  private constructor(input: AptBlockTransactionInput) {
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
    this.logs = input.logs;
  }

  public toJSON(): AptBlockTransactionJSON {
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
      logs: this.logs ? this.logs.map((item) => item.toJSON()) : undefined,
    };
  }
}
