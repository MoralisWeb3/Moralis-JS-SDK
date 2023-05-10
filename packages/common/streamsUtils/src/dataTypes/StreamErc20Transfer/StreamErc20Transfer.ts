import { BigNumber, maybe, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTriggerOutput } from '../StreamTriggerOutput';
import { StreamErc20TransferData, StreamErc20TransferInput, StreamErc20TransferJSON } from './types';

export type StreamErc20Transferish = StreamErc20TransferInput | StreamErc20Transfer;

/**
 * The StreamErc20Transfer class is a representation of a erc20 transfer that is returned by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamErc20Transfer implements MoralisDataObject {
  private _data: StreamErc20TransferData;

  constructor(data: StreamErc20TransferInput) {
    this._data = StreamErc20Transfer.parse(data);
  }

  /**
   * Create a new instance of StreamErc20Transfer
   *
   * @param data - the StreamErc20Transferish type
   * @example
   * ```ts
   * const erc20Transfer = StreamErc20Transfer.create(data);
   * ```
   * @returns an instance of StreamErc20Transfer
   */
  static create(data: StreamErc20Transferish) {
    if (data instanceof StreamErc20Transfer) {
      return data;
    }
    return new StreamErc20Transfer(data);
  }

  private static parse = (data: StreamErc20TransferInput): StreamErc20TransferData => {
    const chain = EvmChain.create(data.chain);
    return {
      ...data,
      chain,
      from: EvmAddress.create(data.from),
      to: EvmAddress.create(data.to),
      logIndex: +data.logIndex,
      contract: EvmAddress.create(data.contract),
      value: BigNumber.create(data.value),
      valueWithDecimals: maybe(data.valueWithDecimals),
      tokenDecimals: data.tokenDecimals === '' ? undefined : +data.tokenDecimals,
      triggers: maybe(data.triggers, (triggers) => triggers.map((trigger) => StreamTriggerOutput.create(trigger))),
    };
  };

  /**
   * Compares two StreamErc20Transfer data. It checks a deep equality check of both values.
   * @param valueA - the first StreamErc20Transferish data to compare
   * @param valueB - the second StreamErc20Transferish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamErc20Transfer.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamErc20Transferish, valueB: StreamErc20Transferish) {
    const erc20TransferA = StreamErc20Transfer.create(valueA);
    const erc20TransferB = StreamErc20Transfer.create(valueB);

    if (!erc20TransferA.chain.equals(erc20TransferB.chain)) {
      return false;
    }

    if (erc20TransferA.transactionHash !== erc20TransferB.transactionHash) {
      return false;
    }

    if (erc20TransferA.logIndex !== erc20TransferB.logIndex) {
      return false;
    }

    if (
      erc20TransferA.triggers?.length !== erc20TransferB.triggers?.length ||
      !StreamTriggerOutput.arrayEquals(erc20TransferA.triggers || [], erc20TransferB.triggers || [])
    ) {
      return false;
    }

    return true;
  }

  /**
   * Compares an StreamErc20Transferish data to this StreamErc20Transfer instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * erc20Transfer.equals(value);
   * ```
   */
  equals(value: StreamErc20Transferish): boolean {
    return StreamErc20Transfer.equals(this, value);
  }

  /**
   * Converts the StreamErc20Transfer instance to a JSON object.
   * @returns JSON object of the StreamErc20Transfer instance
   * @example `erc20Transfer.toJSON()`
   */
  toJSON(): StreamErc20TransferJSON {
    const { chain, from, to, contract, value, triggers, ...data } = this._data;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return {
      ...data,
      chain: chain.toJSON(),
      from: from.toJSON(),
      to: to.toJSON(),
      contract: contract.toJSON(),
      value: value.toString(),
      triggers: triggers?.map((trigger) => trigger.format()),
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

  get logIndex() {
    return this._data.logIndex;
  }

  get from() {
    return this._data.from;
  }

  get to() {
    return this._data.to;
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
