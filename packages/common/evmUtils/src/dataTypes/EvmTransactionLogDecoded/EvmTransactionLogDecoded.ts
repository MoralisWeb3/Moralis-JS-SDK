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
   */
  static create(value: EvmTransactionLogDecodedish) {
    if (value instanceof EvmTransactionLogDecoded) {
      return value;
    }
    return new EvmTransactionLogDecoded(value);
  }

  protected _value;

  constructor(value: EvmTransactionLogDecodedInput) {
    super(value);
    this._value = EvmTransactionLogDecoded.parse(value);
  }

  static parse(value: EvmTransactionLogDecodedInput): EvmTransactionLogDecodedData {
    const data = super.parse(value);
    return {
      ...data,
      decodedEvent: value.decodedEvent,
    };
  }

  get decodedEvent() {
    return this._value.decodedEvent;
  }
}
