import MoralisCore, { maybe, MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { EvmAddress, EvmChain } from '@moralisweb3/evm-utils';
import { StreamEvmTransactionLogData, StreamEvmTransactionLogInput, StreamEvmTransactionLogJSON } from './types';

type StreamEvmTransactionLogish = StreamEvmTransactionLog | StreamEvmTransactionLogInput;

export class StreamEvmTransactionLog implements MoralisDataObject {
  private _data: StreamEvmTransactionLogData;

  constructor({ ...data }: StreamEvmTransactionLogInput, core: MoralisCore) {
    this._data = StreamEvmTransactionLog.parse(data, core);
  }

  static create(data: StreamEvmTransactionLogish, core?: MoralisCore) {
    if (data instanceof StreamEvmTransactionLog) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamEvmTransactionLog(data, finalCore);
  }

  static parse(data: StreamEvmTransactionLogInput, core: MoralisCore): StreamEvmTransactionLogData {
    return {
      ...data,
      chain: EvmChain.create(data.chain, core),
      logIndex: +data.logIndex,
      address: EvmAddress.create(data.address, core),
      topic0: maybe(data.topic0),
      topic1: maybe(data.topic1),
      topic2: maybe(data.topic2),
      topic3: maybe(data.topic3),
    };
  }

  toJSON(): StreamEvmTransactionLogJSON {
    const { chain, address, ...data } = this._data;

    return {
      ...data,
      chain: chain.format(),
      address: address.format(),
    };
  }

  format() {
    return this.toJSON();
  }

  /**
   * Compares two StreamEvmTransactionLog data. It checks a deep equality check of both values.
   * @param valueA - the first StreamEvmTransactionLogish data to compare
   * @param valueB - the second StreamEvmTransactionLogish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamEvmTransactionLog.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamEvmTransactionLogish, valueB: StreamEvmTransactionLogish) {
    const transactionLogA = StreamEvmTransactionLog.create(valueA);
    const transactionLogB = StreamEvmTransactionLog.create(valueB);

    // Since we have no specific keys to check comparisons for and the result contains many datapoints, we do a
    // deep equality check
    return JSON.stringify(transactionLogA._data) === JSON.stringify(transactionLogB._data);
  }

  /**
   * Compares an StreamEvmTransactionLogish data to this StreamEvmTransactionLog instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * transactionLog.equals(value);
   * ```
   */
  equals(value: StreamEvmTransactionLogish): boolean {
    return StreamEvmTransactionLog.equals(this, value);
  }

  get chain() {
    return this._data.chain;
  }

  get logIndex() {
    return this._data.logIndex;
  }

  get transactionHash() {
    return this._data.transactionHash;
  }

  get address() {
    return this._data.address;
  }

  get data() {
    return this._data.data;
  }

  get topic0() {
    return this._data.topic0;
  }

  get topic1() {
    return this._data.topic1;
  }

  get topic2() {
    return this._data.topic2;
  }

  get topic3() {
    return this._data.topic3;
  }
}
