import MoralisCore, { MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { EvmAddress, EvmChain } from '@moralisweb3/evm-utils';
import { StreamErc721ApprovalData, StreamErc721ApprovalInput, StreamErc721ApprovalJSON } from './types';

export type StreamErc721Approvalish = StreamErc721ApprovalInput | StreamErc721Approval;

/**
 * The StreamErc721Approval class is representation of the webhook data that is returned from the Stream api
 *
 * @category DataType
 */
export class StreamErc721Approval implements MoralisDataObject {
  /**
   * Create a new instance of StreamErc721Approval
   *
   * @param data - the StreamErc721Approvalish type
   * @param core - the MoralisCore instance
   * @example
   * ```ts
   * const evmNftApproval = StreamErc721Approval.create(data);
   * ```
   * @returns an instance of StreamErc721Approval
   */
  static create(data: StreamErc721Approvalish, core?: MoralisCore) {
    if (data instanceof StreamErc721Approval) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamErc721Approval(data, finalCore);
  }

  private _data: StreamErc721ApprovalData;

  constructor(data: StreamErc721ApprovalInput, core: MoralisCore) {
    this._data = StreamErc721Approval.parse(data, core);
  }

  static parse = (data: StreamErc721ApprovalInput, core: MoralisCore): StreamErc721ApprovalData => {
    const chain = EvmChain.create(data.chain, core);
    return {
      ...data,
      chain,
      logIndex: +data.logIndex,
      owner: EvmAddress.create(data.owner, core),
      contract: EvmAddress.create(data.contract, core),
      tokenContractType: data.tokenContractType,
      approved: EvmAddress.create(data.approved, core),
    };
  };

  /**
   * Compares two StreamErc721Approval data. It checks a deep equality check of both values.
   * @param valueA - the first StreamErc721Approvalish data to compare
   * @param valueB - the second StreamErc721Approvalish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamErc721Approval.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamErc721Approvalish, valueB: StreamErc721Approvalish) {
    const evmNftApprovalA = StreamErc721Approval.create(valueA);
    const evmNftApprovalB = StreamErc721Approval.create(valueB);

    // Since we have no specific keys to check comparisons for and the result contains many datapoints, we do a
    // deep equality check
    return JSON.stringify(evmNftApprovalA._data) === JSON.stringify(evmNftApprovalB._data);
  }

  /**
   * Compares an StreamErc721Approvalish data to this StreamErc721Approval instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * evmNftApproval.equals(value);
   * ```
   */
  equals(value: StreamErc721Approvalish): boolean {
    return StreamErc721Approval.equals(this, value);
  }

  /**
   * Converts the StreamErc721Approval instance to a JSON object.
   * @returns JSON object of the StreamErc721Approval instance
   * @example `evmNftApproval.toJSON()`
   */
  toJSON(): StreamErc721ApprovalJSON {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      contract: data.contract.format(),
      owner: data.owner.format(),
      approved: data.approved.format(),
    };
  }

  /**
   * Converts the StreamErc721Approval instance to a JSON object.
   * @returns JSON object of the StreamErc721Approval instance
   * @example `evmNftApproval.format()`
   */
  format() {
    return this.toJSON();
  }

  get chain() {
    return this._data.chain;
  }

  get approved() {
    return this._data.approved;
  }

  get owner() {
    return this._data.owner;
  }

  get transactionHash() {
    return this._data.transactionHash;
  }

  get contract() {
    return this._data.contract;
  }

  get logIndex() {
    return this._data.logIndex;
  }

  get tokenId() {
    return this._data.tokenId;
  }

  get tokenContractType() {
    return this._data.tokenContractType;
  }

  get tokenName() {
    return this._data.tokenName;
  }

  get tokenSymbol() {
    return this._data.tokenSymbol;
  }
}
