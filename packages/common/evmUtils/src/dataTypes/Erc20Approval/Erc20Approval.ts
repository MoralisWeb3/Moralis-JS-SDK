import { MoralisDataObject, BigNumber, dateInputToDate } from '@moralisweb3/common-core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { Erc20ApprovalInput, Erc20ApprovalData } from './types';

/**
 * The Erc20Approval is a representation of an Erc20 token approval.
 *
 * @category DataType
 */
export class Erc20Approval implements MoralisDataObject {
  /**
   * Create a new instance of Erc20Approval from any valid input
   * @param data -  Erc20Approval instance or valid Erc20ApprovalInput
   * @example
   * ```
   * const approval = Erc20Approval.create(data);
   *```
   */
  static create(data: Erc20Approval | Erc20ApprovalInput) {
    if (data instanceof Erc20Approval) {
      return data;
    }
    return new Erc20Approval(data);
  }

  private _data: Erc20ApprovalData;

  constructor(data: Erc20ApprovalInput) {
    this._data = Erc20Approval.parse(data);
  }

  static parse = (data: Erc20ApprovalInput): Erc20ApprovalData => ({
    ...data,
    chain: EvmChain.create(data.chain),
    contractAddress: EvmAddress.create(data.contractAddress),
    fromWallet: EvmAddress.create(data.fromWallet),
    toWallet: EvmAddress.create(data.toWallet),
    blockTimestamp: dateInputToDate(data.blockTimestamp),
    blockNumber: BigNumber.create(data.blockNumber),
    value: BigNumber.create(data.value),
    transactionIndex: Number(data.transactionIndex),
    logIndex: Number(data.logIndex),
    tokenDecimals: Number(data.tokenDecimals),
  });

  /**
   * Check the equality between two Erc20 approvals
   * @param dataA - The first approval to compare
   * @param dataB - The second approval to compare
   * @example Erc20Approval.equals(dataA, dataB)
   * @returns true if the approvals are equal, false otherwise
   */
  static equals(dataA: Erc20Approval | Erc20ApprovalInput, dataB: Erc20Approval | Erc20ApprovalInput) {
    const approvalA = Erc20Approval.create(dataA);
    const approvalB = Erc20Approval.create(dataB);

    return JSON.stringify(approvalA.toJSON()) === JSON.stringify(approvalB.toJSON());
  }

  /**
   * Checks the equality of the current approval with another erc20 approval
   * @param data - the approval to compare with
   * @example approval.equals(data)
   * @returns true if the approvals are equal, false otherwise
   */
  equals(data: Erc20Approval | Erc20ApprovalInput): boolean {
    return Erc20Approval.equals(this, data);
  }

  /**
   * @returns a JSON representation of the approval.
   * @example approval.toJSON()
   */
  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.toJSON(),
      contractAddress: data.contractAddress.toJSON(),
      blockNumber: data.blockNumber.toString(),
      toWallet: data.toWallet.toJSON(),
      fromWallet: data.fromWallet.toJSON(),
      value: data.value.toString(),
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
   * @example approval.result
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the toWallet of the approval
   * @example approval.toWallet // EvmAddress
   */
  get toWallet() {
    return this._data.toWallet;
  }

  /**
   * @returns the fromWallet of the approval
   * @example approval.fromWallet // EvmAddress
   */
  get fromWallet() {
    return this._data.fromWallet;
  }

  /**
   * @returns the contractAddress of the approval
   * @example approval.contractAddress // EvmAddress
   */
  get contractAddress() {
    return this._data.contractAddress;
  }

  /**
   * @returns the block hash of the approval
   * @example approval.blockHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
   */
  get blockHash() {
    return this._data.blockHash;
  }

  /**
   * @returns the block number of the approval
   * @example approval.blockNumber // BigNumber
   */
  get blockNumber() {
    return this._data.blockNumber;
  }

  /**
   * @returns the block timestamp of the approval
   * @example approval.blockTimestamp // Date
   */
  get blockTimestamp() {
    return this._data.blockTimestamp;
  }

  /**
   * @returns the chain of the approval
   * @example approval.chain // EvmChain
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the transaction hash of the approval
   * @example approval.transactionHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
   */
  get transactionHash() {
    return this._data.transactionHash;
  }

  /**
   * @returns the value of the approval
   * @example approval.value // BigNumber
   */
  get value() {
    return this._data.value;
  }

  /**
   * @returns the transactionIndex of the approval
   * @example approval.transactionIndex // 3
   */
  get transactionIndex() {
    return this._data.transactionIndex;
  }

  /**
   * @returns the logIndex of the approval
   * @example approval.logIndex // 2
   */
  get logIndex() {
    return this._data.logIndex;
  }

  /**
   * @returns possibility of the token being a spam token
   * @example transfer.possibleSpam // true
   */
  get possibleSpam() {
    return this._data.possibleSpam;
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
