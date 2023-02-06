import Core, { CoreProvider, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmStreamResultFormatter } from './EvmStreamResultFormatter';
import { EvmStreamResultParser } from './EvmStreamResultParser';
import { EvmStreamResultData, EvmStreamResultInput } from './types';
import { Interface } from '@ethersproject/abi';

export type EvmStreamResultish = EvmStreamResultInput | EvmStreamResult;

/**
 * The EvmStreamResult class is representation of the webhook data that is returned from the Stream api
 *
 * @category DataType
 */
export class EvmStreamResult implements MoralisDataObject {
  /**
   * Create a new instance of EvmStreamResult
   *
   * @param data - the EvmStreamResultish type
   * @param core - the Core instance
   * @example
   * ```ts
   * const evmStreamResult = EvmStreamResult.create(data);
   * ```
   * @returns an instance of EvmStreamResult
   */
  static create(data: EvmStreamResultish, core?: Core) {
    if (data instanceof EvmStreamResult) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new EvmStreamResult(data, finalCore);
  }

  private _data: EvmStreamResultData;

  constructor(data: EvmStreamResultInput, core: Core) {
    this._data = EvmStreamResult.parse(data, core);
  }

  private static parse = (data: EvmStreamResultInput, core: Core): EvmStreamResultData =>
    EvmStreamResultParser.parse(data, core);

  /**
   * Compares two EvmStreamResult data. It checks a deep equality check of both values.
   * @param valueA - the first EvmStreamResultish data to compare
   * @param valueB - the second EvmStreamResultish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  EvmStreamResult.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: EvmStreamResultish, valueB: EvmStreamResultish) {
    const evmStreamResultA = EvmStreamResult.create(valueA);
    const evmStreamResultB = EvmStreamResult.create(valueB);

    if (!evmStreamResultA.chain.equals(evmStreamResultB.chain)) {
      return false;
    }

    if (!evmStreamResultA.block.equals(evmStreamResultB.block)) {
      return false;
    }

    if (evmStreamResultA.streamId !== evmStreamResultB.streamId) {
      return false;
    }

    if (evmStreamResultA.tag !== evmStreamResultB.tag) {
      return false;
    }

    if (evmStreamResultA.confirmed !== evmStreamResultB.confirmed) {
      return false;
    }

    return true;
  }

  /**
   * Compares an EvmStreamResultish data to this EvmStreamResult instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * evmStreamResult.equals(value);
   * ```
   */
  equals(value: EvmStreamResultish): boolean {
    return EvmStreamResult.equals(this, value);
  }

  /**
   * Converts the EvmStreamResult instance to a JSON object.
   * @returns JSON object of the EvmStreamResult instance
   * @example `evmStreamResult.toJSON()`
   */
  toJSON() {
    return EvmStreamResultFormatter.toJSON(this._data);
  }

  /**
   * Converts the EvmStreamResult instance to a JSON object.
   * @returns JSON object of the EvmStreamResult instance
   * @example `evmStreamResult.format()`
   */
  format() {
    return this.toJSON();
  }

  get abiInterface() {
    if (!this.abi || !this.abi.length) {
      return null;
    }
    return new Interface(this.abi);
  }

  get decodedLogs() {
    const { abiInterface } = this;
    if (!abiInterface) {
      return [];
    }

    return this.logs.map((log) =>
      abiInterface.parseLog({
        data: log.data,
        topics: [log.topic0, log.topic1, log.topic2, log.topic3].filter(isNotEmpty),
      }),
    );
  }

  get chain() {
    return this._data.chain;
  }

  get streamId() {
    return this._data.streamId;
  }

  get tag() {
    return this._data.tag;
  }

  get block() {
    return this._data.block;
  }

  get retries() {
    return this._data.retries;
  }

  get confirmed() {
    return this._data.confirmed;
  }

  get erc20Approvals() {
    return this._data.erc20Approvals;
  }

  get erc20Transfers() {
    return this._data.erc20Transfers;
  }

  get logs() {
    return this._data.logs;
  }

  get nftApprovals() {
    return this._data.nftApprovals;
  }

  get nftTransfers() {
    return this._data.nftTransfers;
  }

  get txs() {
    return this._data.txs;
  }

  get txsInternal() {
    return this._data.txsInternal;
  }

  get abi() {
    return this._data.abi;
  }

  get nativeBalances() {
    return this._data.nativeBalances;
  }
}

const isNotEmpty = <Value>(value: Value | null | undefined): value is Value => value != null;
