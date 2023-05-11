import { maybe, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTriggerOutput } from '../StreamTriggerOutput';
import { StreamErc721ApprovalData, StreamErc721ApprovalInput, StreamErc721ApprovalJSON } from './types';

export type StreamErc721Approvalish = StreamErc721ApprovalInput | StreamErc721Approval;

/**
 * The StreamErc1155Approval class is a representation of a nft approval (ERC721) that is returned by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamErc721Approval implements MoralisDataObject {
  /**
   * Create a new instance of StreamErc721Approval
   *
   * @param data - the StreamErc721Approvalish type
   * @example
   * ```ts
   * const evmNftApproval = StreamErc721Approval.create(data);
   * ```
   * @returns an instance of StreamErc721Approval
   */
  static create(data: StreamErc721Approvalish) {
    if (data instanceof StreamErc721Approval) {
      return data;
    }
    return new StreamErc721Approval(data);
  }

  private _data: StreamErc721ApprovalData;

  constructor(data: StreamErc721ApprovalInput) {
    this._data = StreamErc721Approval.parse(data);
  }

  private static parse = (data: StreamErc721ApprovalInput): StreamErc721ApprovalData => {
    const chain = EvmChain.create(data.chain);
    return {
      ...data,
      chain,
      logIndex: +data.logIndex,
      owner: EvmAddress.create(data.owner),
      contract: EvmAddress.create(data.contract),
      tokenContractType: data.tokenContractType,
      approved: EvmAddress.create(data.approved),
      triggers: maybe(data.triggers, (triggers) => triggers.map((trigger) => StreamTriggerOutput.create(trigger))),
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
  // eslint-disable-next-line complexity
  static equals(valueA: StreamErc721Approvalish, valueB: StreamErc721Approvalish) {
    const evmNftApprovalA = StreamErc721Approval.create(valueA);
    const evmNftApprovalB = StreamErc721Approval.create(valueB);

    if (!evmNftApprovalA.chain.equals(evmNftApprovalB.chain)) {
      return false;
    }

    if (evmNftApprovalA.transactionHash !== evmNftApprovalB.transactionHash) {
      return false;
    }

    if (!evmNftApprovalA.owner.equals(evmNftApprovalB.owner)) {
      return false;
    }

    if (!evmNftApprovalA.contract.equals(evmNftApprovalB.contract)) {
      return false;
    }

    if (evmNftApprovalA.tokenId !== evmNftApprovalB.tokenId) {
      return false;
    }

    if (!evmNftApprovalA.approved.equals(evmNftApprovalB.approved)) {
      return false;
    }

    if (
      evmNftApprovalA.triggers?.length !== evmNftApprovalB.triggers?.length ||
      !StreamTriggerOutput.arrayEquals(evmNftApprovalA.triggers || [], evmNftApprovalB.triggers || [])
    ) {
      return false;
    }

    return true;
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
      chain: data.chain.toJSON(),
      contract: data.contract.toJSON(),
      owner: data.owner.toJSON(),
      approved: data.approved.toJSON(),
      triggers: data.triggers?.map((trigger) => trigger.format()),
    };
  }

  /**
   * @deprecated This method will be removed soon. To format the value, use one of the properties.
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

  get triggers() {
    return this._data.triggers;
  }
}
