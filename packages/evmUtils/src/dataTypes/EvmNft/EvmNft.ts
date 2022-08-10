import {
  MoralisDataObject,
  MoralisDataObjectValue,
  CoreErrorCode,
  MoralisCoreError,
  maybe,
  BigNumber,
  dateInputToDate,
} from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { validateValidEvmContractType } from '../EvmNftContractType';
import { EvmNftData, EvmNftInput } from './types';

export type EvmNftish = EvmNftInput | EvmNft;

/**
 * The EvmNft class is a MoralisData that references to a the NFT of the type; Erc721 or Erc1155
 */
export class EvmNft implements MoralisDataObject {
  private _data: EvmNftData;

  constructor(data: EvmNftInput) {
    this._data = EvmNft.parse(data);
  }

  static parse = (data: EvmNftInput): EvmNftData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    contractType: validateValidEvmContractType(data.contractType),
    tokenAddress: EvmAddress.create(data.tokenAddress),
    metadata: maybe(data.metadata, this.validateMetadata),
    tokenUri: maybe(data.tokenUri),
    tokenHash: maybe(data.tokenHash),
    name: maybe(data.name),
    symbol: maybe(data.symbol),
    ownerOf: maybe(data.ownerOf, EvmAddress.create),
    blockNumberMinted: maybe(data.blockNumberMinted, BigNumber.create),
    blockNumber: maybe(data.blockNumber, BigNumber.create),
    lastMetadataSync: maybe(data.lastMetadataSync, dateInputToDate),
    lastTokenUriSync: maybe(data.lastTokenUriSync, dateInputToDate),
    amount: maybe(data.amount, (value) => +value),
  });

  private static validateMetadata = (value: string): MoralisDataObjectValue => {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: 'Invalid metadata provided, cannot parse the value to JSON',
      });
    }
  };

  static create(value: EvmNftish) {
    if (value instanceof EvmNft) {
      return value;
    }

    return new EvmNft(value);
  }

  static equals(valueA: EvmNftish, valueB: EvmNftish) {
    const nftA = EvmNft.create(valueA);
    const nftB = EvmNft.create(valueB);

    if (!nftA._data.chain.equals(nftB._data.chain)) {
      return false;
    }

    if (!nftA._data.tokenAddress.equals(nftB._data.tokenAddress)) {
      return false;
    }

    // Owners are different between tokens
    if (nftA._data.ownerOf && nftB._data.ownerOf && !nftA._data.ownerOf.equals(nftB._data.ownerOf)) {
      return false;
    }

    // Owner is defined in only one token
    if ((nftA._data.ownerOf && !nftB._data.ownerOf) || (!nftA._data.ownerOf && nftB._data.ownerOf)) {
      return false;
    }

    return true;
  }

  equals(value: EvmNftish): boolean {
    return EvmNft.equals(this, value);
  }

  toJSON() {
    const data = this._data;
    return {
      ...data,
      tokenAddress: data.tokenAddress.format(),
      chain: data.chain.format(),
      ownerOf: data.ownerOf?.format(),
      blockNumberMinted: data.blockNumberMinted?.toString(),
      blockNumber: data.blockNumber?.toString(),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._data;
  }
}
