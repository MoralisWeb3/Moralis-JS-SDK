import MoralisCore, { maybe, MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmSimpleBlock } from '../EvmBlock';
import { EvmChain } from '../EvmChain';
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
  /**
   * Create a new instance of EvmTransactionLog from any valid address input
   *
   * @example
   * ```
   * const log = EvmTransactionLog.create(value, core);
   * ```
   * @param value - A valid EvmTransactionLogish
   * @param core - The MoralisCore instance
   */
  static create(value: EvmTransactionLogish, core?: MoralisCore) {
    if (value instanceof EvmTransactionLog) {
      return value;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new EvmTransactionLog(value, finalCore);
  }

  private _value;

  constructor(value: EvmTransactionLogInput, core: MoralisCore) {
    this._value = EvmTransactionLog.parse(value, core);
  }

  static parse(value: EvmTransactionLogInput, core: MoralisCore): EvmTransactionLogData {
    return {
      chain: EvmChain.create(value.chain, core),
      logIndex: maybe(value.logIndex, (index) => +index),
      transactionHash: value.transactionHash,
      transactionIndex: maybe(value.transactionIndex),
      data: value.data,
      topic0: maybe(value.topic0),
      topic1: maybe(value.topic1),
      topic2: maybe(value.topic2),
      topic3: maybe(value.topic3),
      address: EvmAddress.create(value.address, core),
      block: maybe(value.block, EvmSimpleBlock.create),
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

  /**
   * Converts the log to a JSON object.
   *
   * @returns the EvmTransactionLog as a JSON object
   * @example
   * ```ts
   * log.toJSON();
   * ```
   */
  toJSON() {
    const value = this._value;

    return {
      ...value,
      address: value.address.format(),
      chain: value.chain.format(),
      block: value.block?.toJSON(),
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
   * @returns the transaction hash of the log.
   *
   * @example
   * ```ts
   * log.transactionHash; // "0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5"
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
   * log.address; // EvmAddress
   * ```
   */
  get address() {
    return this._value.address;
  }

  /**
   * Returns the chain of the log.
   *
   * @example
   * ```ts
   * log.chain; // EvmChain
   * ```
   */
  get chain() {
    return this._value.chain;
  }

  /**
   * @returns the log index of the log.
   *
   * @example
   * ```ts
   * log.logIndex; // 273
   * ```
   */
  get logIndex() {
    return this._value.logIndex;
  }

  /**
   * @returns the data of the log.
   *
   * @example
   * ```ts
   * log.data; // "0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443"
   * ```
   */
  get data() {
    return this._value.data;
  }

  /**
   * @returns the topic0 of the log.
   *
   * @example
   * ```ts
   * log.topic0; // "0x0000000000000000000000000000000000000000000000000000000000000001"
   * ```
   */
  get topic0() {
    return this._value.topic0;
  }

  /**
   * @returns the topic0 of the log.
   *
   * @example
   * ```ts
   * log.topic1; // "0x0000000000000000000000000000000000000000000000000000000000000001"
   * ```
   */
  get topic1() {
    return this._value.topic1;
  }

  /**
   * @returns the topic0 of the log.
   *
   * @example
   * ```ts
   * log.topic2; // "0x0000000000000000000000000000000000000000000000000000000000000001"
   * ```
   */
  get topic2() {
    return this._value.topic2;
  }

  /**
   * @returns the topic0 of the log.
   *
   * @example
   * ```ts
   * log.topic3; // "0x0000000000000000000000000000000000000000000000000000000000000001"
   * ```
   */
  get topic3() {
    return this._value.topic3;
  }

  /**
   * @returns the topics of the log.
   *
   * @example
   * ```ts
   * log.topic0; // ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002"]
   * ```
   */
  get topics() {
    return [this.topic0, this.topic1, this.topic2, this.topic3].filter((topic) => topic !== undefined);
  }

  /**
   * @returns the block of the log.
   *
   * @example
   * ```ts
   * log.block; // <EvmSimpleBlock>
   * ```
   */
  get block() {
    return this._value.block;
  }

  /**
   * @returns the block hash of the log.
   *
   * @example
   * ```ts
   * log.blockHash; // "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171"
   * ```
   */
  get blockHash() {
    return this.block?.hash;
  }

  /**
   * @returns the block number of the log.
   *
   * @example
   * ```ts
   * log.blockNumber; // 12386788
   * ```
   */
  get blockNumber() {
    return this.block?.number;
  }

  /**
   * @returns the block timestamp of the log.
   *
   * @example
   * ```ts
   * log.blockTimestamp; // "2021-05-07T11:08:35.000Z"
   * ```
   */
  get blockTimestamp() {
    return this.block?.timestamp;
  }
}
