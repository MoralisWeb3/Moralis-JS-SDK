import MoralisCore, { MoralisDataObject, MoralisCoreProvider } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { validateValidEvmContractType } from '../EvmNftContractType';
import { EvmNftCollectionData, EvmNftCollectionInput } from './types';

/**
 * Valid input for a new EvmNftCollection instance.
 * This can be an existing {@link EvmNftCollection} or a valid {@link EvmNftCollectionInput} object
 */
export type EvmNftCollectionish = EvmNftCollectionInput | EvmNftCollection;

/**
 * The EvmNftCollection is a representation of an nft collection.
 *
 * @category DataType
 */
export class EvmNftCollection implements MoralisDataObject {
  /**
   * Create a new instance of EvmNftCollection from any valid transaction input
   * @param data - the EvmNftCollectionish type
   * @example const collection = EvmTransaction.create(data);
   */
  static create(data: EvmNftCollectionish, core?: MoralisCore) {
    if (data instanceof EvmNftCollection) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new EvmNftCollection(data, finalCore);
  }

  private _data: EvmNftCollectionData;

  constructor(data: EvmNftCollectionInput, core: MoralisCore) {
    this._data = EvmNftCollection.parse(data, core);
  }

  static parse = (data: EvmNftCollectionInput, core: MoralisCore): EvmNftCollectionData => ({
    ...data,
    tokenAddress: EvmAddress.create(data.tokenAddress, core),
    chain: EvmChain.create(data.chain, core),
    contractType: validateValidEvmContractType(data.contractType)
  });

  /**
   * Check the equality between two Evm collections. It compares their hashes and collections.
   * @param dataA - The first collection to compare
   * @param dataB - The second collection to compare
   * @example EvmNftCollection.equals(dataA, dataB)
   */
  static equals(dataA: EvmNftCollectionish, dataB: EvmNftCollectionish) {
    const collectionA = EvmNftCollection.create(dataA);
    const collectionB = EvmNftCollection.create(dataB);

    if (!collectionA.chain.equals(collectionB.chain)) {
      return false;
    }

    if (!collectionA.tokenAddress.equals(collectionB.tokenAddress)) {
      return false;
    }

    return true;
  }

  /**
   * Checks the equality of the current collection with another evm collection
   * @param data - the collection to compare with
   * @example
   * ```ts
   * collection.equals(data)
   * ```
   */
  equals(data: EvmNftCollectionish): boolean {
    return EvmNftCollection.equals(this, data);
  }

  /**
   * @returns a JSON represention of the collection.
   * @example
   * ```
   * collection.toJSON()
   * ```
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
   * @returns a JSON represention of the collection.
   * @example
   * ```
   * collection.format()
   * ```
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns all the data without casting it to JSON.
   * @example collection.result
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the chain where the collection is deployed.
   * @example collection.chain // EvmChain
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the token address of collection.
   * @example collection.tokenAddress // EvmAddress
   */
  get tokenAddress() {
    return this._data.tokenAddress;
  }

  /**
   * @returns the token type of collection.
   * @example collection.tokenAddress // 'ERC721'
   */
  get contractType() {
    return this._data.contractType;
  }

  /**
   * @returns the token name of collection.
   * @example collection.tokenAddress // 'Test NFT'
   */
  get name() {
    return this._data.name;
  }

  /**
   * @returns the token symbol of collection.
   * @example collection.symbol // 'TEST'
   */
  get symbol() {
    return this._data.symbol;
  }
}
