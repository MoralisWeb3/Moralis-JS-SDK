import { BigNumber, BigNumberish } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChainish, EvmChain } from '@moralisweb3/evm-utils';

export interface StreamErc20ApprovalData {
  chain: EvmChain;
  transactionHash: string;
  tokenAddress: EvmAddress;
  logIndex: number;
  tag: string;
  owner: EvmAddress;
  spender: EvmAddress;
  value: BigNumber;
  tokenDecimals: number;
  tokenName: string;
  tokenSymbol: string;
  valueWithDecimals?: string;
}

export interface StreamErc20ApprovalInput {
  chain: EvmChainish;
  transactionHash: string;
  tokenAddress: EvmAddressish;
  logIndex: string;
  tag: string;
  owner: EvmAddressish;
  spender: EvmAddressish;
  value: BigNumberish;
  tokenDecimals: string;
  tokenName: string;
  tokenSymbol: string;
  valueWithDecimals?: string;
}
