import { EvmTransactionLogData, EvmTransactionLogInput } from '../EvmTransactionLog/types';

export type EvmTransactionLogDecodedEventParam = {
  name?: string;
  value?: string;
  type?: string;
};
export interface EvmTransactionLogDecodedEvent {
  signature?: string;
  label?: string;
  type?: string;
  params?: EvmTransactionLogDecodedEventParam[];
}
/**
 * This can be any object with valid verbose transaction data.
 */
export interface EvmTransactionLogDecodedInput extends EvmTransactionLogInput {
  decodedEvent: EvmTransactionLogDecodedEvent;
}

/**
 * This is the return type of the processed EVM verbose transaction
 */
export interface EvmTransactionLogDecodedData extends EvmTransactionLogData {
  decodedEvent: EvmTransactionLogDecodedEvent;
}
