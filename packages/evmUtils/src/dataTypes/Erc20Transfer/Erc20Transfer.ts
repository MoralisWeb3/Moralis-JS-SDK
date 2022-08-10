import { MoralisDataObject, BigNumber, dateInputToDate } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { Erc20TransferInput, Erc20TransferData } from './types';

export type Erc20Transferish = Erc20TransferInput | Erc20Transfer;

export class Erc20Transfer implements MoralisDataObject {
  private _data: Erc20TransferData;

  constructor(data: Erc20TransferInput) {
    this._data = Erc20Transfer.parse(data);
  }

  static parse = (data: Erc20TransferInput): Erc20TransferData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    address: EvmAddress.create(data.address),
    blockTimestamp: dateInputToDate(data.blockTimestamp),
    blockNumber: BigNumber.create(data.blockNumber),
    toAddress: EvmAddress.create(data.toAddress),
    fromAddress: EvmAddress.create(data.fromAddress),
    value: BigNumber.create(data.value),
  });

  get address() {
    return this._data.address;
  }
  get blockHash() {
    return this._data.blockHash;
  }
  get blockNumber() {
    return this._data.blockNumber;
  }
  get blockTimestamp() {
    return this._data.blockTimestamp;
  }
  get chain() {
    return this._data.chain;
  }
  get fromAddress() {
    return this._data.fromAddress;
  }
  get toAddress() {
    return this._data.toAddress;
  }
  get transactionHash() {
    return this._data.transactionHash;
  }
  get value() {
    return this._data.value;
  }

  static create(data: Erc20Transferish) {
    if (data instanceof Erc20Transfer) {
      return data;
    }

    return new Erc20Transfer(data);
  }

  static equals(dataA: Erc20Transferish, dataB: Erc20Transferish) {
    const tokenA = Erc20Transfer.create(dataA);
    const tokenB = Erc20Transfer.create(dataB);

    return JSON.stringify(tokenA.toJSON()) === JSON.stringify(tokenB.toJSON());
  }

  equals(data: Erc20Transferish): boolean {
    return Erc20Transfer.equals(this, data);
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
