import Core, { BigNumber, maybe, CoreProvider, MoralisDataObject } from '@moralisweb3/common-core';
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

  constructor(data: StreamErc20TransferInput, core: Core) {
    this._data = StreamErc20Transfer.parse(data, core);
  }

  /**
   * Create a new instance of StreamErc20Transfer
   *
   * @param data - the StreamErc20Transferish type
   * @param core - the Core instance
   * @example
   * ```ts
   * const erc20Transfer = StreamErc20Transfer.create(data);
   * ```
   * @returns an instance of StreamErc20Transfer
   */
  static create(data: StreamErc20Transferish, core?: Core) {
    if (data instanceof StreamErc20Transfer) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new StreamErc20Transfer(data, finalCore);
  }

  private static parse = (data: StreamErc20TransferInput, core: Core): StreamErc20TransferData => {
    const chain = EvmChain.create(data.chain, core);
    return {
      ...data,
      chain,
      from: EvmAddress.create(data.from, core),
      to: EvmAddress.create(data.to, core),
      logIndex: +data.logIndex,
      contract: EvmAddress.create(data.contract, core),
      value: BigNumber.create(data.value),
      valueWithDecimals: maybe(data.valueWithDecimals),
      tokenDecimals: data.tokenDecimals === '' ? undefined : +data.tokenDecimals,
      triggers: maybe(data.triggers, (triggers) =>
        triggers.map((trigger) => StreamTriggerOutput.create(trigger, core)),
      ),
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

    if (erc20TransferA.triggers?.length !== erc20TransferB.triggers?.length) {
      return false;
    } else {
      const triggerResultsA = erc20TransferA.triggers || [];
      const triggerResultsB = erc20TransferB.triggers || [];

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
      chain: chain.format(),
      from: from.format(),
      to: to.format(),
      contract: contract.format(),
      value: value.toString(),
      triggers: triggers?.map((trigger) => trigger.format()),
    };
  }

  /**
   * Converts the StreamErc20Transfer instance to a JSON object.
   * @returns JSON object of the StreamErc20Transfer instance
   * @example `erc20Transfer.format()`
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
