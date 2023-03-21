import Core, { maybe, CoreProvider, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTrigger } from '../StreamTrigger';
import { EvmStreamData, EvmStreamInput, EvmStreamJSON } from './types';

export type EvmStreamish = EvmStreamInput | EvmStream;

/**
 * The EvmStream class is a representation of Moralis Stream that is returned by the Moralis Stream API
 *
 * @category DataType
 */
export class EvmStream implements MoralisDataObject {
  private _data: EvmStreamData;

  constructor(data: EvmStreamInput, core: Core) {
    this._data = EvmStream.parse(data, core);
  }

  /**
   * Create a new instance of EvmStream
   *
   * @param data - the EvmStreamish type
   * @param core - the Core instance
   * @example
   * ```ts
   * const evmStream = EvmStream.create(data);
   * ```
   * @returns an instance of EvmStream
   */
  static create(data: EvmStreamish, core?: Core) {
    if (data instanceof EvmStream) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new EvmStream(data, finalCore);
  }

  private static parse = (data: EvmStreamInput, core: Core): EvmStreamData => {
    return {
      ...data,
      chains: data.chainIds.map((chainId) => EvmChain.create(chainId, core)),
      topic0: maybe(data.topic0),
      allAddresses: data.allAddresses ?? false,
      includeContractLogs: data.includeContractLogs ?? false,
      includeInternalTxs: data.includeInternalTxs ?? false,
      includeAllTxLogs: data.includeAllTxLogs ?? false,
      includeNativeTxs: data.includeNativeTxs ?? false,
      advancedOptions: maybe(data.advancedOptions),
      abi: maybe(data.abi),
      triggers: maybe(data.triggers, (triggers) => triggers.map((trigger) => StreamTrigger.create(trigger, core))),
      getNativeBalances: maybe(data.getNativeBalances),
    };
  };

  /**
   * Compares two EvmStream data. It checks a deep equality check of both values.
   * @param valueA - the first EvmStreamish data to compare
   * @param valueB - the second EvmStreamish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  EvmStream.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: EvmStreamish, valueB: EvmStreamish) {
    const evmStreamA = EvmStream.create(valueA);
    const evmStreamB = EvmStream.create(valueB);

    if (evmStreamA.id !== evmStreamB.id) {
      return false;
    }

    if (
      evmStreamA.triggers?.length !== evmStreamB.triggers?.length ||
      !StreamTrigger.arrayEquals(evmStreamA.triggers || [], evmStreamB.triggers || [])
    ) {
      return false;
    }

    return true;
  }

  /**
   * Compares an EvmStreamish data to this EvmStream instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * evmStream.equals(value);
   * ```
   */
  equals(value: EvmStreamish): boolean {
    return EvmStream.equals(this, value);
  }

  /**
   * Converts the EvmStream instance to a JSON object.
   * @returns JSON object of the EvmStream instance
   * @example `evmStream.toJSON()`
   */
  toJSON(): EvmStreamJSON {
    const { chains, triggers, ...data } = this._data;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return {
      ...data,
      chainIds: chains.map((chain) => chain.format()),
      triggers: triggers?.map((trigger) => trigger.format()),
    };
  }

  /**
   * Converts the EvmStream instance to a JSON object.
   * @returns JSON object of the EvmStream instance
   * @example `evmStream.format()`
   */
  format() {
    return this.toJSON();
  }

  get chains() {
    return this._data.chains;
  }

  get chainIds() {
    return this._data.chains.map((chain) => chain.format());
  }

  get webhookUrl() {
    return this._data.webhookUrl;
  }

  get description() {
    return this._data.description;
  }

  get tag() {
    return this._data.tag;
  }

  get topic0() {
    return this._data.topic0;
  }

  get allAddresses() {
    return this._data.allAddresses;
  }

  get includeNativeTxs() {
    return this._data.includeNativeTxs;
  }

  get includeContractLogs() {
    return this._data.includeContractLogs;
  }

  get includeInternalTxs() {
    return this._data.includeInternalTxs;
  }

  get includeAllTxLogs() {
    return this._data.includeAllTxLogs;
  }

  get abi() {
    return this._data.abi;
  }

  get advancedOptions() {
    return this._data.advancedOptions;
  }

  get id() {
    return this._data.id;
  }

  get status() {
    return this._data.status;
  }

  get statusMessage() {
    return this._data.statusMessage;
  }

  get triggers() {
    return this._data.triggers;
  }

  get getNativeBalances() {
    return this._data.getNativeBalances;
  }
}
