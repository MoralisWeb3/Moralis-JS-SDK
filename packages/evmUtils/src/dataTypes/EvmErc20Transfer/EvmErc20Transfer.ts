import { MoralisDataObject, BigNumber, dateInputToDate } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmErc20TransferInput, EvmErc20TransferData } from './types';

export type EvmErc20Transferish = EvmErc20TransferInput | EvmErc20Transfer;

export class EvmErc20Transfer implements MoralisDataObject {
  private _data: EvmErc20TransferData;

  constructor(data: EvmErc20TransferInput) {
    this._data = EvmErc20Transfer.parse(data);
  }

  static parse = (data: EvmErc20TransferInput): EvmErc20TransferData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    address: EvmAddress.create(data.address),
    blockTimestamp: dateInputToDate(data.blockTimestamp),
    blockNumber: BigNumber.create(data.blockNumber),
    toAddress: EvmAddress.create(data.toAddress),
    fromAddress: EvmAddress.create(data.fromAddress),
    value: BigNumber.create(data.value),
  });

  static create(data: EvmErc20Transferish) {
    if (data instanceof EvmErc20Transfer) {
      return data;
    }

    return new EvmErc20Transfer(data);
  }

  static equals(dataA: EvmErc20Transferish, dataB: EvmErc20Transferish) {
    const tokenA = EvmErc20Transfer.create(dataA);
    const tokenB = EvmErc20Transfer.create(dataB);

    return JSON.stringify(tokenA.toJSON()) === JSON.stringify(tokenB.toJSON());
  }

  equals(data: EvmErc20Transferish): boolean {
    return EvmErc20Transfer.equals(this, data);
  }

  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      address: data.address.format(),
      blockNumber: data.blockNumber.toString(),
      toAddress: data.toAddress.format(),
      fromAddress: data.fromAddress.format(),
      value: data.value.toString(),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._data;
  }
}
