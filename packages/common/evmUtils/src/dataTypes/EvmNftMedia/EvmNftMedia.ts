import { MoralisDataObject, dateInputToDate, maybe } from '@moralisweb3/common-core';
import { EvmChain } from '../EvmChain';
import { EvmNftMediaInput, EvmNftMediaData } from './types';

/**
 * The EvmNftMedia is a representation of an processed NFT media.
 *
 * @category DataType
 */
export class EvmNftMedia implements MoralisDataObject {
  /**
   * Create a new instance of EvmNftMedia from any valid input
   * @param data -  EvmNftMedia instance or valid EvmNftMediaInput
   * @example
   * ```
   * const media = EvmNftMedia.create(data);
   *```
   */
  static create(data: EvmNftMediaInput) {
    if (data instanceof EvmNftMedia) {
      return data;
    }

    return new EvmNftMedia(data);
  }

  private _data: EvmNftMediaData;

  constructor(data: EvmNftMediaInput) {
    this._data = EvmNftMedia.parse(data);
  }

  static parse = (data: EvmNftMediaInput): EvmNftMediaData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    updatedAt: maybe(data.updatedAt, (date) => dateInputToDate(date)),
  });

  /**
   * Check the equality between two Erc20 medias
   * @param dataA - The first media to compare
   * @param dataB - The second media to compare
   * @example EvmNftMedia.equals(dataA, dataB)
   * @returns true if the medias are equal, false otherwise
   */
  static equals(dataA: EvmNftMedia | EvmNftMediaInput, dataB: EvmNftMedia | EvmNftMediaInput) {
    const mediaA = EvmNftMedia.create(dataA);
    const mediaB = EvmNftMedia.create(dataB);

    if (!mediaA.chain.equals(mediaB.chain)) {
      return false;
    }

    if (mediaA.originalMediaUrl !== mediaB.originalMediaUrl) {
      return false;
    }

    return true;
  }

  /**
   * Checks the equality of the current media with another erc20 media
   * @param data - the media to compare with
   * @example media.equals(data)
   * @returns true if the medias are equal, false otherwise
   */
  equals(data: EvmNftMedia | EvmNftMediaInput): boolean {
    return EvmNftMedia.equals(this, data);
  }

  /**
   * @returns a JSON representation of the media.
   * @example media.toJSON()
   */
  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.toJSON(),
    };
  }

  /**
   * @deprecated This method will be removed soon. To format the value, use one of the properties.
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns all the data without casting it to JSON.
   * @example media.result
   */
  get result() {
    return this._data;
  }

  get chain() {
    return this._data.chain;
  }

  get status() {
    return this._data.status;
  }

  get updatedAt() {
    return this._data.updatedAt;
  }

  get originalMediaUrl() {
    return this._data.originalMediaUrl;
  }

  get category() {
    return this._data.category;
  }

  get mimetype() {
    return this._data.mimetype;
  }

  get parentHash() {
    return this._data.parentHash;
  }

  get mediaCollection() {
    return this._data.mediaCollection;
  }
}
