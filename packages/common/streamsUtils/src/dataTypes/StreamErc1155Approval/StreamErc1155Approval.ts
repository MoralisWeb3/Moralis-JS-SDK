import Core, { CoreProvider, maybe, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTriggerOutput } from '../StreamTriggerOutput';
import { StreamErc1155ApprovalData, StreamErc1155ApprovalInput, StreamErc1155ApprovalJSON } from './types';

export type StreamErc1155Approvalish = StreamErc1155ApprovalInput | StreamErc1155Approval;

/**
 * The StreamErc1155Approval class is a representation of a nft approval (ERC1155) that is returned by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamErc1155Approval implements MoralisDataObject {
  /**
   * Create a new instance of StreamErc1155Approval
   *
   * @param data - the StreamErc1155Approvalish type
   * @param core - the Core instance
   * @example
   * ```ts
   * const evmNftApproval = StreamErc1155Approval.create(data);
   * ```
   * @returns an instance of StreamErc1155Approval
   */
  static create(data: StreamErc1155Approvalish, core?: Core) {
    if (data instanceof StreamErc1155Approval) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new StreamErc1155Approval(data, finalCore);
  }

  private _data: StreamErc1155ApprovalData;

  constructor(data: StreamErc1155ApprovalInput, core: Core) {
    this._data = StreamErc1155Approval.parse(data, core);
  }

  private static parse = (data: StreamErc1155ApprovalInput, core: Core): StreamErc1155ApprovalData => {
    const chain = EvmChain.create(data.chain, core);
    return {
      ...data,
      chain,
      logIndex: +data.logIndex,
      account: EvmAddress.create(data.account, core),
      operator: EvmAddress.create(data.operator, core),
      contract: EvmAddress.create(data.contract, core),
      tokenContractType: data.tokenContractType,
      triggers: maybe(data.triggers, (triggers) =>
        triggers.map((trigger) => StreamTriggerOutput.create(trigger, core)),
      ),
    };
  };

  /**
   * Compares two StreamErc1155Approval data. It checks a deep equality check of both values.
   * @param valueA - the first StreamErc1155Approvalish data to compare
   * @param valueB - the second StreamErc1155Approvalish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamErc1155Approval.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamErc1155Approvalish, valueB: StreamErc1155Approvalish) {
    const evmNftApprovalA = StreamErc1155Approval.create(valueA);
    const evmNftApprovalB = StreamErc1155Approval.create(valueB);

    if (!evmNftApprovalA.chain.equals(evmNftApprovalB.chain)) {
      return false;
    }

    if (evmNftApprovalA.transactionHash !== evmNftApprovalB.transactionHash) {
      return false;
    }

    if (!evmNftApprovalA.account.equals(evmNftApprovalB.account)) {
      return false;
    }

    if (!evmNftApprovalA.contract.equals(evmNftApprovalB.contract)) {
      return false;
    }

    if (!evmNftApprovalA.operator.equals(evmNftApprovalB.operator)) {
      return false;
    }

    if (evmNftApprovalA.approved !== evmNftApprovalB.approved) {
      return false;
    }

    if (evmNftApprovalA.triggers?.length !== evmNftApprovalB.triggers?.length) {
      return false;
    } else {
      const triggerResultsA = evmNftApprovalA.triggers || [];
      const triggerResultsB = evmNftApprovalB.triggers || [];

      triggerResultsA.sort((a, b) => (b.name > a.name ? 1 : -1));
      triggerResultsB.sort((a, b) => (b.name > a.name ? 1 : -1));

      for (let i = 0; i < triggerResultsA?.length; i++) {
        if (!triggerResultsA[i].equals(triggerResultsB[i])) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Compares an StreamErc1155Approvalish data to this StreamErc1155Approval instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * evmNftApproval.equals(value);
   * ```
   */
  equals(value: StreamErc1155Approvalish): boolean {
    return StreamErc1155Approval.equals(this, value);
  }

  /**
   * Converts the StreamErc1155Approval instance to a JSON object.
   * @returns JSON object of the StreamErc1155Approval instance
   * @example `evmNftApproval.toJSON()`
   */
  toJSON(): StreamErc1155ApprovalJSON {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      contract: data.contract.format(),
      account: data.account.format(),
      operator: data.operator.format(),
      triggers: data.triggers?.map((trigger) => trigger.format()),
    };
  }

  /**
   * Converts the StreamErc1155Approval instance to a JSON object.
   * @returns JSON object of the StreamErc1155Approval instance
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

  get transactionHash() {
    return this._data.transactionHash;
  }

  get contract() {
    return this._data.contract;
  }

  get logIndex() {
    return this._data.logIndex;
  }

  get account() {
    return this._data.account;
  }

  get operator() {
    return this._data.operator;
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
