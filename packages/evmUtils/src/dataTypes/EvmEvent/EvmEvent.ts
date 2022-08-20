import { MoralisDataObject, maybe, BigNumber, dateInputToDate } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNative } from '../EvmNative';
import { EvmEventInput, EvmEventData } from './types';

export type EvmEventish = EvmEventInput | EvmEvent;

export class EvmEvent implements MoralisDataObject {
  private _data: EvmEventData;

  constructor(data: EvmEventInput) {
    this._data = EvmEvent.parse(data);
  }

  static parse = (data: EvmEventInput): EvmEventData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    address: EvmAddress.create(data.address),
    blockNumber: BigNumber.create(data.blockNumber),
    blockTimestamp: dateInputToDate(data.blockTimestamp),
    data: {
      from: maybe(data.data.from, EvmAddress.create),
      to: maybe(data.data.to, EvmAddress.create),
      value: maybe(data.data.value, EvmNative.create),
    },
  });

  static create(data: EvmEventish) {
    if (data instanceof EvmEvent) {
      return data;
    }

    return new EvmEvent(data);
  }

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

  equals(data: EvmEventish): boolean {
    return EvmEvent.equals(this, data);
  }

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

  format() {
    return this.toJSON();
  }

  get result() {
    return this._data;
  }
}
