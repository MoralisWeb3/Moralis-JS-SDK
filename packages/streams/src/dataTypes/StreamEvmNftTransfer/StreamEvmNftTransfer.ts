import MoralisCore, { maybe, MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { EvmAddress, EvmChain, normalizeEvmNftContractType } from '@moralisweb3/evm-utils';
import { StreamEvmNftTransferData, StreamEvmNftTransferInput, StreamEvmNftTransferJSON } from './types';

type StreamEvmNftTransferish = StreamEvmNftTransfer | StreamEvmNftTransferInput;
export class StreamEvmNftTransfer implements MoralisDataObject {
  private _data: StreamEvmNftTransferData;

  constructor(data: StreamEvmNftTransferInput, core: MoralisCore) {
    this._data = StreamEvmNftTransfer.parse(data, core);
  }

  static create(data: StreamEvmNftTransferish, core?: MoralisCore) {
    if (data instanceof StreamEvmNftTransfer) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamEvmNftTransfer(data, finalCore);
  }

  static parse(data: StreamEvmNftTransferInput, core: MoralisCore): StreamEvmNftTransferData {
    return {
      ...data,
      chain: EvmChain.create(data.chain, core),
      to: EvmAddress.create(data.to, core),
      contract: EvmAddress.create(data.contract, core),
      from: EvmAddress.create(data.from, core),
      logIndex: +data.logIndex,
      operator: maybe(data.operator, (operator) => EvmAddress.create(operator, core)),
      tokenId: data.tokenId,
      transactionHash: data.transactionHash,
      amount: +data.amount,
      tokenName: data.tokenName,
      tokenContractType: data.tokenContractType ? normalizeEvmNftContractType(data.tokenContractType) : undefined,
    };
  }

  /**
   * Compares two StreamEvmNftTransfer data. It checks a deep equality check of both values.
   * @param valueA - the first StreamEvmNftTransferish data to compare
   * @param valueB - the second StreamEvmNftTransferish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamEvmNftTransfer.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamEvmNftTransferish, valueB: StreamEvmNftTransferish) {
    const transferA = StreamEvmNftTransfer.create(valueA);
    const transferB = StreamEvmNftTransfer.create(valueB);

    // Since we have no specific keys to check comparisons for and the result contains many datapoints, we do a
    // deep equality check
    return JSON.stringify(transferA._data) === JSON.stringify(transferB._data);
  }

  /**
   * Compares an StreamEvmNftTransferish data to this StreamEvmNftTransfer instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * transfer.equals(value);
   * ```
   */
  equals(value: StreamEvmNftTransferish): boolean {
    return StreamEvmNftTransfer.equals(this, value);
  }

  toJSON(): StreamEvmNftTransferJSON {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      from: data.from.format(),
      to: data.to.format(),
      contract: data.contract.format(),
      operator: data.operator?.format(),
    };
  }

  format() {
    return this.toJSON();
  }

  get chain() {
    return this._data.chain;
  }

  get transactionHash() {
    return this._data.transactionHash;
  }

  get from() {
    return this._data.from;
  }

  get to() {
    return this._data.to;
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

  get amount() {
    return this._data.amount;
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

  get operator() {
    return this._data.operator;
  }
}
