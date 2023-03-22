import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmTransactionData, EvmTransactionInput } from '../EvmTransaction/types';
import {
  EvmTransactionLogDecoded,
  EvmTransactionLogDecodedEvent,
  EvmTransactionLogDecodedish,
} from '../EvmTransactionLogDecoded';

/**
 * This can be any object with valid verbose transaction data.
 */
export interface EvmTransactionVerboseInput extends EvmTransactionInput {
  chain: EvmChainish;
  logs: EvmTransactionLogDecodedish[];
  decodedCall: EvmTransactionLogDecodedEvent;
}

/**
 * This is the return type of the processed EVM verbose transaction
 */
export interface EvmTransactionVerboseData extends EvmTransactionData {
  chain: EvmChain;
  logs: EvmTransactionLogDecoded[];
  decodedCall: EvmTransactionLogDecodedEvent;
}
