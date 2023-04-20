import Core, { maybe, CoreProvider, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTriggerOutput } from '../StreamTriggerOutput';
import { StreamEvmTransactionLogData, StreamEvmTransactionLogInput, StreamEvmTransactionLogJSON } from './types';

type StreamEvmTransactionLogish = StreamEvmTransactionLog | StreamEvmTransactionLogInput;

/**
 * The StreamEvmTransactionLog class is a representation of a transaction log that is returned by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamEvmTransactionLog implements MoralisDataObject {
  private _data: StreamEvmTransactionLogData;

  constructor({ ...data }: StreamEvmTransactionLogInput, core: Core) {
    this._data = StreamEvmTransactionLog.parse(data, core);
  }

  /**
   * Create a new instance of StreamEvmTransactionLog
   *
   * @param data - the StreamEvmTransactionLogish type
   * @param core - the Core instance
   * @example
   * ```ts
   * const transactionLog = StreamEvmTransactionLog.create(data);
   * ```
   * @returns an instance of StreamEvmTransactionLog
   */
  static create(data: StreamEvmTransactionLogish, core?: Core) {
    if (data instanceof StreamEvmTransactionLog) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new StreamEvmTransactionLog(data, finalCore);
  }

  private static parse(data: StreamEvmTransactionLogInput, core: Core): StreamEvmTransactionLogData {
    return {
      ...data,
      chain: EvmChain.create(data.chain, core),
      logIndex: +data.logIndex,
      address: EvmAddress.create(data.address),
      topic0: maybe(data.topic0),
      topic1: maybe(data.topic1),
      topic2: maybe(data.topic2),
      topic3: maybe(data.topic3),
      triggers: maybe(data.triggers, (triggers) =>
        triggers.map((trigger) => StreamTriggerOutput.create(trigger, core)),
      ),
    };
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

    if (!transactionLogA.chain.equals(transactionLogB.chain)) {
      return false;
    }

    if (transactionLogA.transactionHash !== transactionLogB.transactionHash) {
      return false;
    }

    if (transactionLogA.logIndex !== transactionLogB.logIndex) {
      return false;
    }

    if (
      transactionLogA.triggers?.length !== transactionLogB.triggers?.length ||
      !StreamTriggerOutput.arrayEquals(transactionLogA.triggers || [], transactionLogB.triggers || [])
    ) {
      return false;
    }

    return true;
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

  /**
   * Converts the StreamEvmTransactionLog instance to a JSON object.
   * @returns JSON object of the StreamEvmTransactionLog instance
   * @example `transactionLog.toJSON()`
   */
  toJSON(): StreamEvmTransactionLogJSON {
    const { chain, address, triggers, ...data } = this._data;

    return {
      ...data,
      chain: chain.format(),
      address: address.toJSON(),
      triggers: triggers?.map((trigger) => trigger.format()),
    };
  }

  /**
   * Converts the StreamEvmTransactionLog instance to a JSON object.
   * @returns JSON object of the StreamEvmTransactionLog instance
   * @example `transactionLog.toJSON()`
   */
  format() {
    return this.toJSON();
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

  get triggers() {
    return this._data.triggers;
  }
}
