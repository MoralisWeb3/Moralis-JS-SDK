import { BigNumber, BigNumberish } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChainish, EvmChain } from '@moralisweb3/common-evm-utils';

export interface StreamErc20TransferInput {
  chain: EvmChainish;
  transactionHash: string;
  contract: EvmAddressish;
  logIndex: string | number;

  from: EvmAddressish;
  to: EvmAddressish;
  value: BigNumberish;

  tokenDecimals: number | string;
  tokenName: string;
  tokenSymbol: string;
  valueWithDecimals?: null | string;
}

export interface StreamErc20TransferData {
  chain: EvmChain;
  transactionHash: string;
  contract: EvmAddress;
  logIndex: string | number;

  from: EvmAddress;
  to: EvmAddress;
  value: BigNumber;

  tokenDecimals?: number;
  tokenName: string;
  tokenSymbol: string;
  valueWithDecimals?: string;
}

export type StreamErc20TransferJSON = {
  chain: number | string;
  transactionHash: string;
  contract: string;
  logIndex: string | number;

  from: string;
  to: string;
  value: string;

  tokenDecimals?: number;
  tokenName: string;
  tokenSymbol: string;
  valueWithDecimals?: string;
};
