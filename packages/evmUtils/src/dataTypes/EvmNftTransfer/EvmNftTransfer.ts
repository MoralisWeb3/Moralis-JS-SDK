import { MoralisDataObject, maybe, BigNumber, dateInputToDate } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNative } from '../EvmNative';
import { EvmNftTransferInput, EvmNftTransferData } from './types';

export type EvmNftTransferish = EvmNftTransferInput | EvmNftTransfer;

export class EvmNftTransfer implements MoralisDataObject {
  private _data: EvmNftTransferData;

  constructor(data: EvmNftTransferInput) {
    this._data = EvmNftTransfer.parse(data);
  }

  static parse = (data: EvmNftTransferInput): EvmNftTransferData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    amount: maybe(data.amount, (amount) => +amount),
    blockNumber: BigNumber.create(data.blockNumber),
    blockTimestamp: dateInputToDate(data.blockTimestamp),
    transactionIndex: maybe(data.transactionIndex, (index) => +index),
    transactionType: maybe(data.transactionType),
    fromAddress: maybe(data.fromAddress, EvmAddress.create),
    toAddress: EvmAddress.create(data.toAddress),
    tokenAddress: EvmAddress.create(data.tokenAddress),
    value: maybe(data.value, EvmNative.create),
    operator: maybe(data.operator, EvmAddress.create),
  });

  static create(data: EvmNftTransferish) {
    if (data instanceof EvmNftTransfer) {
      return data;
    }

    return new EvmNftTransfer(data);
  }

  static equals(dataA: EvmNftTransferish, dataB: EvmNftTransferish) {
    const transferA = EvmNftTransfer.create(dataA);
    const transferB = EvmNftTransfer.create(dataB);

    if (!transferA._data.chain.equals(transferB._data.chain)) {
      return false;
    }

    if (transferA._data.blockHash !== transferB._data.blockHash) {
      return false;
    }

    if (transferA._data.tokenId !== transferB._data.tokenId) {
      return false;
    }

    if (transferA._data.logIndex !== transferB._data.logIndex) {
      return false;
    }

    return true;
  }

  equals(data: EvmNftTransferish): boolean {
    return EvmNftTransfer.equals(this, data);
  }

  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      blockNumber: data.blockNumber.toString(),
      fromAddress: data.fromAddress ? data.fromAddress.format() : undefined,
      toAddress: data.toAddress.format(),
      tokenAddress: data.tokenAddress.format(),
      value: data.value ? data.value.format() : undefined,
      operator: data.operator ? data.operator.format() : undefined,
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._data;
  }
}
