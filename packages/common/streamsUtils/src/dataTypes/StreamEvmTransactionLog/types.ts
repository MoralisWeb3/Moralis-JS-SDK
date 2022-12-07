import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralisweb3/common-evm-utils';
import {
  StreamTriggerOutput,
  StreamTriggerOutputish,
  StreamTriggerOutputJSON,
} from '../StreamTriggerOutput';

export interface StreamEvmTransactionLogInput {
  chain: EvmChainish;
  logIndex: number | string;
  transactionHash: string;
  address: EvmAddressish;
  data: string;
  topic0?: string | null;
  topic1?: string | null;
  topic2?: string | null;
  topic3?: string | null;
  triggers?: StreamTriggerOutputish[];
}

export interface StreamEvmTransactionLogData {
  chain: EvmChain;
  logIndex: number;
  transactionHash: string;
  address: EvmAddress;
  data: string;
  topic0?: string;
  topic1?: string;
  topic2?: string;
  topic3?: string;
  triggers?: StreamTriggerOutput[];
}

export type StreamEvmTransactionLogJSON = {
  chain: string | number;
  logIndex: number;
  transactionHash: string;
  address: string;
  data: string;
  topic0?: string;
  topic1?: string;
  topic2?: string;
  topic3?: string;
  triggers?: StreamTriggerOutputJSON[];
};
