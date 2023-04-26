import { EvmTransaction } from '../EvmTransaction/EvmTransaction';
import { EvmTransactionLogDecoded } from '../EvmTransactionLogDecoded';
import { EvmTransactionVerboseInput, EvmTransactionVerboseData } from './types';

/**
 * Valid input for a new EvmTransactionVerbose instance.
 * This can be an existing {@link EvmTransactionVerbose} or a valid {@link EvmTransactionVerboseInput} object
 */
export type EvmTransactionVerboseish = EvmTransactionVerboseInput | EvmTransactionVerbose;

/**
 * The EvmTransactionVerbose is a representation of a published transaction.
 *
 * Use this class any time you work with a transaction.
 *
 * @category DataType
 */
export class EvmTransactionVerbose extends EvmTransaction {
  /**
   * Create a new instance of EvmTransactionVerbose from any valid transaction input
   * @param data - the EvmTransactionVerboseish type
   * @example
   * ```
   * const transaction = EvmTransactionVerbose.create(data);
   *```
   */
  static create(data: EvmTransactionVerboseish) {
    if (data instanceof EvmTransactionVerbose) {
      return data;
    }
    return new EvmTransactionVerbose(data);
  }

  constructor(data: EvmTransactionVerboseInput) {
    super(data);
    this._data = EvmTransactionVerbose.parse(data);
  }

  protected _data;

  static parse = (data: EvmTransactionVerboseInput): EvmTransactionVerboseData => {
    const parsed = super.parse(data);
    return {
      ...parsed,
      logs: data.logs.map((log) => EvmTransactionLogDecoded.create(log)),
      decodedCall: data.decodedCall,
    };
  };

  get decodedCall() {
    return this._data.decodedCall;
  }

  get logs() {
    return this._data.logs;
  }
}
