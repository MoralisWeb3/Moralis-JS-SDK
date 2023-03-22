import Core, { CoreProvider } from '@moralisweb3/common-core';
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
  static create(data: EvmTransactionVerboseish, core?: Core) {
    if (data instanceof EvmTransactionVerbose) {
      return data;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new EvmTransactionVerbose(data, finalCore);
  }

  constructor(data: EvmTransactionVerboseInput, core: Core) {
    super(data, core);
    this._data = EvmTransactionVerbose.parse(data, core);
  }

  protected _data;

  static parse = (data: EvmTransactionVerboseInput, core: Core): EvmTransactionVerboseData => {
    const parsed = super.parse(data, core);
    return {
      ...parsed,
      logs: data.logs.map((log) => EvmTransactionLogDecoded.create(log, core)),
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
