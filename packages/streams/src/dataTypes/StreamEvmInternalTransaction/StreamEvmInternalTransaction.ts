import MoralisCore, { BigNumber, maybe, MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { EvmAddress, EvmChain } from '@moralisweb3/evm-utils';
import {
  StreamEvmInternalTransactionData,
  StreamEvmInternalTransactionInput,
  StreamEvmInternalTransactionJSON,
} from './types';

export type StreamEvmInternalTransactionish = StreamEvmInternalTransactionInput | StreamEvmInternalTransaction;

/**
 * The StreamEvmInternalTransaction class is representation of the webhook data that is returned from the Stream api
 *
 * @category DataType
 */
export class StreamEvmInternalTransaction implements MoralisDataObject {
  /**
   * Create a new instance of StreamEvmInternalTransaction
   *
   * @param data - the StreamEvmInternalTransactionish type
   * @param core - the MoralisCore instance
   * @example
   * ```ts
   * const evmInternalTransaction = StreamEvmInternalTransaction.create(data);
   * ```
   * @returns an instance of StreamEvmInternalTransaction
   */
  static create(data: StreamEvmInternalTransactionish, core?: MoralisCore) {
    if (data instanceof StreamEvmInternalTransaction) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamEvmInternalTransaction(data, finalCore);
  }

  private _data: StreamEvmInternalTransactionData;

  constructor(data: StreamEvmInternalTransactionInput, core: MoralisCore) {
    this._data = StreamEvmInternalTransaction.parse(data, core);
  }

  static parse = (data: StreamEvmInternalTransactionInput, core: MoralisCore): StreamEvmInternalTransactionData => ({
    ...data,
    chain: EvmChain.create(data.chain, core),
    from: maybe(data.from, (value) => EvmAddress.create(value, core)),
    to: maybe(data.to, (value) => EvmAddress.create(value, core)),
    value: maybe(data.value, (value) => BigNumber.create(value)),
    gas: maybe(data.gas, (value) => BigNumber.create(value)),
  });

  /**
   * Compares two StreamEvmInternalTransaction data. It checks a deep equality check of both values.
   * @param valueA - the first StreamEvmInternalTransactionish data to compare
   * @param valueB - the second StreamEvmInternalTransactionish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamEvmInternalTransaction.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamEvmInternalTransactionish, valueB: StreamEvmInternalTransactionish) {
    const evmInternalTransactionA = StreamEvmInternalTransaction.create(valueA);
    const evmInternalTransactionB = StreamEvmInternalTransaction.create(valueB);

    // Since we have no specific keys to check comparisons for and the result contains many datapoints, we do a
    // deep equality check
    return JSON.stringify(evmInternalTransactionA._data) === JSON.stringify(evmInternalTransactionB._data);
  }

  /**
   * Compares an StreamEvmInternalTransactionish data to this StreamEvmInternalTransaction instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * evmInternalTransaction.equals(value);
   * ```
   */
  equals(value: StreamEvmInternalTransactionish): boolean {
    return StreamEvmInternalTransaction.equals(this, value);
  }

  /**
   * Converts the StreamEvmInternalTransaction instance to a JSON object.
   * @returns JSON object of the StreamEvmInternalTransaction instance
   * @example `evmInternalTransaction.toJSON()`
   */
  toJSON(): StreamEvmInternalTransactionJSON {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      from: data.from?.format(),
      to: data.to?.format(),
      value: data.value?.toString(),
      gas: data.gas?.toString(),
    };
  }

  /**
   * Converts the StreamEvmInternalTransaction instance to a JSON object.
   * @returns JSON object of the StreamEvmInternalTransaction instance
   * @example `evmInternalTransaction.format()`
   */
  format() {
    return this.toJSON();
  }

  get chain() {
    return this._data.chain;
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

  get transactionHash() {
    return this._data.transactionHash;
  }

  get gas() {
    return this._data.gas;
  }
}
