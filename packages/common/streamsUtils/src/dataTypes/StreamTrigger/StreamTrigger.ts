import Core, { CoreProvider, maybe, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish } from '@moralisweb3/common-evm-utils';
import { StreamSelector, StreamSelectorish } from '../StreamSelector';
import { StreamTriggerData, StreamTriggerInput, StreamTriggerJSON } from './types';

export type StreamTriggerish = StreamTrigger | StreamTriggerInput | StreamTriggerData;

/**
 * The StreamTrigger class is a representation of a stream trigger that is used by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamTrigger implements MoralisDataObject {
  private readonly _data: StreamTriggerData;

  constructor(data: StreamTriggerInput, core: Core) {
    this._data = StreamTrigger.parse(data, core);
  }

  static create(data: StreamTriggerish, core?: Core) {
    if (data instanceof StreamTrigger) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new StreamTrigger(data, finalCore);
  }

  private static parseSelectorOrAddress(input: StreamSelectorish | EvmAddressish, core: Core) {
    let result: StreamSelector | EvmAddress;

    // If it is not an EvmAddress, it can be a string, but only the ones that are selectors should be treated that way
    if (!(input instanceof EvmAddress) && StreamSelector.isSelectorString(input)) {
      result = StreamSelector.create(input);
    } else {
      result = EvmAddress.create(input as EvmAddressish);
    }

    return result;
  }

  private static parse = (data: StreamTriggerInput, core: Core): StreamTriggerData => {
    const { contractAddress: contractAddressInput, callFrom: callFromInput, ...input } = data;

    const contractAddress = StreamTrigger.parseSelectorOrAddress(contractAddressInput, core);
    const callFrom = maybe(callFromInput, (value) => StreamTrigger.parseSelectorOrAddress(value, core));

    return {
      ...input,
      contractAddress,
      callFrom,
    };
  };

  // eslint-disable-next-line complexity
  static equals(valueA: StreamTriggerish, valueB: StreamTriggerish) {
    const streamTriggerA = StreamTrigger.create(valueA);
    const streamTriggerB = StreamTrigger.create(valueB);

    if (streamTriggerA.type !== streamTriggerB.type) {
      return false;
    }

    // contractAddress can be a StreamSelector or an EvmAddress. It is easier to compare them as strings
    if (streamTriggerA.contractAddress.toJSON() !== streamTriggerB.contractAddress.toJSON()) {
      return false;
    }

    if (streamTriggerA.functionAbi !== streamTriggerB.functionAbi) {
      return false;
    }

    if (streamTriggerA.inputs?.length !== streamTriggerB.inputs?.length) {
      return false;
    }

    const triggerInputsA = streamTriggerA.inputs || [];
    const triggerInputsB = streamTriggerB.inputs || [];

    for (let i = 0; i < triggerInputsA?.length; i++) {
      if (triggerInputsA[i] !== triggerInputsB[i]) {
        return false;
      }
    }

    if (streamTriggerA.topic0 !== streamTriggerB.topic0) {
      return false;
    }

    if (streamTriggerA.callFrom !== streamTriggerB.callFrom) {
      return false;
    }

    return true;
  }

  /**
   * Compares two StreamTrigger arrays. It checks a deep equality check of both values, meaning that all the values have to be on both arrays.
   * @param valueA - the first StreamTriggerish[] data to compare
   * @param valueB - the second StreamTriggerish[] data to compare
   * @returns true if all values are equal, false otherwise
   * @example
   * ```ts
   *  StreamTrigger.arrayEquals(valueA, valueB);
   * ```
   */
  static arrayEquals(valueA: StreamTriggerish[], valueB: StreamTriggerish[]) {
    if (valueA.length !== valueB.length) {
      return false;
    }

    const triggersA = valueA.map((trigger) => StreamTrigger.create(trigger));
    const triggersB = valueB.map((trigger) => StreamTrigger.create(trigger));

    const seenTriggersB = Array(triggersB.length).fill(false);
    for (let i = 0; i < triggersA.length; i++) {
      const indexB = triggersB.findIndex((triggerB) => triggerB.equals(triggersA[i]));
      if (indexB < 0) {
        return false;
      }
      seenTriggersB[indexB] = true;
    }
    if (seenTriggersB.some((seen) => !seen)) {
      return false;
    }

    return true;
  }

  /**
   * Compares an StreamTrigger data to this StreamTrigger instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * streamTrigger.equals(value);
   * ```
   */
  equals(value: StreamTriggerish) {
    return StreamTrigger.equals(this, value);
  }

  /**
   * Converts the StreamTrigger instance to a JSON object.
   * @returns JSON object of the StreamTrigger instance
   * @example `streamTrigger.toJSON()`
   */
  toJSON(): StreamTriggerJSON {
    const { contractAddress, callFrom, ...data } = this._data;
    return {
      ...data,
      contractAddress: contractAddress.toJSON(),
      callFrom: callFrom?.toJSON(),
    };
  }

  /**
   * Converts the StreamTrigger instance to a JSON object.
   * @returns JSON object of the StreamTrigger instance
   * @example `streamTrigger.format()`
   */
  format() {
    return this.toJSON();
  }

  get type() {
    return this._data.type;
  }

  get contractAddress() {
    return this._data.contractAddress;
  }

  get functionAbi() {
    return this._data.functionAbi;
  }

  get inputs() {
    return this._data.inputs;
  }

  get topic0() {
    return this._data.topic0;
  }

  get callFrom() {
    return this._data.callFrom;
  }
}
