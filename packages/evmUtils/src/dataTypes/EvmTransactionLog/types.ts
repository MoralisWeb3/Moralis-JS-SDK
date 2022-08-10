import { EvmAddressish, EvmAddress } from '../EvmAddress';

export interface EvmTransactionLogInput {
  logIndex?: number;
  transactionHash: string;
  transactionIndex?: number;
  address: EvmAddressish;
  data: string;
  topics: string[];
  blockHash: string;
  blockNumber: number;
  blockTimestamp?: string;
}

export interface EvmTransactionLogData {
  logIndex?: number;
  transactionHash: string;
  transactionIndex?: number;
  address: EvmAddress;
  data: string;
  topics: string[];
  blockHash: string;
  blockNumber: number;
  blockTimestamp?: string;
}
