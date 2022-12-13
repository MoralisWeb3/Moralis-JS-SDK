import Core, { CoreProvider, MoralisDataObject } from '@moralisweb3/common-core';
import { StreamTriggerOutputData, StreamTriggerOutputInput, StreamTriggerOutputJSON } from './types';

export type StreamTriggerOutputish = StreamTriggerOutput | StreamTriggerOutputInput | StreamTriggerOutputData;

/**
 * The StreamTrigger class is a representation of a stream trigger that is used by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamTriggerOutput implements MoralisDataObject {
  private readonly _data: StreamTriggerOutputData;

  constructor(data: StreamTriggerOutputInput, core: Core) {
    this._data = StreamTriggerOutput.parse(data, core);
  }

  static create(data: StreamTriggerOutputish, core?: Core) {
    if (data instanceof StreamTriggerOutput) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new StreamTriggerOutput(data, finalCore);
  }

  private static parse = (data: StreamTriggerOutputInput, _core: Core): StreamTriggerOutputData => {
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
   * @param triggerOutputishA - the first StreamTriggerOutputish[] data to compare
   * @param triggerOutputishB - the second StreamTriggerOutputish[] data to compare
   * @returns true if all values are equal, false otherwise
   * @example
   * ```ts
   *  StreamTriggerOutput.arrayEquals(valueA, valueB);
   * ```
   */
  static arrayEquals(triggerOutputishA: StreamTriggerOutputish[], triggerOutputishB: StreamTriggerOutputish[]) {
    if (triggerOutputishA.length !== triggerOutputishB.length) {
      return false;
    }

    const triggerOutputsA = triggerOutputishA.map((triggerOutput) => StreamTriggerOutput.create(triggerOutput));
    const triggerOutputsB = triggerOutputishB.map((triggerOutput) => StreamTriggerOutput.create(triggerOutput));

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
   * Converts the StreamTriggerOutput instance to a JSON object.
   * @returns JSON object of the StreamTriggerOutput instance
   * @example `streamTriggerOutput.format()`
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
