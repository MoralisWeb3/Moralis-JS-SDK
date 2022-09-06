import { MoralisDataObject, maybe, dateInputToDate } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNftMetadataInput, EvmNftMetadataData } from './types';

/**
 * This can be an exsisting {@link EvmNftMetadata} or a valid {@link EvmNftMetadataInput}.
 */
export type EvmNftMetadataish = EvmNftMetadataInput | EvmNftMetadata;

/**
 * The EvmNftMetadata contains metadata of an NFT.
 *
 * @category DataType
 */
export class EvmNftMetadata implements MoralisDataObject {
  /**
   *  Create a new instance of EvmNftMetadata from any valid EvmNftMetadata input
   *
   * @param data - the EvmNftMetadataish type
   * @example
   * ```ts
   * const token = EvmNftMetadataish.create(value);
   * ```
   */
  static create(data: EvmNftMetadataish) {
    if (data instanceof EvmNftMetadata) {
      return data;
    }

    return new EvmNftMetadata(data);
  }

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

  /**
   * Compares two EvmNftMetadata instances. This checks if the chain and tokenAddress of both meatdatas are equal.
   *
   * @param dataA - the first EvmNftMetadataish to compare
   * @param dataB - the second EvmNftMetadataish to compare
   * @returns true if the two EvmNftMetadataData are equal
   * @example
   * ```ts
   * EvmNftMetadata.equals(dataA, dataB);
   * ```
   */
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

  /**
   * Compares EvmNftMetadata instance to current instance
   *
   * @param data - the EvmNftMetadataish to compare
   * @returns true if the EvmNftMetadataish is equals given metadata
   * @example
   * ```ts
   * metadata.equals(data);
   * ```
   */
  equals(data: EvmNftMetadataish): boolean {
    return EvmNftMetadata.equals(this, data);
  }

  /**
   * @returns the data as JSON.
   * @example metadata.toJSON();
   */
  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      tokenAddress: data.tokenAddress.format(),
    };
  }

  /**
   * @returns the data as JSON.
   * @example metadata.format();
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns all the data without casting it to JSON.
   * @example metadata.result;
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the name in the metadata.
   * @example metadata.name; // "Baby Ape Mutant Club"
   */
  get name() {
    return this._data.name;
  }

  /**
   * @returns the symbol in the metadata.
   * @example metadata.symbol; // "BAMC"
   */
  get symbol() {
    return this._data.symbol;
  }

  /**
   * @returns the contract type of the NFT.
   * @example metadata.contractType; // "ERC721"
   */
  get contractType() {
    return this._data.contractType;
  }

  /**
   * @returns the chain in the metadata.
   * @example metadata.chain; // EvmChain
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the token address in the metadata.
   * @example metadata.tokenAddress; // EvmAddress
   */
  get tokenAddress() {
    return this._data.tokenAddress;
  }

  /**
   * @returns the date the metadata was synced.
   * @example metadata.syncedAt; // Date
   */
  get syncedAt() {
    return this._data.syncedAt;
  }
}
