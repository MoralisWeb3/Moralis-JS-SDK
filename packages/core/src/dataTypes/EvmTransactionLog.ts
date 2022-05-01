import { MoralisDataObject } from './abstract';
import { EvmAddress, EvmAddressish } from './EvmAddress';

export interface EvmTransactionLogInput {
  logIndex: number;
  transactionHash: string;
  transactionIndex: number;
  address: EvmAddressish;
  data: string;
  topics: string[];
  blockHash: string;
  blockNumber: number;
}

export interface EvmTransactionLogData {
  logIndex: number;
  transactionHash: string;
  transactionIndex: number;
  address: EvmAddress;
  data: string;
  topics: string[];
  blockHash: string;
  blockNumber: number;
}

export class EvmTransactionLog implements MoralisDataObject {
  private _value;

  constructor(value: EvmTransactionLogInput) {
    this._value = EvmTransactionLog.parse(value);
  }

  static parse(value: EvmTransactionLogInput): EvmTransactionLogData {
    return {
      ...value,
      address: EvmAddress.create(value.address),
    };
  }

  static create(value: EvmTransactionLogInput) {
    return new EvmTransactionLog(value);
  }

  equals(value: this): boolean {
    return (
      // TODO also add chain check in here to make sure there is no cross-chain mistake in this check
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
