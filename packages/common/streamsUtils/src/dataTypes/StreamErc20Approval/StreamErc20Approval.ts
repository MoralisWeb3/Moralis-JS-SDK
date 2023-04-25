import { BigNumber, maybe, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTriggerOutput } from '../StreamTriggerOutput';
import { StreamErc20ApprovalData, StreamErc20ApprovalInput, StreamErc20ApprovalJSON } from './types';

export type StreamErc20Approvalish = StreamErc20ApprovalInput | StreamErc20Approval;

/**
 * The StreamErc20Transfer class is a representation of a erc20 approval that is returned by the Moralis Stream API
 *
 * @category DataTypexw
 */
export class StreamErc20Approval implements MoralisDataObject {
  /**
   * Create a new instance of StreamErc20Approval
   *
   * @param data - the StreamErc20Approvalish type
   * @example
   * ```ts
   * const erc20Approval = StreamErc20Approval.create(data);
   * ```
   * @returns an instance of StreamErc20Approval
   */
  static create(data: StreamErc20Approvalish) {
    if (data instanceof StreamErc20Approval) {
      return data;
    }
    return new StreamErc20Approval(data);
  }

  private _data: StreamErc20ApprovalData;

  constructor(data: StreamErc20ApprovalInput) {
    this._data = StreamErc20Approval.parse(data);
  }

  private static parse = (data: StreamErc20ApprovalInput): StreamErc20ApprovalData => {
    const chain = EvmChain.create(data.chain);
    return {
      ...data,
      chain,
      spender: EvmAddress.create(data.spender),
      owner: EvmAddress.create(data.owner),
      logIndex: +data.logIndex,
      contract: EvmAddress.create(data.contract),
      value: BigNumber.create(data.value),
      valueWithDecimals: maybe(data.valueWithDecimals),
      tokenDecimals: data.tokenDecimals === '' ? undefined : +data.tokenDecimals,
      triggers: maybe(data.triggers, (triggers) => triggers.map((trigger) => StreamTriggerOutput.create(trigger))),
    };
  };

  /**
   * Compares two StreamErc20Approval data. It checks a deep equality check of both values.
   * @param valueA - the first StreamErc20Approvalish data to compare
   * @param valueB - the second StreamErc20Approvalish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamErc20Approval.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamErc20Approvalish, valueB: StreamErc20Approvalish) {
    const erc20ApprovalA = StreamErc20Approval.create(valueA);
    const erc20ApprovalB = StreamErc20Approval.create(valueB);

    if (!erc20ApprovalA.chain.equals(erc20ApprovalB.chain)) {
      return false;
    }

    if (erc20ApprovalA.transactionHash !== erc20ApprovalB.transactionHash) {
      return false;
    }

    if (erc20ApprovalA.logIndex !== erc20ApprovalB.logIndex) {
      return false;
    }

    if (
      erc20ApprovalA.triggers?.length !== erc20ApprovalB.triggers?.length ||
      !StreamTriggerOutput.arrayEquals(erc20ApprovalA.triggers || [], erc20ApprovalB.triggers || [])
    ) {
      return false;
    }

    return true;
  }

  /**
   * Compares an StreamErc20Approvalish data to this StreamErc20Approval instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * erc20Approval.equals(value);
   * ```
   */
  equals(value: StreamErc20Approvalish): boolean {
    return StreamErc20Approval.equals(this, value);
  }

  /**
   * Converts the StreamErc20Approval instance to a JSON object.
   * @returns JSON object of the StreamErc20Approval instance
   * @example `erc20Approval.toJSON()`
   */
  toJSON(): StreamErc20ApprovalJSON {
    const { chain, owner, spender, contract, value, triggers, ...data } = this._data;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return {
      ...data,
      chain: chain.toJSON(),
      owner: owner.toJSON(),
      spender: spender.toJSON(),
      contract: contract.toJSON(),
      value: value.toString(),
      triggers: triggers?.map((trigger) => trigger.format()),
    };
  }

  /**
   * Converts the StreamErc20Approval instance to a JSON object.
   * @returns JSON object of the StreamErc20Approval instance
   * @example `erc20Approval.format()`
   */
  format() {
    return this.toJSON();
  }

  get chain() {
    return this._data.chain;
  }

  get transactionHash() {
    return this._data.transactionHash;
  }

  get logIndex() {
    return this._data.logIndex;
  }

  get owner() {
    return this._data.owner;
  }

  get spender() {
    return this._data.spender;
  }

  get value() {
    return this._data.value;
  }

  get contract() {
    return this._data.contract;
  }

  get tokenName() {
    return this._data.tokenName;
  }

  get tokenSymbol() {
    return this._data.tokenSymbol;
  }

  get tokenDecimals() {
    return this._data.tokenDecimals;
  }

  get valueWithDecimals() {
    return this._data.valueWithDecimals;
  }

  get triggers() {
    return this._data.triggers;
  }
}
