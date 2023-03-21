import Core, { CoreProvider } from '@moralisweb3/common-core';
import { EvmTransactionLog } from '../EvmTransactionLog/EvmTransactionLog';
import { EvmTransactionLogDecodedData, EvmTransactionLogDecodedInput } from './types';

/**
 * This can be any valid {@link EvmTransactionLogDecodedInput} or {@link EvmTransactionLogDecoded}.
 */
export type EvmTransactionLogDecodedish = EvmTransactionLogDecodedInput | EvmTransactionLogDecoded;

/**
 * The EvmTransactionLogDecoded class is a MoralisData that references an EVM decoded transaction log.
 *
 * @category DataType
 */
export class EvmTransactionLogDecoded extends EvmTransactionLog {
  /**
   * Create a new instance of EvmTransactionLogDecoded from any valid address input
   *
   * @example
   * ```
   * const log = EvmTransactionLogDecoded.create(value, core);
   * ```
   * @param value - A valid EvmTransactionLogDecodedish
   * @param core - The Core instance
   */
  static create(value: EvmTransactionLogDecodedish, core?: Core) {
    if (value instanceof EvmTransactionLogDecoded) {
      return value;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new EvmTransactionLogDecoded(value, finalCore);
  }

  protected _value;

  constructor(value: EvmTransactionLogDecodedInput, core: Core) {
    super(value, core);
    this._value = EvmTransactionLogDecoded.parse(value, core);
  }

  static parse(value: EvmTransactionLogDecodedInput, core: Core): EvmTransactionLogDecodedData {
    const data = super.parse(value, core);
    return {
      ...data,
      decodedEvent: value.decodedEvent,
    };
  }

  get decodedEvent() {
    return this._value.decodedEvent;
  }
}
