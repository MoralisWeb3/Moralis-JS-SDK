import MoralisCore, { BigNumber, MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { EvmAddress, EvmChain } from '@moralisweb3/evm-utils';
import { StreamErc20ApprovalData, StreamErc20ApprovalInput } from './types';

export type StreamErc20Approvalish = StreamErc20ApprovalInput | StreamErc20Approval;

/**
 * The StreamErc20Approval class is representation of the webhook data that is returned from the Stream api
 *
 * @category DataType
 */
export class StreamErc20Approval implements MoralisDataObject {
  /**
   * Create a new instance of StreamErc20Approval
   *
   * @param data - the StreamErc20Approvalish type
   * @param core - the MoralisCore instance
   * @example
   * ```ts
   * const erc20Approval = StreamErc20Approval.create(data);
   * ```
   * @returns an instance of StreamErc20Approval
   */
  static create(data: StreamErc20Approvalish, core?: MoralisCore) {
    if (data instanceof StreamErc20Approval) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamErc20Approval(data, finalCore);
  }

  private _data: StreamErc20ApprovalData;

  constructor(data: StreamErc20ApprovalInput, core: MoralisCore) {
    this._data = StreamErc20Approval.parse(data, core);
  }

  static parse = (data: StreamErc20ApprovalInput, core: MoralisCore): StreamErc20ApprovalData => ({
    ...data,
    chain: EvmChain.create(data.chain, core),
    spender: EvmAddress.create(data.spender, core),
    owner: EvmAddress.create(data.spender, core),
    tokenAddress: EvmAddress.create(data.spender, core),
    logIndex: +data.logIndex,
    value: BigNumber.create(data.value),
    tokenDecimals: +data.tokenDecimals
  });

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

    // Since we have no specific keys to check comparisons for and the result contains many datapoints, we do a
    // deep equality check
    return JSON.stringify(erc20ApprovalA._data) === JSON.stringify(erc20ApprovalB._data);
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
  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      tokenAddress: data.tokenAddress.format(),
      owner: data.owner.format(),
      spender: data.spender.format(),
      value: data.value.toString()
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
}
