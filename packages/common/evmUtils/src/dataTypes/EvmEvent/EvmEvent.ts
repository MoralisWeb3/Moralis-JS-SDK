import { Core, MoralisDataObject, maybe, BigNumber, dateInputToDate, CoreProvider } from '@moralisweb3/common-core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNative } from '../EvmNative';
import { EvmEventInput, EvmEventData } from './types';

/**
 * Valid input for a new EvmEvent instance.
 * This can be an existing {@link EvmEvent} or a valid {@link EvmEventInput} object
 */
export type EvmEventish = EvmEventInput | EvmEvent;

/**
 * The EvmEvent is a representation of an event.
 *
 * Use this class any time you work with an event.
 *
 * @category DataType
 */
export class EvmEvent implements MoralisDataObject {
  /**
   * Create a new instance of EvmEvent from any valid event input
   * @param data - the EvmEventish type
   * @example
   * ```
   * const event = EvmEventish.create(data);
   *```
   */
  static create(data: EvmEventish, core?: Core) {
    if (data instanceof EvmEvent) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new EvmEvent(EvmEvent.parse(data, finalCore));
  }

  private constructor(private readonly _data: EvmEventData) {}

  static parse = (data: EvmEventInput, core: Core): EvmEventData => ({
    ...data,
    chain: EvmChain.create(data.chain, core),
    address: EvmAddress.create(data.address, core),
    blockNumber: BigNumber.create(data.blockNumber),
    blockTimestamp: dateInputToDate(data.blockTimestamp),
    data: {
      from: maybe(data.data.from, (from) => EvmAddress.create(from, core)),
      to: maybe(data.data.to, (to) => EvmAddress.create(to, core)),
      value: maybe(data.data.value, EvmNative.create),
    },
  });

  /**
   * Check the equality between two Evm events. It checks if the chain, block number, address and data are equal.
   * @param dataA - The first event
   * @param dataB - The second event
   * @example
   * ```ts
   * EvmEvent.equals(dataA, dataB)
   * ```
   * @returns true if the events are equal, false otherwise
   */
  static equals(dataA: EvmEventish, dataB: EvmEventish) {
    const eventA = EvmEvent.create(dataA);
    const eventB = EvmEvent.create(dataB);

    if (!eventA._data.chain.equals(eventB._data.chain)) {
      return false;
    }

    if (!eventA._data.blockNumber.equals(eventB._data.blockNumber)) {
      return false;
    }

    if (!eventA._data.address.equals(eventB._data.address)) {
      return false;
    }

    if (eventA._data.data !== eventB._data.data) {
      return false;
    }

    return true;
  }

  /**
   * Checks the equality of the current event instance with another evm event
   * @param data - the event to compare with
   * @example
   * ```ts
   * event.equals(data)
   * ```
   * @returns true if the events are equal, false otherwise
   */
  equals(data: EvmEventish): boolean {
    return EvmEvent.equals(this, data);
  }

  /**
   * @returns a JSON represention of the event.
   * @example
   * ```
   * event.toJSON()
   * ```
   */
  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      address: data.address.format(),
      blockNumber: data.blockNumber.toString(),
      data: {
        from: data.data.from?.format(),
        to: data.data.to?.format(),
        value: data.data.value?.format(),
      },
    };
  }

  /**
   * @returns a JSON represention of the event.
   * @example event.format()
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns all the data without casting it to JSON.
   * @example event.result
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the event chain
   * @example event.chain // EvmChain
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the event address
   * @example event.address // EvmAddress
   */
  get address() {
    return this._data.address;
  }

  /**
   * @returns the event block number
   * @example event.blockNumber // BigNumber
   */
  get blockNumber() {
    return this._data.blockNumber;
  }

  /**
   * @returns the event block timestamp
   * @example event.blockTimestamp // Date
   */
  get blockTimestamp() {
    return this._data.blockTimestamp;
  }

  /**
   * @returns the event data with from address, to address and value
   * @example event.data
   */
  get data() {
    return this._data.data;
  }

  /**
   * @returns the event block trannsaciton hash
   * @example event.transactionHash // "0xc9f62f4f6ab505a96c1a84ec2899c6bfd86245ef1effaa689fc997798be763d5"
   */
  get transactionHash() {
    return this._data.transactionHash;
  }

  /**
   * @returns the event block hash
   * @example event.blockHash // "0xc9f62f4f6ab505a96c1a84ec2899c6bfd86245ef1effaa689fc997798be763d5"
   */
  get blockHash() {
    return this._data.blockHash;
  }
}
