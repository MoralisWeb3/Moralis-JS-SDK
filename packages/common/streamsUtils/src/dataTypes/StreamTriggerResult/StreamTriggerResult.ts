import Core, { CoreProvider, MoralisDataObject } from '@moralisweb3/common-core';
import { StreamTriggerResultData, StreamTriggerResultInput, StreamTriggerResultJSON } from './types';

export type StreamTriggerResultish = StreamTriggerResult | StreamTriggerResultInput | StreamTriggerResultData;

/**
 * The StreamTrigger class is a representation of a stream trigger that is used by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamTriggerResult implements MoralisDataObject {
  private readonly _data: StreamTriggerResultData;

  constructor(data: StreamTriggerResultInput, core: Core) {
    this._data = StreamTriggerResult.parse(data, core);
  }

  static create(data: StreamTriggerResultish, core?: Core) {
    if (data instanceof StreamTriggerResult) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new StreamTriggerResult(data, finalCore);
  }

  private static parse = (data: StreamTriggerResultInput, _core: Core): StreamTriggerResultData => {
    return {
      ...data,
    };
  };

  /**
   * Compares two StreamTriggerResult data. It checks a deep equality check of both values.
   * @param valueA - the first StreamTriggerResultish data to compare
   * @param valueB - the second StreamTriggerResultish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamTriggerResult.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamTriggerResultish, valueB: StreamTriggerResultish) {
    const streamTriggerResultA = StreamTriggerResult.create(valueA);
    const streamTriggerResultB = StreamTriggerResult.create(valueB);

    return (
      streamTriggerResultA.name === streamTriggerResultB.name &&
      streamTriggerResultA.value === streamTriggerResultB.value
    );
  }

  /**
   * Compares an StreamTriggerResultish data to this StreamTriggerResult instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * streamTriggerResult.equals(value);
   * ```
   */
  equals(value: StreamTriggerResultish) {
    return StreamTriggerResult.equals(this, value);
  }

  /**
   * Converts the StreamTriggerResult instance to a JSON object.
   * @returns JSON object of the StreamTriggerResult instance
   * @example `streamTriggerResult.toJSON()`
   */
  toJSON(): StreamTriggerResultJSON {
    const { ...data } = this._data;
    return {
      ...data,
    };
  }

  /**
   * Converts the StreamTriggerResult instance to a JSON object.
   * @returns JSON object of the StreamTriggerResult instance
   * @example `streamTriggerResult.format()`
   */
  format() {
    return this.toJSON();
  }

  get name() {
    return this._data.name;
  }

  get value() {
    return this._data.value;
  }
}
