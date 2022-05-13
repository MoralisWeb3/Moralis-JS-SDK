import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { MoralisDataObject } from './abstract';
import { EvmAddress, EvmAddressish } from './EvmAddress';
import { EvmNative } from './EvmNative';
import { EvmTransactionLog, EvmTransactionLogInput } from './EvmTransactionLog';
import { EvmTransactionResponse, EvmTransactionResponseInput } from './EvmTransactionResponse';
import { maybe } from './utils';

export interface EvmTransactionReceiptInput {
  to: EvmAddressish;
  from: EvmAddressish;
  contractAddress?: null | EvmAddressish;
  transactionIndex: number;

  gasUsed: BigNumberish;
  cumulativeGasUsed: BigNumberish;
  gasPrice: BigNumberish;
  gas?: BigNumberish;

  logs: EvmTransactionLogInput[];

  root?: null | string;
  status?: null | number;

  blockHash?: null | string;
  blockNumber?: null | number;
  input?: null | string;
}

export interface EvmTransactionReceiptData {
  to: EvmAddress;
  from: EvmAddress;
  contractAddress?: EvmAddress;
  transactionIndex: number;

  gasUsed: BigNumber;
  cumulativeGasUsed: BigNumber;
  gasPrice: BigNumber;
  gas?: BigNumberish;

  logs: EvmTransactionLog[];

  root?: string;
  status?: number;

  transaction: EvmTransactionResponse;

  blockHash?: null | string;
  blockNumber?: null | number;
  input?: null | string;
}

export class EvmTransactionReceipt implements MoralisDataObject {
  private _value: EvmTransactionReceiptData;

  constructor(value: EvmTransactionReceiptInput, transaction: EvmTransactionResponse) {
    this._value = EvmTransactionReceipt.parse(value, transaction);
  }

  static create(
    value: EvmTransactionReceiptInput | EvmTransactionReceipt,
    transaction?: EvmTransactionResponse | EvmTransactionResponseInput,
  ): EvmTransactionReceipt {
    if (value instanceof EvmTransactionReceipt) {
      return value;
    }

    if (!transaction) {
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: 'Can only create EvmTransactionReceipt with a valid EvmTransactionResponse as second argument',
      });
    }

    return new EvmTransactionReceipt(value, EvmTransactionResponse.create(transaction));
  }

  static validate(value: EvmTransactionReceiptInput) {
    return true;
  }

  static parse(value: EvmTransactionReceiptInput, transaction: EvmTransactionResponse): EvmTransactionReceiptData {
    EvmTransactionReceipt.validate(value);

    return {
      ...value,
      from: EvmAddress.create(value.from),
      to: EvmAddress.create(value.to),
      transactionIndex: value.transactionIndex,

      contractAddress: maybe(value.contractAddress, EvmAddress.create),

      gasUsed: BigNumber.from(value.gasUsed),
      gas: maybe(value.gas, BigNumber.from),
      cumulativeGasUsed: BigNumber.from(value.cumulativeGasUsed),
      gasPrice: BigNumber.from(value.gasPrice),

      logs: value.logs.map((log) => EvmTransactionLog.create(log)),

      root: maybe(value.root),
      status: maybe(value.status),

      transaction,
    };
  }

  get totalGasCost() {
    return EvmNative.create(this._value.cumulativeGasUsed.mul(this._value.gasPrice), 'wei');
  }

  equals(value: this): boolean {
    return JSON.stringify(this.toJSON()) === JSON.stringify(value.toJSON());
  }

  toJSON() {
    const value = this._value;
    return {
      ...value,

      contractAddress: value.contractAddress?.format(),

      gasUsed: value.gasUsed.toString(),
      gas: value.gas?.toString(),
      cumulativeGasUsed: value.cumulativeGasUsed.toString(),
      gasPrice: value.gasPrice.toString(),

      logs: value.logs.map((log) => log.toJSON()),

      transaction: value.transaction.toJSON(),

      from: value.from.format(),
      to: value.to.format(),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._value;
  }
}
