import Core, { CoreProvider, MoralisDataObject } from '@moralisweb3/common-core';
import { EvmAddress, EvmNative } from '@moralisweb3/common-evm-utils';
import { StreamNativeBalanceData, StreamNativeBalanceInput, StreamNativeBalanceJSON } from './types';

export type StreamNativeBalanceish = StreamNativeBalance | StreamNativeBalanceInput | StreamNativeBalanceData;

/**
 * The NativeBalance class is a representation of a nativeBalance-address pair
 *
 * @category DataType
 */
export class StreamNativeBalance implements MoralisDataObject {
  private readonly _data: StreamNativeBalanceData;

  constructor(data: StreamNativeBalanceInput, core: Core) {
    this._data = StreamNativeBalance.parse(data, core);
  }

  static create(data: StreamNativeBalanceish, core?: Core) {
    if (data instanceof StreamNativeBalance) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new StreamNativeBalance(data, finalCore);
  }

  private static parse(input: StreamNativeBalanceInput, core: Core): StreamNativeBalanceData {
    return {
      address: EvmAddress.create(input.address),
      balance: EvmNative.create(input.balance, 'wei'),
    };
  }

  static equals(valueA: StreamNativeBalanceish, valueB: StreamNativeBalanceish) {
    const nativeBalanceTriggerA = StreamNativeBalance.create(valueA);
    const nativeBalanceTriggerB = StreamNativeBalance.create(valueB);

    return (
      nativeBalanceTriggerA.address.equals(nativeBalanceTriggerB.address) &&
      nativeBalanceTriggerA.balance.equals(nativeBalanceTriggerB.balance)
    );
  }

  /**
   * Compares an NativeBalance data to this NativeBalance instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * nativeBalanceTrigger.equals(value);
   * ```
   */
  equals(value: StreamNativeBalanceish) {
    return StreamNativeBalance.equals(this, value);
  }

  /**
   * Converts the NativeBalance instance to a JSON object.
   * @returns JSON object of the NativeBalance instance
   * @example `nativeBalanceTrigger.toJSON()`
   */
  toJSON(): StreamNativeBalanceJSON {
    const { address, balance } = this._data;
    return {
      address: address.toJSON(),
      balance: balance.format(),
    };
  }

  /**
   * Converts the NativeBalance instance to a JSON object.
   * @returns JSON object of the NativeBalance instance
   * @example `nativeBalanceTrigger.format()`
   */
  format() {
    return this.toJSON();
  }

  get address() {
    return this._data.address;
  }

  get balance() {
    return this._data.balance;
  }
}
