import Core, { MoralisDataObject, BigNumber, dateInputToDate, CoreProvider } from '@moralisweb3/common-core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { Erc20MintInput, Erc20MintData } from './types';

/**
 * The Erc20Mint is a representation of an Erc20 token mint.
 *
 * @category DataType
 */
export class Erc20Mint implements MoralisDataObject {
  /**
   * Create a new instance of Erc20Mint from any valid input
   * @param data -  Erc20Mint instance or valid Erc20MintInput
   * @example
   * ```
   * const mint = Erc20Mint.create(data);
   *```
   */
  static create(data: Erc20Mint | Erc20MintInput, core?: Core) {
    if (data instanceof Erc20Mint) {
      return data;
    }

    const finalCore = core ?? CoreProvider.getDefault();
    return new Erc20Mint(data, finalCore);
  }

  private _data: Erc20MintData;

  constructor(data: Erc20MintInput, core: Core) {
    this._data = Erc20Mint.parse(data, core);
  }

  static parse = (data: Erc20MintInput, core: Core): Erc20MintData => ({
    ...data,
    chain: EvmChain.create(data.chain, core),
    contractAddress: EvmAddress.create(data.contractAddress, core),
    toWallet: EvmAddress.create(data.toWallet, core),
    blockTimestamp: dateInputToDate(data.blockTimestamp),
    blockNumber: BigNumber.create(data.blockNumber),
    value: BigNumber.create(data.value),
    transactionIndex: Number(data.transactionIndex),
    logIndex: Number(data.logIndex),
  });

  /**
   * Check the equality between two Erc20 mints
   * @param dataA - The first mint to compare
   * @param dataB - The second mint to compare
   * @example Erc20Mint.equals(dataA, dataB)
   * @returns true if the mints are equal, false otherwise
   */
  static equals(dataA: Erc20Mint | Erc20MintInput, dataB: Erc20Mint | Erc20MintInput) {
    const mintA = Erc20Mint.create(dataA);
    const mintB = Erc20Mint.create(dataB);

    return JSON.stringify(mintA.toJSON()) === JSON.stringify(mintB.toJSON());
  }

  /**
   * Checks the equality of the current mint with another erc20 mint
   * @param data - the mint to compare with
   * @example mint.equals(data)
   * @returns true if the mints are equal, false otherwise
   */
  equals(data: Erc20Mint | Erc20MintInput): boolean {
    return Erc20Mint.equals(this, data);
  }

  /**
   * @returns a JSON representation of the mint.
   * @example mint.toJSON()
   */
  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      contractAddress: data.contractAddress.format(),
      blockNumber: data.blockNumber.toString(),
      toWallet: data.toWallet.format(),
      value: data.value.toString(),
    };
  }

  /**
   * @returns a JSON representation of the mint.
   * @example mint.format()
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns all the data without casting it to JSON.
   * @example mint.result
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the toWallet of the mint
   * @example mint.toWallet // EvmAddress
   */
  get toWallet() {
    return this._data.toWallet;
  }

  /**
   * @returns the contractAddress of the mint
   * @example mint.contractAddress // EvmAddress
   */
  get contractAddress() {
    return this._data.contractAddress;
  }

  /**
   * @returns the block hash of the mint
   * @example mint.blockHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
   */
  get blockHash() {
    return this._data.blockHash;
  }

  /**
   * @returns the block number of the mint
   * @example mint.blockNumber // BigNumber
   */
  get blockNumber() {
    return this._data.blockNumber;
  }

  /**
   * @returns the block timestamp of the mint
   * @example mint.blockTimestamp // Date
   */
  get blockTimestamp() {
    return this._data.blockTimestamp;
  }

  /**
   * @returns the chain of the mint
   * @example mint.chain // EvmChain
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the transaction hash of the mint
   * @example mint.transactionHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
   */
  get transactionHash() {
    return this._data.transactionHash;
  }

  /**
   * @returns the value of the mint
   * @example mint.value // BigNumber
   */
  get value() {
    return this._data.value;
  }

  /**
   * @returns the transactionIndex of the mint
   * @example mint.transactionIndex // 3
   */
  get transactionIndex() {
    return this._data.transactionIndex;
  }

  /**
   * @returns the logIndex of the mint
   * @example mint.logIndex // 2
   */
  get logIndex() {
    return this._data.logIndex;
  }
}
