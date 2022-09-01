import MoralisCore, { maybe, MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmTransactionLogData, EvmTransactionLogInput } from './types';

export type EvmTransactionLogish = EvmTransactionLogInput | EvmTransactionLog;

export class EvmTransactionLog implements MoralisDataObject {
  private _value;

  constructor(value: EvmTransactionLogInput, core: MoralisCore) {
    this._value = EvmTransactionLog.parse(value, core);
  }

  static parse(value: EvmTransactionLogInput, core: MoralisCore): EvmTransactionLogData {
    return {
      logIndex: maybe(value.logIndex),
      transactionHash: value.transactionHash,
      transactionIndex: maybe(value.transactionIndex),
      data: value.data,
      topics: value.topics,
      blockHash: value.blockHash,
      blockNumber: value.blockNumber,
      blockTimestamp: value.blockTimestamp,
      address: EvmAddress.create(value.address, core),
    };
  }

  static create(value: EvmTransactionLogish, core?: MoralisCore) {
    if (value instanceof EvmTransactionLog) {
      return value;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new EvmTransactionLog(value, finalCore);
  }

  equals(value: this): boolean {
    return (
      value._value.transactionHash === this._value.transactionHash &&
      value._value.address.equals(this._value.address) &&
      value._value.logIndex === this._value.logIndex
    );
  }

  toJSON() {
    const value = this._value;

    return {
      ...value,
      address: value.address.format(),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._value;
  }
}
