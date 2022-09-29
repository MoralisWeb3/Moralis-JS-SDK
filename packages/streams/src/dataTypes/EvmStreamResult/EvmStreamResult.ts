import MoralisCore, { MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { EvmStreamResultFormatter } from './EvmStreamResultFormatter';
import { EvmStreamResultParser } from './EvmStreamResultParser';
import { EvmStreamResultData, EvmStreamResultInput } from './types';

export type EvmStreamResultish = EvmStreamResultInput | EvmStreamResult;

/**
 * The EvmStreamResult class is representation of the webhook data that is returned from the Stream api
 *
 * @category DataType
 */
export class EvmStreamResult implements MoralisDataObject {
  /**
   * Create a new instance of EvmStreamResult
   *
   * @param data - the EvmStreamResultish type
   * @param core - the MoralisCore instance
   * @example
   * ```ts
   * const evmStreamResult = EvmStreamResult.create(data);
   * ```
   * @returns an instance of EvmStreamResult
   */
  static create(data: EvmStreamResultish, core?: MoralisCore) {
    if (data instanceof EvmStreamResult) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new EvmStreamResult(data, finalCore);
  }

  private _data: EvmStreamResultData;

  constructor(data: EvmStreamResultInput, core: MoralisCore) {
    this._data = EvmStreamResult.parse(data, core);
  }

  static parse = (data: EvmStreamResultInput, core: MoralisCore): EvmStreamResultData =>
    EvmStreamResultParser.parse(data, core);

  /**
   * Compares two EvmStreamResult data. It checks a deep equality check of both values.
   * @param valueA - the first EvmStreamResultish data to compare
   * @param valueB - the second EvmStreamResultish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  EvmStreamResult.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: EvmStreamResultish, valueB: EvmStreamResultish) {
    const evmStreamResultA = EvmStreamResult.create(valueA);
    const evmStreamResultB = EvmStreamResult.create(valueB);

    // Since we have no specific keys to check comparisons for and the result contains many datapoints, we do a
    // deep equality check
    return JSON.stringify(evmStreamResultA._data) === JSON.stringify(evmStreamResultB._data);
  }

  /**
   * Compares an EvmStreamResultish data to this EvmStreamResult instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * evmStreamResult.equals(value);
   * ```
   */
  equals(value: EvmStreamResultish): boolean {
    return EvmStreamResult.equals(this, value);
  }

  /**
   * Converts the EvmStreamResult instance to a JSON object.
   * @returns JSON object of the EvmStreamResult instance
   * @example `evmStreamResult.toJSON()`
   */
  toJSON() {
    return EvmStreamResultFormatter.toJSON(this._data);
  }

  /**
   * Converts the EvmStreamResult instance to a JSON object.
   * @returns JSON object of the EvmStreamResult instance
   * @example `evmStreamResult.format()`
   */
  format() {
    return this.toJSON();
  }
}
