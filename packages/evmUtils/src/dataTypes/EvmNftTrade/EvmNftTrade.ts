import { MoralisDataObject, maybe, BigNumber } from '@moralisweb3/core';
import { EvmAddress, EvmChain, EvmNative } from '@moralisweb3/evm-utils';
import { EvmNftTradeInput, EvmNftTradeData } from './types';

export type EvmNftTradeish = EvmNftTradeInput | EvmNftTrade;

export class EvmNftTrade implements MoralisDataObject {
  private _data: EvmNftTradeData;

  constructor(data: EvmNftTradeInput) {
    this._data = EvmNftTrade.parse(data);
  }

  static parse = (data: EvmNftTradeInput): EvmNftTradeData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    sellerAddress: EvmAddress.create(data.sellerAddress),
    buyerAddress: EvmAddress.create(data.buyerAddress),
    marketplaceAddress: EvmAddress.create(data.marketplaceAddress),
    tokenAddress: EvmAddress.create(data.tokenAddress),
    priceTokenAddress: maybe(data.priceTokenAddress, EvmAddress.create),
    blockNumber: BigNumber.create(data.blockNumber),
    price: EvmNative.create(data.price),
    transactionIndex: +data.transactionIndex,
  });

  static create(data: EvmNftTradeish) {
    if (data instanceof EvmNftTrade) {
      return data;
    }

    return new EvmNftTrade(data);
  }

  static equals(dataA: EvmNftTradeish, dataB: EvmNftTradeish) {
    const transactionA = EvmNftTrade.create(dataA);
    const transactionB = EvmNftTrade.create(dataB);

    if (!transactionA._data.chain.equals(transactionB._data.chain)) {
      return false;
    }

    if (!transactionA._data.blockNumber.equals(transactionB._data.blockNumber)) {
      return false;
    }

    if (transactionA._data.transactionHash !== transactionB._data.transactionHash) {
      return false;
    }
    if (transactionA._data.transactionIndex !== transactionB._data.transactionIndex) {
      return false;
    }

    return true;
  }

  equals(data: EvmNftTradeish): boolean {
    return EvmNftTrade.equals(this, data);
  }

  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      sellerAddress: data.sellerAddress.format(),
      buyerAddress: data.buyerAddress.format(),
      marketplaceAddress: data.marketplaceAddress.format(),
      tokenAddress: data.tokenAddress.format(),
      priceTokenAddress: data.priceTokenAddress ? data.priceTokenAddress.format() : undefined,
      blockNumber: data.blockNumber.toString(),
      price: data.price.toString(),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._data;
  }
}
