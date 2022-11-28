import { MoralisDataObject, maybe, BigNumber, dateInputToDate } from '@moralisweb3/common-core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNative } from '../EvmNative';
import { EvmNftTradeInput, EvmNftTradeData } from './types';

/**
 * Valid input for a new EvmNftTrade instance.
 * This can be an existing {@link EvmNftTrade} or a valid {@link EvmNftTradeInput} object
 */
export type EvmNftTradeish = EvmNftTradeInput | EvmNftTrade;

/**
 * The EvmNftTrade is a representation of a published trade.
 *
 * Use this class any time you work with a transaction.
 *
 * @category DataType
 */
export class EvmNftTrade implements MoralisDataObject {
  /**
   * Create a new instance of EvmNftTrade from any valid transaction input
   * @param data - the EvmNftTradeish type
   * @example
   * ```
   * const trade = EvmNftTrade.create(data);
   *```
   */
  static create(data: EvmNftTradeish) {
    if (data instanceof EvmNftTrade) {
      return data;
    }

    return new EvmNftTrade(data);
  }

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
    blockTimestamp: dateInputToDate(data.blockTimestamp),
  });

  /**
   * Check the equality between two Evm trades. It compares the `chain`, `blockNumber`, `transactionIndex` and `transactionHash`
   * @param dataA - The first trade
   * @param dataB - The second trade
   * @example
   * ```ts
   * EvmNftTrade.equals(dataA, dataB)
   * ```
   * @returns true if the trades are equal, false otherwise
   */
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

  /**
   * Checks the equality of the current trade instance with another evm trade
   * @param data - the trade to compare with
   * @example
   * ```ts
   * trade.equals(data)
   * ```
   * @returns true if the trades are equal, false otherwise
   */
  equals(data: EvmNftTradeish): boolean {
    return EvmNftTrade.equals(this, data);
  }

  /**
   * @returns a JSON represention of the trade.
   * @example
   * ```
   * trade.toJSON()
   * ```
   */
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
      blockTimestamp: data.blockTimestamp.toString(),
    };
  }

  /**
   * @returns a JSON represention of the trade.
   * @example
   * ```
   * trade.format()
   * ```
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns all the data without casting it to JSON.
   * @example trade.result
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the trade seller address
   * @example trade.sellerAddress // EvmAddress
   */
  get sellerAddress() {
    return this._data.sellerAddress;
  }

  /**
   * @returns the trade buyer address
   * @example trade.buyerAddress // EvmAddress
   */
  get buyerAddress() {
    return this._data.buyerAddress;
  }

  /**
   * @returns the trade marketplace address
   * @example trade.marketplaceAddress // EvmAddress
   */
  get marketplaceAddress() {
    return this._data.marketplaceAddress;
  }

  /**
   * @returns the trade token address
   * @example trade.tokenAddress // EvmAddress
   */
  get tokenAddress() {
    return this._data.tokenAddress;
  }

  /**
   * @returns the trade price token address
   * @example trade.priceTokenAddress // EvmAddress
   */
  get priceTokenAddress() {
    return this._data.priceTokenAddress;
  }

  /**
   * @returns the trade price
   * @example trade.price // EvmNative
   */
  get price() {
    return this._data.price;
  }

  /**
   * @returns the trade block number
   * @example trade.blockNumber // BigNumber
   */
  get blockNumber() {
    return this._data.blockNumber;
  }

  /**
   * @returns the trade transaction index
   * @example trade.transactionIndex // 164
   */
  get transactionIndex() {
    return this._data.transactionIndex;
  }

  /**
   * @returns the trade transaction hash
   * @example trade.transactionHash // "0x4de0bcef1450492bd5c2e7693cf644c40005868d0dcc8a7a50a80ef2efa88d1e"
   */
  get transactionHash() {
    return this._data.transactionHash;
  }

  /**
   * @returns the trade chain
   * @example trade.chain // EvmChain
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the trade token Ids
   * @example trade.tokenIds // ["16404"]
   */
  get tokenIds() {
    return this._data.tokenIds;
  }

  /**
   * @returns the trade block hash
   * @example trade.blockHash // "0x4de0bcef1450492bd5c2e7693cf644c40005868d0dcc8a7a50a80ef2efa88d1e"
   */
  get blockHash() {
    return this._data.blockHash;
  }

  /**
   * @returns the trade block timestamp
   * @example trade.blockTimestamp // Date
   */
  get blockTimestamp() {
    return this._data.blockTimestamp;
  }
}
