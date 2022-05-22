import { MoralisDataObject, MoralisDataObjectValue } from '../abstract';
import { EvmAddress, EvmAddressish } from '../EvmAddress';
import { CoreErrorCode, MoralisCoreError } from '../../Error';
import { maybe } from '../utils';

// export type ContractType = 'ERC721' | 'ERC1155';
export enum ContractType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

interface EvmNFTInput {
  tokenId: number | string;
  contractType: string;
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
  tokenUri?: string;
  tokenAddress: EvmAddress;
  tokenHash?: string;
  metadata: MoralisDataObjectValue;
  name?: string;
  symbol?: string;
}

export class EvmNFT implements MoralisDataObject {
  private _value: EvmNFTData;

  constructor(value: EvmNFTInput) {
    this._value = EvmNFT.parse(value);
  }

  static parse = (value: EvmNFTInput): EvmNFTData => ({
    ...value,
    contractType: this.validateType(value.contractType),
    tokenAddress: EvmAddress.create(value.tokenAddress),
    metadata: maybe(value.metadata, JSON.parse),
    tokenUri: maybe(value.tokenUri),
    tokenHash: maybe(value.tokenHash),
    name: maybe(value.name),
    symbol: maybe(value.symbol),
  });

  static validateType(value: string) {
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

  equals(value: this): boolean {
    return value._value.tokenUri === this._value.tokenUri;
  }

  toJSON() {
    const value = this._value;
    return {
      ...value,
      tokenAddress: value.tokenAddress.format(),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._value;
  }
}
