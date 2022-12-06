import Core, { CoreProvider, maybe, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress } from '@moralisweb3/common-evm-utils';
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

  private static parse = (data: StreamTriggerInput, core: Core): StreamTriggerData => {
    return {
      ...data,
      contractAddress: EvmAddress.create(data.contractAddress, core),
      callFrom: maybe(data.callFrom, (address) => EvmAddress.create(address, core)),
    };
  }

  static equals(valueA: StreamTriggerish, valueB: StreamTriggerish) {
    const streamTriggerA = StreamTrigger.create(valueA);
    const streamTriggerB = StreamTrigger.create(valueB);

    if (streamTriggerA.type !== streamTriggerB.type) {
      return false;
    }

    if (!streamTriggerA.contractAddress.equals(streamTriggerB.contractAddress)) {
      return false;
    }

    if (streamTriggerA.functionAbi !== streamTriggerB.functionAbi) {
      return false;
    }

    if (streamTriggerA.inputs !== streamTriggerB.inputs) {
      return false;
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
      contractAddress: contractAddress.checksum,
      callFrom: callFrom?.format(),
    }
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
