import { MoralisDataObject } from '@moralisweb3/common-core';
import { StreamTriggerOutputData, StreamTriggerOutputInput, StreamTriggerOutputJSON } from './types';

export type StreamTriggerOutputish = StreamTriggerOutput | StreamTriggerOutputInput | StreamTriggerOutputData;

/**
 * The StreamTrigger class is a representation of a stream trigger that is used by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamTriggerOutput implements MoralisDataObject {
  private readonly _data: StreamTriggerOutputData;

  constructor(data: StreamTriggerOutputInput) {
    this._data = StreamTriggerOutput.parse(data);
  }

  static create(data: StreamTriggerOutputish) {
    if (data instanceof StreamTriggerOutput) {
      return data;
    }
    return new StreamTriggerOutput(data);
  }

  private static parse = (data: StreamTriggerOutputInput): StreamTriggerOutputData => {
    return {
      ...data,
    };
  };

  /**
   * Compares two StreamTriggerOutput data. It checks a deep equality check of both values.
   * @param valueA - the first StreamTriggerOutputish data to compare
   * @param valueB - the second StreamTriggerOutputish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamTriggerOutput.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamTriggerOutputish, valueB: StreamTriggerOutputish) {
    const streamTriggerOutputA = StreamTriggerOutput.create(valueA);
    const streamTriggerOutputB = StreamTriggerOutput.create(valueB);

    return (
      streamTriggerOutputA.name === streamTriggerOutputB.name &&
      streamTriggerOutputA.value === streamTriggerOutputB.value
    );
  }

  /**
   * Compares two StreamTriggerOutput arrays. It checks a deep equality check of both values, meaning that all the values have to be on both arrays.
   * @param valueA - the first StreamTriggerOutputish[] data to compare
   * @param valueB - the second StreamTriggerOutputish[] data to compare
   * @returns true if all values are equal, false otherwise
   * @example
   * ```ts
   *  StreamTriggerOutput.arrayEquals(valueA, valueB);
   * ```
   */
  static arrayEquals(valueA: StreamTriggerOutputish[], valueB: StreamTriggerOutputish[]) {
    if (valueA.length !== valueB.length) {
      return false;
    }

    const triggerOutputsA = valueA.map((triggerOutput) => StreamTriggerOutput.create(triggerOutput));
    const triggerOutputsB = valueB.map((triggerOutput) => StreamTriggerOutput.create(triggerOutput));

    triggerOutputsA.sort((a, b) => (b.name > a.name ? 1 : -1));
    triggerOutputsB.sort((a, b) => (b.name > a.name ? 1 : -1));

    for (let i = 0; i < triggerOutputsA?.length; i++) {
      if (!triggerOutputsA[i].equals(triggerOutputsB[i])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Compares an StreamTriggerOutputish data to this StreamTriggerOutput instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * streamTriggerOutput.equals(value);
   * ```
   */
  equals(value: StreamTriggerOutputish) {
    return StreamTriggerOutput.equals(this, value);
  }

  /**
   * Converts the StreamTriggerOutput instance to a JSON object.
   * @returns JSON object of the StreamTriggerOutput instance
   * @example `streamTriggerOutput.toJSON()`
   */
  toJSON(): StreamTriggerOutputJSON {
    const { ...data } = this._data;
    return {
      ...data,
    };
  }

  /**
   * @deprecated This method will be removed soon. To format the value, use one of the properties.
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
