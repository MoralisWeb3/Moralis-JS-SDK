import Core, { MoralisDataObject, maybe, BigNumber, CoreProvider, dateInputToDate } from '@moralisweb3/common-core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNative } from '../EvmNative';
import { EvmTransactionLog } from '../EvmTransactionLog';
import { EvmSignature } from '../EvmSignature/EvmSignature';
import { EvmTransactionInput, EvmTransactionData } from './types';

/**
 * Valid input for a new EvmTransaction instance.
 * This can be an existing {@link EvmTransaction} or a valid {@link EvmTransactionInput} object
 */
export type EvmTransactionish = EvmTransactionInput | EvmTransaction;

/**
 * The EvmTransaction is a representation of a published transaction.
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
  static create(data: EvmTransactionish, core?: Core) {
    if (data instanceof EvmTransaction) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new EvmTransaction(data, finalCore);
  }

  protected _data: EvmTransactionData;

  constructor(data: EvmTransactionInput, core: Core) {
    this._data = EvmTransaction.parse(data, core);
  }
  static parse(data: EvmTransactionInput, core: Core): EvmTransactionData {
    return {
      from: EvmAddress.create(data.from, core),
      to: maybe(data.to, (to) => EvmAddress.create(to, core)),
      nonce: maybe(data.nonce, BigNumber.create),
      data: maybe(data.data),
      value: maybe(data.value, (val) => EvmNative.create(val, 'wei')),
      hash: data.hash,

      chain: EvmChain.create(data.chain),

      gas: maybe(data.gas, BigNumber.create),
      gasPrice: BigNumber.create(data.gasPrice),

      index: +data.index,
      blockNumber: BigNumber.create(data.blockNumber),
      blockHash: data.blockHash,
      blockTimestamp: dateInputToDate(data.blockTimestamp),

      cumulativeGasUsed: BigNumber.create(data.cumulativeGasUsed),
      gasUsed: BigNumber.create(data.gasUsed),

      contractAddress: maybe(data.contractAddress, (address) => EvmAddress.create(address, core)),
      receiptRoot: maybe(data.receiptRoot),
      receiptStatus: maybe(data.receiptStatus, (status) => +status),

      logs: (data.logs ?? []).map((log) => EvmTransactionLog.create(log)),

      signature: maybe(data.signature, EvmSignature.create),
    };
  }

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
      value: data.value?.toString(),
      chain: data.chain?.format(),
      contractAddress: data.contractAddress?.format(),
      logs: data.logs.map((log) => log.toJSON()),
      signature: data.signature?.toJSON(),
      blockNumber: data.blockNumber?.toString(),
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
   * transaction.to // EvmAddress
   * ```
   */
  get to() {
    return this._data.to;
  }

  /**
   * @returns the transaction from address
   * @example
   * ```
   * transaction.address // EvmAddress
   * ```
   */
  get from() {
    return this._data.from;
  }

  /**
   * @returns the transaction nonce
   * @example
   * ```
   * transaction.nonce // 326595425
   * ```
   */
  get nonce() {
    return this._data.nonce;
  }

  /**
   * @returns the transaction gas
   * @example
   * ```
   * transaction.gas // 6721975
   * ```
   */
  get gas() {
    return this._data.gas;
  }

  /**
   * @returns the transaction gas price
   * @example
   * ```
   * transaction.gasPrice // 20000000000
   * ```
   */
  get gasPrice() {
    return this._data.gasPrice;
  }

  /**
   * @returns the transaction gas used
   * @example
   * ```
   * transaction.gasUsed // 1340925
   * ```
   */
  get gasUsed() {
    return this._data.gasUsed;
  }

  /**
   * @returns the transaction cumulative gas used
   * @example
   * ```
   * transaction.cumulativeGasUsed // 1340925
   * ```
   */
  get cumulativeGasUsed() {
    return this._data.cumulativeGasUsed;
  }

  /**
   * @returns the transaction block number
   * @example
   * ```
   * transaction.blockNumber // 12526958
   * ```
   */
  get blockNumber() {
    return this._data.blockNumber;
  }

  /**
   * @returns the transaction value
   * @example
   * ```
   * transaction.value // EvmNative
   * ```
   */
  get value() {
    return this._data.value;
  }

  /**
   * @returns the transaction chain
   * @example
   * ```
   * transaction.chain // EvmChain
   * ```
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the transaction contract address
   * @example
   * ```
   * transaction.contractAddress // EvmAddress
   * ```
   */
  get contractAddress() {
    return this._data.contractAddress;
  }

  /**
   * @returns the transaction logs
   * @example
   * ```
   * transaction.logs // EvmTransactionLog[]
   * ```
   */
  get logs() {
    return this._data.logs;
  }

  /**
   * @returns the transaction receipt root
   * @example
   * ```
   * transaction.receiptRoot // string
   * ```
   */
  get receiptRoot() {
    return this._data.receiptRoot;
  }

  /**
   * @returns the transaction receipt status
   * @example
   * ```
   * transaction.receiptStatus // 1
   * ```
   */
  get receiptStatus() {
    return this._data.receiptStatus;
  }

  /**
   * @returns the transaction data
   * @example
   * ```
   * transaction.data // 0x000000000000000000000000000000000000000000000000000000000000002
   * ```
   */
  get data() {
    return this._data.data;
  }

  /**
   * @returns the transaction hash
   * @example
   * ```
   * transaction.hash // 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   * ```
   */
  get hash() {
    return this._data.hash;
  }

  /**
   * @returns the transaction black hash
   * @example
   * ```
   * transaction.blockHash // 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
   * ```
   */
  get blockHash() {
    return this._data.blockHash;
  }

  /**
   * @returns the transaction block timestamp
   * @example
   * ```
   * transaction.blockTimestamp // Date
   * ```
   */
  get blockTimestamp() {
    return this._data.blockTimestamp;
  }

  /**
   * @returns the signature (if available)
   * @example
   * ```
   * transaction.signature // EvmSignature
   * ```
   */
  get signature() {
    return this._data.signature;
  }

  /**
   * @returns the index
   * @example
   * ```
   * transaction.index // 1
   * ```
   */
  get index() {
    return this._data.index;
  }

  get v() {
    return this._data.signature?.v;
  }

  get r() {
    return this._data.signature?.r;
  }

  get s() {
    return this._data.signature?.s;
  }
}
