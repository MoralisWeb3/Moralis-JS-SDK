import Core, { BigNumber, maybe, CoreProvider, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain, EvmSignature } from '@moralisweb3/common-evm-utils';
import { StreamTriggerResult } from '@moralisweb3/common-streams-utils';
import { StreamEvmTransactionData, StreamEvmTransactionInput, StreamEvmTransactionJSON } from './types';

type StreamEvmTransactionish = StreamEvmTransaction | StreamEvmTransactionInput;

/**
 * The StreamEvmTransaction class is a representation of a transaction that is returned by the Moralis Stream API
 *
 * @category DataType
 */
export class StreamEvmTransaction implements MoralisDataObject {
  private _data: StreamEvmTransactionData;

  constructor({ ...data }: StreamEvmTransactionInput, core: Core) {
    this._data = StreamEvmTransaction.parse(data, core);
  }

  /**
   * Create a new instance of StreamEvmTransactionish
   *
   * @param data - the StreamEvmTransactionishish type
   * @param core - the Core instance
   * @example
   * ```ts
   * const transaction = StreamEvmTransactionish.create(data);
   * ```
   * @returns an instance of StreamEvmTransaction
   */
  static create(data: StreamEvmTransactionish, core?: Core) {
    if (data instanceof StreamEvmTransaction) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new StreamEvmTransaction(data, finalCore);
  }

  private static parse(data: StreamEvmTransactionInput, core: Core): StreamEvmTransactionData {
    const signature =
      data.r != null && data.s != null && data.v != null
        ? EvmSignature.create({ r: data.r, s: data.s, v: data.v })
        : undefined;

    return {
      ...data,
      chain: EvmChain.create(data.chain, core),
      gas: maybe(data.gas, BigNumber.create),
      gasPrice: maybe(data.gasPrice, BigNumber.create),
      nonce: maybe(data.nonce, BigNumber.create),
      input: maybe(data.input),
      fromAddress: EvmAddress.create(data.fromAddress, core),
      toAddress: maybe(data.toAddress, (address) => EvmAddress.create(address, core)),
      value: maybe(data.value, BigNumber.create),
      type: maybe(data.type, (type) => +type),
      receiptCumulativeGasUsed: maybe(data.receiptCumulativeGasUsed, BigNumber.create),
      receiptGasUsed: maybe(data.receiptGasUsed, BigNumber.create),
      receiptContractAddress: maybe(data.receiptContractAddress, (address) => EvmAddress.create(address, core)),
      receiptRoot: maybe(data.receiptRoot),
      receiptStatus: maybe(data.receiptStatus, (status) => +status),
      signature,
      transactionIndex: +data.transactionIndex,
      triggers: maybe(data.triggers, (triggers) => triggers.map((trigger) => StreamTriggerResult.create(trigger, core))),
    };
  }

  /**
   * Compares two StreamEvmTransaction data. It checks a deep equality check of both values.
   * @param valueA - the first StreamEvmTransactionish data to compare
   * @param valueB - the second StreamEvmTransactionish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamEvmTransaction.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamEvmTransactionish, valueB: StreamEvmTransactionish) {
    const transactionA = StreamEvmTransaction.create(valueA);
    const transactionB = StreamEvmTransaction.create(valueB);

    if (!transactionA.chain.equals(transactionB.chain)) {
      return false;
    }

    if (transactionA.hash !== transactionB.hash) {
      return false;
    }

    if (transactionA.triggers?.length !== transactionB.triggers?.length) {
      return false;
    } else {
      const triggerResultsA = transactionA.triggers || [];
      const triggerResultsB = transactionB.triggers || [];

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
   * Compares an StreamEvmTransactionish data to this StreamEvmTransaction instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * transaction.equals(value);
   * ```
   */
  equals(value: StreamEvmTransactionish): boolean {
    return StreamEvmTransaction.equals(this, value);
  }

  /**
   * Converts the StreamEvmTransaction instance to a JSON object.
   * @returns JSON object of the StreamEvmTransaction instance
   * @example `transaction.toJSON()`
   */
  toJSON(): StreamEvmTransactionJSON {
    const {
      chain,
      gas,
      gasPrice,
      nonce,
      fromAddress,
      toAddress,
      value,
      receiptContractAddress,
      receiptCumulativeGasUsed,
      receiptGasUsed,
      signature,
      triggers,
      ...data
    } = this._data;

    return {
      ...data,
      chain: chain.format(),
      gas: gas?.toString(),
      gasPrice: gasPrice?.toString(),
      nonce: nonce?.toString(),
      fromAddress: fromAddress.format(),
      toAddress: toAddress?.format(),
      value: value?.toString(),
      receiptCumulativeGasUsed: receiptCumulativeGasUsed?.toString(),
      receiptGasUsed: receiptGasUsed?.toString(),
      receiptContractAddress: receiptContractAddress?.format(),
      r: signature?.r,
      s: signature?.s,
      v: signature?.v,
      triggers: triggers?.map((trigger) => trigger.format()),
    };
  }

  /**
   * Converts the StreamEvmTransaction instance to a JSON object.
   * @returns JSON object of the StreamEvmTransaction instance
   * @example `transaction.toJSON()`
   */
  format() {
    return this.toJSON();
  }

  get chain() {
    return this._data.chain;
  }

  get input() {
    return this._data.input;
  }

  get transactionIndex() {
    return this._data.transactionIndex;
  }

  get fromAddress() {
    return this._data.fromAddress;
  }

  get toAddress() {
    return this._data.toAddress;
  }

  get receiptGasUsed() {
    return this._data.receiptGasUsed;
  }

  get receiptCumulativeGasUsed() {
    return this._data.receiptCumulativeGasUsed;
  }

  get receiptContractAddress() {
    return this._data.receiptContractAddress;
  }

  get signature() {
    return this._data.signature;
  }

  get r() {
    return this.signature?.r;
  }

  get s() {
    return this.signature?.s;
  }

  get v() {
    return this.signature?.v;
  }

  get hash() {
    return this._data.hash;
  }

  get gas() {
    return this._data.gas;
  }

  get gasPrice() {
    return this._data.gasPrice;
  }

  get nonce() {
    return this._data.nonce;
  }

  get value() {
    return this._data.value;
  }

  get type() {
    return this._data.type;
  }

  get receiptRoot() {
    return this._data.receiptRoot;
  }

  get receiptStatus() {
    return this._data.receiptStatus;
  }

  get triggers() {
    return this._data.triggers;
  }
}
