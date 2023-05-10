import { MoralisDataObject, BigNumber, dateInputToDate } from '@moralisweb3/common-core';
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
  static create(data: Erc20Burn | Erc20BurnInput) {
    if (data instanceof Erc20Burn) {
      return data;
    }
    return new Erc20Burn(data);
  }

  private _data: Erc20BurnData;

  constructor(data: Erc20BurnInput) {
    this._data = Erc20Burn.parse(data);
  }

  static parse = (data: Erc20BurnInput): Erc20BurnData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    contractAddress: EvmAddress.create(data.contractAddress),
    fromWallet: EvmAddress.create(data.fromWallet),
    blockTimestamp: dateInputToDate(data.blockTimestamp),
    blockNumber: BigNumber.create(data.blockNumber),
    value: BigNumber.create(data.value),
    transactionIndex: Number(data.transactionIndex),
    logIndex: Number(data.logIndex),
    tokenDecimals: Number(data.tokenDecimals),
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
      chain: data.chain.toJSON(),
      contractAddress: data.contractAddress.toJSON(),
      blockNumber: data.blockNumber.toString(),
      fromWallet: data.fromWallet.toJSON(),
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

  /**
   * @returns The name of the token.
   * @example burn.tokenName // "Kylin Network"
   */
  public get tokenName(): string {
    return this._data.tokenName;
  }

  /**
   * @returns The logo of the token
   * @example burn.tokenLogo // "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png"
   */
  public get tokenLogo(): string | undefined {
    return this._data.tokenLogo;
  }

  /**
   * @returns The symbol of the token.
   * @example burn.tokenSymbol // "KYL"
   */
  public get tokenSymbol(): string {
    return this._data.tokenSymbol;
  }

  /**
   * @returns The decimals of the token.
   * @example burn.tokenDecimals // 18
   */
  public get tokenDecimals(): number {
    return this._data.tokenDecimals;
  }
}
