import MoralisCore, { maybe, MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { EvmAddress, EvmChain, normalizeEvmNftContractType } from '@moralisweb3/evm-utils';
import { StreamEvmNftApprovalData, StreamEvmNftApprovalInput } from './types';

export type StreamEvmNftApprovalish = StreamEvmNftApprovalInput | StreamEvmNftApproval;

/**
 * The StreamEvmNftApproval class is representation of the webhook data that is returned from the Stream api
 *
 * @category DataType
 */
export class StreamEvmNftApproval implements MoralisDataObject {
  /**
   * Create a new instance of StreamEvmNftApproval
   *
   * @param data - the StreamEvmNftApprovalish type
   * @param core - the MoralisCore instance
   * @example
   * ```ts
   * const evmNftApproval = StreamEvmNftApproval.create(data);
   * ```
   * @returns an instance of StreamEvmNftApproval
   */
  static create(data: StreamEvmNftApprovalish, core?: MoralisCore) {
    if (data instanceof StreamEvmNftApproval) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamEvmNftApproval(data, finalCore);
  }

  private _data: StreamEvmNftApprovalData;

  constructor(data: StreamEvmNftApprovalInput, core: MoralisCore) {
    this._data = StreamEvmNftApproval.parse(data, core);
  }

  static parse = (data: StreamEvmNftApprovalInput, core: MoralisCore): StreamEvmNftApprovalData => ({
    ...data,
    chain: EvmChain.create(data.chain, core),
    tokenAddress: EvmAddress.create(data.tokenAddress, core),
    logIndex: +data.logIndex,
    owner: maybe(data.owner, (value) => EvmAddress.create(value, core)),
    tokenContractType: normalizeEvmNftContractType(data.tokenContractType),
  });

  /**
   * Compares two StreamEvmNftApproval data. It checks a deep equality check of both values.
   * @param valueA - the first StreamEvmNftApprovalish data to compare
   * @param valueB - the second StreamEvmNftApprovalish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamEvmNftApproval.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamEvmNftApprovalish, valueB: StreamEvmNftApprovalish) {
    const evmNftApprovalA = StreamEvmNftApproval.create(valueA);
    const evmNftApprovalB = StreamEvmNftApproval.create(valueB);

    // Since we have no specific keys to check comparisons for and the result contains many datapoints, we do a
    // deep equality check
    return JSON.stringify(evmNftApprovalA._data) === JSON.stringify(evmNftApprovalB._data);
  }

  /**
   * Compares an StreamEvmNftApprovalish data to this StreamEvmNftApproval instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * evmNftApproval.equals(value);
   * ```
   */
  equals(value: StreamEvmNftApprovalish): boolean {
    return StreamEvmNftApproval.equals(this, value);
  }

  /**
   * Converts the StreamEvmNftApproval instance to a JSON object.
   * @returns JSON object of the StreamEvmNftApproval instance
   * @example `evmNftApproval.toJSON()`
   */
  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      tokenAddress: data.tokenAddress.format(),
      owner: data.owner?.format(),
    };
  }

  /**
   * Converts the StreamEvmNftApproval instance to a JSON object.
   * @returns JSON object of the StreamEvmNftApproval instance
   * @example `evmNftApproval.format()`
   */
  format() {
    return this.toJSON();
  }
}
