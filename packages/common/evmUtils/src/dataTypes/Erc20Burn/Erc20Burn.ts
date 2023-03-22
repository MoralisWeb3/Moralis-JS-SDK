import Core, { MoralisDataObject, BigNumber, dateInputToDate, CoreProvider } from '@moralisweb3/common-core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { Erc20BurnInput, Erc20BurnData } from './types';

/**
 * The Erc20Burn is a representation of an Erc20 token burn.
 *
 * @category DataType
 */
export class Erc20Burn implements MoralisDataObject {
  /**
   * Create a new instance of Erc20Burn from any valid input
   * @param data -  Erc20Burn instance or valid Erc20BurnInput
   * @example
   * ```
   * const burn = Erc20Burn.create(data);
   *```
   */
  static create(data: Erc20Burn | Erc20BurnInput, core?: Core) {
    if (data instanceof Erc20Burn) {
      return data;
    }

    const finalCore = core ?? CoreProvider.getDefault();
    return new Erc20Burn(data, finalCore);
  }

  private _data: Erc20BurnData;

  constructor(data: Erc20BurnInput, core: Core) {
    this._data = Erc20Burn.parse(data, core);
  }

  static parse = (data: Erc20BurnInput, core: Core): Erc20BurnData => ({
    ...data,
    chain: EvmChain.create(data.chain, core),
    contractAddress: EvmAddress.create(data.contractAddress, core),
    fromWallet: EvmAddress.create(data.fromWallet, core),
    blockTimestamp: dateInputToDate(data.blockTimestamp),
    blockNumber: BigNumber.create(data.blockNumber),
    value: BigNumber.create(data.value),
    transactionIndex: Number(data.transactionIndex),
    logIndex: Number(data.logIndex),
  });

  /**
   * Check the equality between two Erc20 burns
   * @param dataA - The first burn to compare
   * @param dataB - The second burn to compare
   * @example Erc20Burn.equals(dataA, dataB)
   * @returns true if the burns are equal, false otherwise
   */
  static equals(dataA: Erc20Burn | Erc20BurnInput, dataB: Erc20Burn | Erc20BurnInput) {
    const burnA = Erc20Burn.create(dataA);
    const burnB = Erc20Burn.create(dataB);

    return JSON.stringify(burnA.toJSON()) === JSON.stringify(burnB.toJSON());
  }

  /**
   * Checks the equality of the current burn with another erc20 burn
   * @param data - the burn to compare with
   * @example burn.equals(data)
   * @returns true if the burns are equal, false otherwise
   */
  equals(data: Erc20Burn | Erc20BurnInput): boolean {
    return Erc20Burn.equals(this, data);
  }

  /**
   * @returns a JSON representation of the burn.
   * @example burn.toJSON()
   */
  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      contractAddress: data.contractAddress.format(),
      blockNumber: data.blockNumber.toString(),
      fromWallet: data.fromWallet.format(),
      value: data.value.toString(),
    };
  }

  /**
   * @returns a JSON representation of the burn.
   * @example burn.format()
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns all the data without casting it to JSON.
   * @example burn.result
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the fromWallet of the burn
   * @example burn.fromWallet // EvmAddress
   */
  get fromWallet() {
    return this._data.fromWallet;
  }

  /**
   * @returns the contractAddress of the burn
   * @example burn.contractAddress // EvmAddress
   */
  get contractAddress() {
    return this._data.contractAddress;
  }

  /**
   * @returns the block hash of the burn
   * @example burn.blockHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
   */
  get blockHash() {
    return this._data.blockHash;
  }

  /**
   * @returns the block number of the burn
   * @example burn.blockNumber // BigNumber
   */
  get blockNumber() {
    return this._data.blockNumber;
  }

  /**
   * @returns the block timestamp of the burn
   * @example burn.blockTimestamp // Date
   */
  get blockTimestamp() {
    return this._data.blockTimestamp;
  }

  /**
   * @returns the chain of the burn
   * @example burn.chain // EvmChain
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the transaction hash of the burn
   * @example burn.transactionHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
   */
  get transactionHash() {
    return this._data.transactionHash;
  }

  /**
   * @returns the value of the burn
   * @example burn.value // BigNumber
   */
  get value() {
    return this._data.value;
  }

  /**
   * @returns the transactionIndex of the burn
   * @example burn.transactionIndex // 3
   */
  get transactionIndex() {
    return this._data.transactionIndex;
  }

  /**
   * @returns the logIndex of the burn
   * @example burn.logIndex // 2
   */
  get logIndex() {
    return this._data.logIndex;
  }
}
