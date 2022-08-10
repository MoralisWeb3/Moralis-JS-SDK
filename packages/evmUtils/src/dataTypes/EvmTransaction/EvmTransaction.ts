import { MoralisDataObject, maybe, BigNumber, dateInputToDate } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNative } from '../EvmNative';
import { EvmTransactionLog } from '../EvmTransactionLog';
import { EvmTransacionInput, EvmTransactionData } from './types';

export type EvmTransactionish = EvmTransacionInput | EvmTransaction;

export class EvmTransaction implements MoralisDataObject {
  private _data: EvmTransactionData;

  constructor(data: EvmTransacionInput) {
    this._data = EvmTransaction.parse(data);
  }

  static parse = (data: EvmTransacionInput): EvmTransactionData => ({
    from: maybe(data.from, EvmAddress.create),
    to: maybe(data.to, EvmAddress.create),
    nonce: maybe(data.nonce, BigNumber.create),
    data: maybe(data.data),
    value: maybe(data.value, (val) => EvmNative.create(val, 'wei')),
    hash: data.hash,

    type: maybe(data.type),
    chain: EvmChain.create(data.chain),

    gas: maybe(data.gas, BigNumber.create),
    gasPrice: BigNumber.create(data.gasPrice),

    index: +data.index,
    blockNumber: BigNumber.create(data.blockNumber),
    blockHash: data.blockHash,
    blockTimestamp: dateInputToDate(data.blockTimestamp),

    cumulativeGasUsed: BigNumber.create(data.cumulativeGasUsed),
    gasUsed: BigNumber.create(data.gasUsed),

    contractAddress: maybe(data.contractAddress, EvmAddress.create),
    receiptRoot: maybe(data.receiptRoot),
    receiptStatus: maybe(data.receiptStatus, (status) => +status),

    logs: (data.logs ?? []).map((log) => EvmTransactionLog.create(log)),
  });

  static create(data: EvmTransactionish) {
    if (data instanceof EvmTransaction) {
      return data;
    }

    return new EvmTransaction(data);
  }

  static equals(dataA: EvmTransactionish, dataB: EvmTransactionish) {
    const transactionA = EvmTransaction.create(dataA);
    const transactionB = EvmTransaction.create(dataB);

    if (!transactionA._data.chain.equals(transactionB._data.chain)) {
      return false;
    }

    if (transactionA._data.hash !== transactionB._data.hash) {
      return false;
    }

    return true;
  }

  equals(data: EvmTransactionish): boolean {
    return EvmTransaction.equals(this, data);
  }

  toJSON() {
    const data = this._data;
    return {
      ...data,
      to: data.to?.format(),
      from: data.from?.format(),
      nonce: data.nonce?.toString(),
      gas: data.gas?.toString(),
      gasPrice: data.gasPrice?.toString(),
      gasUsed: data.gasUsed?.toString(),
      cumulativeGasUsed: data.cumulativeGasUsed?.toString(),
      blockNumber: data.blockNumber?.toString(),
      value: data.value?.toString(),
      chain: data.chain?.format(),
      contractAddress: data.contractAddress?.format(),
      logs: data.logs.map((log) => log.toJSON()),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._data;
  }
}
