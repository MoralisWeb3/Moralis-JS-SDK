import { MoralisDataObject } from '@moralisweb3/common-core';
import { AptosNetwork } from '@moralisweb3/common-aptos-utils';
import { AptosStreamData, AptosStreamInput, AptosStreamJSON } from './types';

export type AptosStreamish = AptosStreamInput | AptosStream;

/**
 * The AptosStream class is a representation of an Aptos Stream that is returned by the Moralis Stream API
 *
 * @category DataType
 */
export class AptosStream implements MoralisDataObject {
  private _data: AptosStreamData;

  constructor(data: AptosStreamInput) {
    this._data = AptosStream.parse(data);
  }

  /**
   * Create a new instance of AptosStream
   *
   * @param data - the AptosStreamish type
   * @example
   * ```ts
   * const aptosStream = AptosStream.create(data);
   * ```
   * @returns an instance of AptosStream
   */
  static create(data: AptosStreamish) {
    if (data instanceof AptosStream) {
      return data;
    }
    return new AptosStream(data);
  }

  private static parse = (data: AptosStreamInput): AptosStreamData => {
    return {
      ...data,
      network: data.network.map((network) => AptosNetwork.create(network)),
    };
  };

  /**
   * Compares two AptosStream data. It checks a deep equality check of both values.
   * @param valueA - the first AptosStreamish data to compare
   * @param valueB - the second AptosStreamish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  AptosStream.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: AptosStreamish, valueB: AptosStreamish) {
    const aptosStreamA = AptosStream.create(valueA);
    const aptosStreamB = AptosStream.create(valueB);

    if (aptosStreamA.id !== aptosStreamB.id) {
      return false;
    }

    return true;
  }

  /**
   * Compares an AptosStreamish data to this AptosStream instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * aptosStream.equals(value);
   * ```
   */
  equals(value: AptosStreamish): boolean {
    return AptosStream.equals(this, value);
  }

  /**
   * Converts the AptosStream instance to a JSON object.
   * @returns JSON object of the AptosStream instance
   * @example `aptosStream.toJSON()`
   */
  toJSON(): AptosStreamJSON {
    return {
      ...this._data,
      network: this.network.map((network) => network.toJSON()),
    };
  }

  /**
   * Converts the AptosStream instance to a JSON object.
   * @returns JSON object of the AptosStream instance
   * @example `aptosStream.format()`
   */
  format() {
    return this.toJSON();
  }

  get network() {
    return this._data.network;
  }

  get webhookUrl() {
    return this._data.webhookUrl;
  }

  get description() {
    return this._data.description;
  }

  get tag() {
    return this._data.tag;
  }

  get allAddresses() {
    return this._data.allAddresses;
  }

  get id() {
    return this._data.id;
  }

  get status() {
    return this._data.status;
  }

  get statusMessage() {
    return this._data.statusMessage;
  }

  get demo() {
    return this._data.demo;
  }

  get includeChanges() {
    return this._data.includeChanges;
  }

  get includeEvents() {
    return this._data.includeEvents;
  }

  get includePayload() {
    return this._data.includePayload;
  }

  get isErrorSince() {
    return this._data.isErrorSince;
  }

  get events() {
    return this._data.events;
  }

  get functions() {
    return this._data.functions;
  }

  get amountOfAddresses() {
    return this._data.amountOfAddresses;
  }
}
