import { MoralisDataObject, MoralisDataObjectValue, CoreErrorCode, MoralisCoreError, maybe } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';

export enum ContractType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

interface EvmNFTInput {
  tokenId: number | string;
  contractType: string;
  chain: EvmChainish;
  tokenUri?: string;
  tokenAddress: EvmAddressish;
  tokenHash?: string;
  metadata?: string;
  name?: string;
  symbol?: string;
}

interface EvmNFTData {
  tokenId: number | string;
  contractType: ContractType;
  chain: EvmChain;
  tokenUri?: string;
  tokenAddress: EvmAddress;
  tokenHash?: string;
  metadata: MoralisDataObjectValue;
  name?: string;
  symbol?: string;
}

export type EvmNFTish = EvmNFTInput | EvmNFT;

/**
 * The EvmNFT class is a MoralisData that references to a the NFT of the type; Erc721 or Erc1155
 */
export class EvmNFT implements MoralisDataObject {
  private _value: EvmNFTData;

  constructor(value: EvmNFTInput) {
    this._value = EvmNFT.parse(value);
  }

  static parse = (value: EvmNFTInput): EvmNFTData => ({
    ...value,
    chain: EvmChain.create(value.chain),
    contractType: this.validateType(value.contractType),
    tokenAddress: EvmAddress.create(value.tokenAddress),
    metadata: maybe(value.metadata, this.validateMetadata),
    tokenUri: maybe(value.tokenUri),
    tokenHash: maybe(value.tokenHash),
    name: maybe(value.name),
    symbol: maybe(value.symbol),
  });

  private static validateType(value: string) {
    switch (value.toUpperCase()) {
      case ContractType.ERC1155:
        return ContractType.ERC1155;
      case ContractType.ERC721:
        return ContractType.ERC721;
      default:
        throw new MoralisCoreError({
          code: CoreErrorCode.INVALID_ARGUMENT,
          message: 'Invalid contract type provided',
        });
    }
  }

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

  static create(value: EvmNFTish) {
    if (value instanceof EvmNFT) {
      return value;
    }

    return new EvmNFT(value);
  }

  static equals(valueA: EvmNFTish, valueB: EvmNFTish) {
    const nftA = EvmNFT.create(valueA);
    const nftB = EvmNFT.create(valueB);

    if (!nftA._value.chain.equals(nftB._value.chain)) {
      return false;
    }

    if (!nftA._value.tokenAddress.equals(nftB._value.tokenAddress)) {
      return false;
    }

    return true;
  }

  equals(value: EvmNFTish): boolean {
    return EvmNFT.equals(this, value);
  }

  toJSON() {
    const value = this._value;
    return {
      ...value,
      tokenAddress: value.tokenAddress.format(),
      chain: value.chain.format(),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._value;
  }
}
