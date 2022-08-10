import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish, EvmNative, EvmNativeish } from '@moralisweb3/evm-utils';

export interface EvmNftTransferInput {
  chain: EvmChainish;
  amount?: null | string | number;
  blockHash: string;
  blockNumber: BigNumberish;
  blockTimestamp: DateInput;
  contractType: string;
  fromAddress?: null | EvmAddressish;
  value?: null | EvmNativeish;
  logIndex: number;
  toAddress: EvmAddressish;
  tokenAddress: EvmAddressish;
  tokenId: string;
  transactionHash: string;
  transactionIndex?: null | string | number;
  transactionType?: null | string;
  operator?: null | EvmAddressish;
}

export interface EvmNftTransferData {
  chain: EvmChain;
  amount?: number;
  blockHash: string;
  blockNumber: BigNumber;
  blockTimestamp: Date;
  contractType: string;
  fromAddress?: EvmAddress;
  value?: EvmNative;
  logIndex: number;
  toAddress: EvmAddress;
  tokenAddress: EvmAddress;
  tokenId: string;
  transactionHash: string;
  transactionIndex?: number;
  transactionType?: string;
  operator?: EvmAddress;
}
