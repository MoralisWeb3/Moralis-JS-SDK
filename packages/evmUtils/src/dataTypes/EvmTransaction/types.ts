import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/core';
import {
  EvmAddress,
  EvmAddressish,
  EvmChainish,
  EvmChain,
  EvmNative,
  EvmNativeish,
  EvmTransactionLogish,
  EvmTransactionLog,
} from '@moralisweb3/evm-utils';

export interface EvmTransacionInput {
  from: EvmAddressish;
  to?: null | EvmAddressish;
  nonce?: null | BigNumberish;
  data?: null | string;
  value?: null | EvmNativeish;
  hash: string;

  type?: null | number;

  chain: EvmChainish;

  gas?: null | BigNumberish;
  gasPrice: BigNumberish;

  index: number | string;
  blockNumber: BigNumberish;
  blockHash: string;
  blockTimestamp: DateInput;

  // After receipt
  cumulativeGasUsed: BigNumberish;
  gasUsed: BigNumberish;
  contractAddress?: null | EvmAddressish;
  receiptRoot?: null | string;
  receiptStatus?: null | string | number;

  logs?: EvmTransactionLogish[];
}

export interface EvmTransactionData {
  from: EvmAddress;
  to?: EvmAddress;
  nonce?: BigNumber;
  data?: string;
  value?: EvmNative;
  hash: string;

  type?: number;

  chain: EvmChain;

  gas?: BigNumber;
  gasPrice: BigNumber;

  index: number;
  blockNumber: BigNumber;
  blockHash: string;
  blockTimestamp: Date;

  // After receipt
  cumulativeGasUsed: BigNumber;
  gasUsed: BigNumber;
  contractAddress?: EvmAddress;
  receiptRoot?: string;
  receiptStatus?: number;

  logs: EvmTransactionLog[];
}
