import { BigNumber } from '@ethersproject/bignumber';
import { MoralisDataObject } from '../abstract';
import { EvmAddress } from '../EvmAddress';
import { EvmNative } from '../EvmNative';
import { EvmTransactionLog } from '../EvmTransactionLog';
import { EvmTransactionResponse, EvmTransactionResponseish } from './EvmTransactionResponse';
import { maybe } from '../../utils/maybe';
import { EvmTransactionReceiptData, EvmTransactionReceiptInput } from './EvmTransactionReceiptTypes';

export type EvmTransactionReceiptish = EvmTransactionReceiptInput | EvmTransactionReceipt;
/**
 * The EvmTransaction class is a MoralisData that references a confirmed Evm transaction,
 * that has been sent to the network.
 *
 * @see EvmTransaction for an unpublished transaction that has to be sent to to the network
 * @see EvmTransactionResponse for a published transaction that has been sent to the network
 */
export class EvmTransactionReceipt implements MoralisDataObject {
  private _value: EvmTransactionReceiptData;

  constructor(value: EvmTransactionReceiptInput, transaction: EvmTransactionResponse) {
    this._value = EvmTransactionReceipt.parse(value, transaction);
  }

  static create(value: EvmTransactionReceiptish, transaction: EvmTransactionResponseish): EvmTransactionReceipt {
    if (value instanceof EvmTransactionReceipt) {
      return value;
    }

    return new EvmTransactionReceipt(value, EvmTransactionResponse.create(transaction));
  }

  static parse(value: EvmTransactionReceiptInput, transaction: EvmTransactionResponse): EvmTransactionReceiptData {
    return {
      ...value,
      transactionIndex: value.transactionIndex,

      contractAddress: maybe(value.contractAddress, EvmAddress.create),

      gasUsed: BigNumber.from(value.gasUsed),
      cumulativeGasUsed: BigNumber.from(value.cumulativeGasUsed),
      gasPrice: BigNumber.from(value.gasPrice),

      logs: value.logs?.map((log) => EvmTransactionLog.create(log)),

      root: maybe(value.root),
      status: maybe(value.status),

      transaction,
    };
  }

  get totalGasCost() {
    return EvmNative.create(this._value.cumulativeGasUsed.mul(this._value.gasPrice), 'wei');
  }

  static equals(transactionReceiptA: EvmTransactionReceipt, transactionReceiptB: EvmTransactionReceipt): boolean {
    if (!transactionReceiptA._value.transaction.equals(transactionReceiptB._value.transaction)) {
      return false;
    }

    if (transactionReceiptA._value.status !== transactionReceiptB._value.status) {
      return false;
    }

    return true;
  }

  equals(value: EvmTransactionReceipt): boolean {
    return EvmTransactionReceipt.equals(this, value);
  }

  toJSON() {
    const value = this._value;
    return {
      ...value,

      contractAddress: value.contractAddress?.format(),

      gasUsed: value.gasUsed.toString(),
      cumulativeGasUsed: value.cumulativeGasUsed.toString(),
      gasPrice: value.gasPrice.toString(),

      logs: value.logs?.map((log) => log.toJSON()),

      transaction: value.transaction.toJSON(),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._value;
  }
}
