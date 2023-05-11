import { BigNumber, maybe, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTriggerOutput } from '../StreamTriggerOutput';
import {
  StreamEvmInternalTransactionData,
  StreamEvmInternalTransactionInput,
  StreamEvmInternalTransactionJSON,
} from './types';

export type StreamEvmInternalTransactionish = StreamEvmInternalTransactionInput | StreamEvmInternalTransaction;

/**
 * The StreamEvmInternalTransaction class is a representation of an internal transaction that is returned by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamEvmInternalTransaction implements MoralisDataObject {
  private _data: StreamEvmInternalTransactionData;

  constructor(data: StreamEvmInternalTransactionInput) {
    this._data = StreamEvmInternalTransaction.parse(data);
  }

  /**
   * Create a new instance of StreamEvmInternalTransactionish
   *
   * @param data - the StreamEvmInternalTransactionishish type
   * @example
   * ```ts
   * const transaction = StreamEvmTransactionish.create(data);
   * ```
   * @returns an instance of StreamEvmInternalTransaction
   */
  static create(data: StreamEvmInternalTransactionish) {
    if (data instanceof StreamEvmInternalTransaction) {
      return data;
    }
    return new StreamEvmInternalTransaction(data);
  }

  private static parse = (data: StreamEvmInternalTransactionInput): StreamEvmInternalTransactionData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    from: maybe(data.from, (value) => EvmAddress.create(value)),
    to: maybe(data.to, (value) => EvmAddress.create(value)),
    value: maybe(data.value, (value) => BigNumber.create(value)),
    gas: maybe(data.gas, (value) => BigNumber.create(value)),
    triggers: maybe(data.triggers, (triggers) => triggers.map((trigger) => StreamTriggerOutput.create(trigger))),
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

    if (!evmInternalTransactionA.chain.equals(evmInternalTransactionB.chain)) {
      return false;
    }

    if (evmInternalTransactionA.transactionHash !== evmInternalTransactionB.transactionHash) {
      return false;
    }

    if (
      evmInternalTransactionA.triggers?.length !== evmInternalTransactionB.triggers?.length ||
      !StreamTriggerOutput.arrayEquals(evmInternalTransactionA.triggers || [], evmInternalTransactionB.triggers || [])
    ) {
      return false;
    }

    return true;
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
      chain: data.chain.toJSON(),
      from: data.from?.toJSON(),
      to: data.to?.toJSON(),
      value: data.value?.toString(),
      gas: data.gas?.toString(),
      triggers: data.triggers?.map((trigger) => trigger.format()),
    };
  }

  /**
   * @deprecated This method will be removed soon. To format the value, use one of the properties.
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

  get triggers() {
    return this._data.triggers;
  }
}
