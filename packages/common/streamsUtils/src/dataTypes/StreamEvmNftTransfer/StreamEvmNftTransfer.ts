import { maybe, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTriggerOutput } from '../StreamTriggerOutput';
import { StreamEvmNftTransferData, StreamEvmNftTransferInput, StreamEvmNftTransferJSON } from './types';

type StreamEvmNftTransferish = StreamEvmNftTransfer | StreamEvmNftTransferInput;

/**
 * The StreamEvmNftTransfer class is a representation of a nft transfer (EREC721 or ERC1155) that is returned by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamEvmNftTransfer implements MoralisDataObject {
  private _data: StreamEvmNftTransferData;

  constructor(data: StreamEvmNftTransferInput) {
    this._data = StreamEvmNftTransfer.parse(data);
  }

  /**
   * Create a new instance of StreamEvmNftTransferish
   *
   * @param data - the StreamEvmNftTransferishish type
   * @example
   * ```ts
   * const transfer = StreamEvmTransactionish.create(data);
   * ```
   * @returns an instance of StreamEvmNftTransfer
   */
  static create(data: StreamEvmNftTransferish) {
    if (data instanceof StreamEvmNftTransfer) {
      return data;
    }
    return new StreamEvmNftTransfer(data);
  }

  private static parse(data: StreamEvmNftTransferInput): StreamEvmNftTransferData {
    return {
      ...data,
      chain: EvmChain.create(data.chain),
      to: EvmAddress.create(data.to),
      contract: EvmAddress.create(data.contract),
      from: EvmAddress.create(data.from),
      logIndex: +data.logIndex,
      operator: maybe(data.operator, (operator) => EvmAddress.create(operator)),
      tokenId: data.tokenId,
      transactionHash: data.transactionHash,
      amount: +data.amount,
      tokenName: data.tokenName,
      triggers: maybe(data.triggers, (triggers) => triggers.map((trigger) => StreamTriggerOutput.create(trigger))),
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
  // eslint-disable-next-line complexity
  static equals(valueA: StreamEvmNftTransferish, valueB: StreamEvmNftTransferish) {
    const transferA = StreamEvmNftTransfer.create(valueA);
    const transferB = StreamEvmNftTransfer.create(valueB);

    if (!transferA.chain.equals(transferB.chain)) {
      return false;
    }

    if (transferA.transactionHash !== transferB.transactionHash) {
      return false;
    }

    if (transferA.logIndex !== transferB.logIndex) {
      return false;
    }

    if (!transferA.contract.equals(transferB.contract)) {
      return false;
    }

    if (transferA.tokenId !== transferB.tokenId) {
      return false;
    }

    if (
      transferA.triggers?.length !== transferB.triggers?.length ||
      !StreamTriggerOutput.arrayEquals(transferA.triggers || [], transferB.triggers || [])
    ) {
      return false;
    }

    return true;
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

  /**
   * Converts the StreamEvmNftTransfer instance to a JSON object.
   * @returns JSON object of the StreamEvmNftTransfer instance
   * @example `transfer.toJSON()`
   */
  toJSON(): StreamEvmNftTransferJSON {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.toJSON(),
      from: data.from.toJSON(),
      to: data.to.toJSON(),
      contract: data.contract.toJSON(),
      operator: data.operator?.toJSON(),
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

  get triggers() {
    return this._data.triggers;
  }
}
