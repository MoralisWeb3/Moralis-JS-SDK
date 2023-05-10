import { MoralisDataObject, BigNumber, dateInputToDate } from '@moralisweb3/common-core';
import { EvmChain } from '../EvmChain';
import { EvmBlockish } from './EvmBlock';
import { EvmSimpleBlockInput, EvmSimpleBlockData } from './types';

/**
 * Valid input for a new EvmSimpleBlock instance.
 * This can be an existing {@link EvmSimpleBlock} or a valid {@link EvmSimpleBlockInput} object
 */
export type EvmSimpleBlockish = EvmSimpleBlockInput | EvmSimpleBlock;

/**
 * The EvmSimpleBlock is a representation of a block.
 *
 * @category DataType
 */
export class EvmSimpleBlock implements MoralisDataObject {
  /**
   * Create a new instance of EvmSimpleBlock from any valid transaction input
   * @param data - the EvmSimpleBlockish type
   * @example const transaction = EvmSimpleBlock.create(data);
   */
  static create(data: EvmSimpleBlockish) {
    if (data instanceof EvmSimpleBlock) {
      return data;
    }
    return new EvmSimpleBlock(data);
  }

  private _data: EvmSimpleBlockData;

  constructor(data: EvmSimpleBlockInput) {
    this._data = EvmSimpleBlock.parse(data);
  }

  static parse = (data: EvmSimpleBlockInput): EvmSimpleBlockData => ({
    timestamp: dateInputToDate(data.timestamp),
    number: BigNumber.create(data.number),
    chain: EvmChain.create(data.chain),
    hash: data.hash,
  });

  /**
   * Check the equality between two Evm blocks. It compares their hashes and blocks.
   * @param dataA - The first block to compare
   * @param dataB - The second block to compare
   * @example EvmSimpleBlock.equals(dataA, dataB)
   */
  static equals(dataA: EvmSimpleBlockish | EvmBlockish, dataB: EvmSimpleBlockish | EvmBlockish) {
    const blockA = EvmSimpleBlock.create(dataA);
    const blockB = EvmSimpleBlock.create(dataB);

    if (!blockA.chain.equals(blockB.chain)) {
      return false;
    }

    if (blockA.hash !== blockB.hash) {
      return false;
    }

    if (!blockA.number.equals(blockB.number)) {
      return false;
    }

    return true;
  }

  /**
   * Checks the equality of the current block with another evm block
   * @param data - the block to compare with
   * @example
   * ```ts
   * block.equals(data)
   * ```
   */
  equals(data: EvmSimpleBlockish): boolean {
    return EvmSimpleBlock.equals(this, data);
  }

  /**
   * @returns a JSON represention of the block.
   * @example
   * ```
   * block.toJSON()
   * ```
   */
  toJSON() {
    const data = this._data;
    return {
      ...data,
      number: data.number.toString(),
      chain: data.chain.toJSON(),
    };
  }

  /**
   * @deprecated This method will be removed soon. To format the value, use one of the properties.
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns all the data without casting it to JSON.
   * @example block.result
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the block number.
   * @example block.number // BigNumber
   */
  get number() {
    return this._data.number;
  }

  /**
   * @returns the block hash.
   * @example block.hash // "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171"
   */
  get hash() {
    return this._data.hash;
  }

  /**
   * @returns the block timestamp.
   * @example block.timestamp // Date
   */
  get timestamp() {
    return this._data.timestamp;
  }

  /**
   * @returns the block chain.
   * @example block.chain // EvmChain
   */
  get chain() {
    return this._data.chain;
  }
}
