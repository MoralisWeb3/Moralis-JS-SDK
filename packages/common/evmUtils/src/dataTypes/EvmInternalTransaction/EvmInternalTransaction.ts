import { BigNumber } from '@moralisweb3/common-core';
import { EvmAddress } from '../EvmAddress';
import { EvmInternalTransactionInput, EvmInternalTransactionData } from './types';

/**
 * Valid input for a new EvmInternalTransaction instance.
 * This can be an existing {@link EvmInternalTransaction} or a valid {@link EvmInternalTransactionInput} object
 */
export type EvmInternalTransactionish = EvmInternalTransactionInput | EvmInternalTransaction;

export interface EvmInternalTransactionJSON {
  readonly transaction_hash: string;
  readonly block_number: string;
  readonly block_hash: string;
  readonly type: string;
  readonly from: string;
  readonly to: string;
  readonly value: string;
  readonly gas: string;
  readonly gas_used: string;
  readonly input: string;
  readonly output: string;
}

/**
 * The EvmTranaction is a representation of a published transaction.
 *
 * Use this class any time you work with a transaction.
 *
 * @category DataType
 */
export class EvmInternalTransaction {
  /**
   * Create a new instance of EvmInternalTransaction from any valid transaction input
   * @param data - the EvmInternalTransactionish type
   * @example
   * ```
   * const transaction = EvmInternalTransaction.create(data);
   *```
   */
  static create(data: EvmInternalTransactionish) {
    if (data instanceof EvmInternalTransaction) {
      return data;
    }
    return new EvmInternalTransaction(data);
  }

  static fromJSON(json: EvmInternalTransactionJSON) {
    return new EvmInternalTransaction({
      blockHash: json.block_hash,
      blockNumber: json.block_number,
      from: json.from,
      gas: json.gas,
      gasUsed: json.gas_used,
      input: json.input,
      output: json.output,
      to: json.to,
      transactionHash: json.transaction_hash,
      type: json.type,
      value: json.value,
    });
  }

  private _data: EvmInternalTransactionData;

  constructor(data: EvmInternalTransactionInput) {
    this._data = EvmInternalTransaction.parse(data);
  }

  static parse = (data: EvmInternalTransactionInput): EvmInternalTransactionData => ({
    from: EvmAddress.create(data.from),
    to: EvmAddress.create(data.to),
    transactionHash: data.transactionHash,
    gas: BigNumber.create(data.gas),
    gasUsed: BigNumber.create(data.gasUsed),
    blockNumber: BigNumber.create(data.blockNumber),
    blockHash: data.blockHash,
    input: data.input,
    output: data.output,
    value: BigNumber.create(data.value),
    type: data.type,
  });

  /**
   * Check the equality between two Evm internal transactions
   * @param dataA - The first transaction
   * @param dataB - The second transaction
   * @example
   * ```ts
   * EvmInternalTransaction.equals(dataA, dataB)
   * ```
   */
  static equals(dataA: EvmInternalTransactionish, dataB: EvmInternalTransactionish) {
    const transactionA = EvmInternalTransaction.create(dataA);
    const transactionB = EvmInternalTransaction.create(dataB);

    if (transactionA._data.transactionHash !== transactionB._data.transactionHash) {
      return false;
    }

    return true;
  }

  /**
   * Checks the equality of the current transaction with another evm transaction
   * @param data - the transaction to compare with
   * @example
   * ```ts
   * transaction.equals(data)
   * ```
   */
  equals(data: EvmInternalTransactionish): boolean {
    return EvmInternalTransaction.equals(this, data);
  }

  toJSON(): EvmInternalTransactionJSON {
    const data = this._data;
    return {
      block_hash: data.blockHash,
      input: data.input,
      output: data.output,
      transaction_hash: data.transactionHash,
      type: data.type,
      to: data.to.toJSON(),
      from: data.from.toJSON(),
      gas: data.gas.toString(),
      gas_used: data.gasUsed.toString(),
      value: data.value.toString(),
      block_number: data.blockNumber.toString(),
    };
  }

  /**
   * @deprecated This method will be removed soon. To format the value, use one of the properties.
   */
  format() {
    return this.toJSON();
  }

  get result() {
    return this._data;
  }

  get transactionHash() {
    return this._data.transactionHash;
  }

  get blockNumber() {
    return this._data.blockNumber;
  }

  get blockHash() {
    return this._data.blockHash;
  }

  get type() {
    return this._data.type;
  }

  get from() {
    return this._data.from;
  }

  get to() {
    return this._data.to;
  }

  get value() {
    return this._data.value;
  }

  get gas() {
    return this._data.gas;
  }

  get gasUsed() {
    return this._data.gasUsed;
  }

  get input() {
    return this._data.input;
  }

  get output() {
    return this._data.output;
  }
}
