import { MoralisDataObject, maybe, BigNumber, dateInputToDate } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNative } from '../EvmNative';
import { EvmTransactionLog } from '../EvmTransactionLog';
import { EvmTransacionInput, EvmTransactionData } from './types';

/**
 * Valid input for a new EvmTransaction instance.
 * This can be an existing {@link EvmTransaction} or a valid {@link EvmTransacionInput} object
 */
export type EvmTransactionish = EvmTransacionInput | EvmTransaction;

/**
 * The EvmTranaction is a representation of a published transaction.
 *
 * Use this class any time you work with a transaction.
 *
 * @category DataType
 */
export class EvmTransaction implements MoralisDataObject {
  /**
   * Create a new instance of EvmTransaction from any valid transaction input
   * @param data - the EvmTransactionish type
   * @example
   * ```
   * const transaction = EvmTransaction.create(data);
   *```
   */
  static create(data: EvmTransactionish) {
    if (data instanceof EvmTransaction) {
      return data;
    }

    return new EvmTransaction(data);
  }

  /**
   * Internal reference of the transaction.
   */
  private _data: EvmTransactionData;

  constructor(data: EvmTransacionInput) {
    this._data = EvmTransaction.parse(data);
  }

  static parse = (data: EvmTransacionInput): EvmTransactionData => ({
    from: EvmAddress.create(data.from),
    to: maybe(data.to, EvmAddress.create),
    nonce: maybe(data.nonce, BigNumber.create),
    data: maybe(data.data),
    value: maybe(data.value, (val) => EvmNative.create(val, 'wei')),
    hash: data.hash,

    type: maybe(data.type),
    chain: EvmChain.create(data.chain),

    gas: maybe(data.gas, BigNumber.create),
    gasPrice: BigNumber.create(data.gasPrice),

    index: +data.index,
    blockNumber: BigNumber.create(data.blockNumber),
    blockHash: data.blockHash,
    blockTimestamp: dateInputToDate(data.blockTimestamp),

    cumulativeGasUsed: BigNumber.create(data.cumulativeGasUsed),
    gasUsed: BigNumber.create(data.gasUsed),

    contractAddress: maybe(data.contractAddress, EvmAddress.create),
    receiptRoot: maybe(data.receiptRoot),
    receiptStatus: maybe(data.receiptStatus, (status) => +status),

    logs: (data.logs ?? []).map((log) => EvmTransactionLog.create(log)),
  });

  /**
   * Check the equality between two Evm transactions
   * @param dataA - The first transaction
   * @param dataB - The second transaction
   * @example
   * ```ts
   * EvmTransaction.equals(dataA, dataB)
   * ```
   */
  static equals(dataA: EvmTransactionish, dataB: EvmTransactionish) {
    const transactionA = EvmTransaction.create(dataA);
    const transactionB = EvmTransaction.create(dataB);

    if (!transactionA._data.chain.equals(transactionB._data.chain)) {
      return false;
    }

    if (transactionA._data.hash !== transactionB._data.hash) {
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
  equals(data: EvmTransactionish): boolean {
    return EvmTransaction.equals(this, data);
  }

  toJSON() {
    const data = this._data;
    return {
      ...data,
      to: data.to?.format(),
      from: data.from?.format(),
      nonce: data.nonce?.toString(),
      gas: data.gas?.toString(),
      gasPrice: data.gasPrice?.toString(),
      gasUsed: data.gasUsed?.toString(),
      cumulativeGasUsed: data.cumulativeGasUsed?.toString(),
      blockNumber: data.blockNumber?.toString(),
      value: data.value?.toString(),
      chain: data.chain?.format(),
      contractAddress: data.contractAddress?.format(),
      logs: data.logs.map((log) => log.toJSON()),
      blockTimestamp: data.blockTimestamp.toString(),
    };
  }

  /**
   * @returns a JSON represention of the transaction.
   * @example
   * ```
   * transaction.format()
   * ```
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns the transaction
   * @example
   * ```
   * transaction.result
   * ```
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the transaction to address
   * @example
   * ```
   * transaction.to
   * ```
   */
  get to() {
    return this._data.to;
  }

  /**
   * @returns the transaction from address
   * @example
   * ```
   * transaction.address
   * ```
   */
  get from() {
    return this._data.from;
  }

  /**
   * @returns the transaction nonce
   * @example
   * ```
   * transaction.nonce
   * ```
   */
  get nonce() {
    return this._data.nonce;
  }

  /**
   * @returns the transaction gas
   * @example
   * ```
   * transaction.gas
   * ```
   */
  get gas() {
    return this._data.gas;
  }

  /**
   * @returns the transaction gas price
   * @example
   * ```
   * transaction.gasPrice
   * ```
   */
  get gasPrice() {
    return this._data.gasPrice;
  }

  /**
   * @returns the transaction gas used
   * @example
   * ```
   * transaction.gasUsed
   * ```
   */
  get gasUsed() {
    return this._data.gasUsed;
  }

  /**
   * @returns the transaction cumulative gas used
   * @example
   * ```
   * transaction.cumulativeGasUsed
   * ```
   */
  get cumulativeGasUsed() {
    return this._data.cumulativeGasUsed;
  }

  /**
   * @returns the transaction block number
   * @example
   * ```
   * transaction.blockNumber
   * ```
   */
  get blockNumber() {
    return this._data.blockNumber;
  }

  /**
   * @returns the transaction value
   * @example
   * ```
   * transaction.value
   * ```
   */
  get value() {
    return this._data.value;
  }

  /**
   * @returns the transaction chain
   * @example
   * ```
   * transaction.chain
   * ```
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the transaction contract address
   * @example
   * ```
   * transaction.contractAddress
   * ```
   */
  get contractAddress() {
    return this._data.contractAddress;
  }

  /**
   * @returns the transaction logs
   * @example
   * ```
   * transaction.logs
   * ```
   */
  get logs() {
    return this._data.logs;
  }

  /**
   * @returns the transaction receipt root
   * @example
   * ```
   * transaction.receiptRoot
   * ```
   */
  get receiptRoot() {
    return this._data.receiptRoot;
  }

  /**
   * @returns the transaction receipt status
   * @example
   * ```
   * transaction.receiptStatus
   * ```
   */
  get receiptStatus() {
    return this._data.receiptStatus;
  }

  /**
   * @returns the transaction data
   * @example
   * ```
   * transaction.data
   * ```
   */
  get data() {
    return this._data.data;
  }

  /**
   * @returns the transaction hash
   * @example
   * ```
   * transaction.hash
   * ```
   */
  get hash() {
    return this._data.hash;
  }

  /**
   * @returns the transaction type
   * @example
   * ```
   * transaction.type
   * ```
   */
  get type() {
    return this._data.type;
  }

  /**
   * @returns the transaction black hash
   * @example
   * ```
   * transaction.blockHash
   * ```
   */
  get blockHash() {
    return this._data.blockHash;
  }

  /**
   * @returns the transaction block timestamp
   * @example
   * ```
   * transaction.blockTimestamp
   * ```
   */
  get blockTimestamp() {
    return this._data.blockTimestamp;
  }
}
