import Core, { MoralisDataObject, BigNumber, CoreProvider } from '@moralisweb3/common-core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmInternalTransactionInput, EvmInternalTransactionData } from './types';

/**
 * Valid input for a new EvmInternalTransaction instance.
 * This can be an existing {@link EvmInternalTransaction} or a valid {@link EvmInternalTransactionInput} object
 */
export type EvmInternalTransactionish = EvmInternalTransactionInput | EvmInternalTransaction;

/**
 * The EvmTranaction is a representation of a published transaction.
 *
 * Use this class any time you work with a transaction.
 *
 * @category DataType
 */
export class EvmInternalTransaction implements MoralisDataObject {
  /**
   * Create a new instance of EvmInternalTransaction from any valid transaction input
   * @param data - the EvmInternalTransactionish type
   * @example
   * ```
   * const transaction = EvmInternalTransaction.create(data);
   *```
   */
  static create(data: EvmInternalTransactionish, core?: Core) {
    if (data instanceof EvmInternalTransaction) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new EvmInternalTransaction(data, finalCore);
  }

  private _data: EvmInternalTransactionData;

  constructor(data: EvmInternalTransactionInput, core: Core) {
    this._data = EvmInternalTransaction.parse(data, core);
  }

  static parse = (data: EvmInternalTransactionInput, core: Core): EvmInternalTransactionData => ({
    chain: EvmChain.create(data.chain),
    from: EvmAddress.create(data.from, core),
    to: EvmAddress.create(data.to, core),
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

    if (!transactionA._data.chain.equals(transactionB._data.chain)) {
      return false;
    }

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

  toJSON() {
    const data = this._data;
    return {
      ...data,
      to: data.to?.format(),
      from: data.from?.format(),
      gas: data.gas?.toString(),
      gasUsed: data.gasUsed?.toString(),
      value: data.value?.toString(),
      chain: data.chain?.format(),
      blockNumber: data.blockNumber?.toString(),
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

  get result() {
    return this._data;
  }

  get chain() {
    return this._data.chain;
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
