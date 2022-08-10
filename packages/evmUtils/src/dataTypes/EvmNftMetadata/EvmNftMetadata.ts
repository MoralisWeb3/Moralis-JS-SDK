import { MoralisDataObject, maybe, dateInputToDate } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNftMetadataInput, EvmNftMetadataData } from './types';

export type EvmNftMetadataish = EvmNftMetadataInput | EvmNftMetadata;

export class EvmNftMetadata implements MoralisDataObject {
  private _data: EvmNftMetadataData;

  constructor(data: EvmNftMetadataInput) {
    this._data = EvmNftMetadata.parse(data);
  }

  static parse = (data: EvmNftMetadataInput): EvmNftMetadataData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    tokenAddress: EvmAddress.create(data.tokenAddress),
    syncedAt: maybe(data.syncedAt, dateInputToDate),
  });

  static create(data: EvmNftMetadataish) {
    if (data instanceof EvmNftMetadata) {
      return data;
    }

    return new EvmNftMetadata(data);
  }

  static equals(dataA: EvmNftMetadataish, dataB: EvmNftMetadataish) {
    const metadataA = EvmNftMetadata.create(dataA);
    const metadataB = EvmNftMetadata.create(dataB);

    if (!metadataA._data.chain.equals(metadataB._data.chain)) {
      return false;
    }

    if (!metadataA._data.tokenAddress.equals(metadataB._data.tokenAddress)) {
      return false;
    }

    return true;
  }

  equals(data: EvmNftMetadataish): boolean {
    return EvmNftMetadata.equals(this, data);
  }

  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      tokenAddress: data.tokenAddress.format(),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._data;
  }
}
