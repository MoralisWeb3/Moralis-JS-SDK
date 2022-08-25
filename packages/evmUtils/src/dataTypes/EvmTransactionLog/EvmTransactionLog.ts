import { maybe, MoralisDataObject } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmTransactionLogData, EvmTransactionLogInput } from './types';

/**
 * This can be any valid {@link EvmTransactionLogInput} or {@link EvmTransactionLog}.
 */
export type EvmTransactionLogish = EvmTransactionLogInput | EvmTransactionLog;

/**
 * The EvmTransactionLog class is a MoralisData that references an EVM transaction log.
 *
 * @category DataType
 */
export class EvmTransactionLog implements MoralisDataObject {
  static create(value: EvmTransactionLogish) {
    if (value instanceof EvmTransactionLog) {
      return value;
    }

    return new EvmTransactionLog(value);
  }

  private _value;

  constructor(value: EvmTransactionLogInput) {
    this._value = EvmTransactionLog.parse(value);
  }

  static parse(value: EvmTransactionLogInput): EvmTransactionLogData {
    return {
      logIndex: maybe(value.logIndex),
      transactionHash: value.transactionHash,
      transactionIndex: maybe(value.transactionIndex),
      data: value.data,
      topics: value.topics,
      blockHash: value.blockHash,
      blockNumber: value.blockNumber,
      blockTimestamp: value.blockTimestamp,
      address: EvmAddress.create(value.address),
    };
  }

  /**
   * Compares the log to another log for equality.
   *
   * @param value - The value to compare with
   * @returns true if the logs are equal, otherwise false
   * @example
   * ```ts
   * log.equals(log);
   * ```
   */
  equals(value: this): boolean {
    return (
      value._value.transactionHash === this._value.transactionHash &&
      value._value.address.equals(this._value.address) &&
      value._value.logIndex === this._value.logIndex
    );
  }

  toJSON() {
    const value = this._value;

    return {
      ...value,
      address: value.address.format(),
    };
  }

  /**
   * Converts the log to a JSON object.
   *
   * @returns the EvmTransactionLog as a JSON object
   * @example
   * ```ts
   * log.format();
   * ```
   */
  format() {
    return this.toJSON();
  }

  /**
   * Returns the processed Erc20Token.
   *
   * @returns the EvmTransactionLog value
   * @example
   * ```ts
   * log.result;
   *  ```
   */
  get result() {
    return this._value;
  }

  /**
   * Returns the transaction hash of the log.
   *
   * @example
   * ```ts
   * log.transactionHash;
   * ```
   */
  get transactionHash() {
    return this._value.transactionHash;
  }

  /**
   * Returns the address of the log.
   *
   * @example
   * ```ts
   * log.address;
   * ```
   */
  get address() {
    return this._value.address;
  }

  /**
   * Returns the log index of the log.
   *
   * @example
   * ```ts
   * log.logIndex;
   * ```
   */
  get logIndex() {
    return this._value.logIndex;
  }

  /**
   * Returns the data of the log.
   *
   * @example
   * ```ts
   * log.data;
   * ```
   */
  get data() {
    return this._value.data;
  }

  /**
   * Returns the topics of the log.
   *
   * @example
   * ```ts
   * log.topics;
   * ```
   */
  get topics() {
    return this._value.topics;
  }

  /**
   * Returns the block hash of the log.
   *
   * @example
   * ```ts
   * log.blockHash;
   * ```
   */
  get blockHash() {
    return this._value.blockHash;
  }

  /**
   * Returns the block number of the log.
   *
   * @example
   * ```ts
   * log.blockNumber;
   * ```
   */
  get blockNumber() {
    return this._value.blockNumber;
  }

  /**
   * Returns the block timestamp of the log.
   *
   * @example
   * ```ts
   * log.blockTimestamp;
   * ```
   */
  get blockTimestamp() {
    return this._value.blockTimestamp;
  }
}
