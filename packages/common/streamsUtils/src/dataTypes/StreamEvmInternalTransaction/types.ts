import { BigNumber, BigNumberish } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChainish, EvmChain } from '@moralisweb3/evm-utils';

export interface StreamEvmInternalTransactionInput {
  chain: EvmChainish;
  from?: null | EvmAddressish;
  to?: null | EvmAddressish;
  value?: null | BigNumberish;
  transactionHash: string;
  gas?: null | BigNumberish;
}

export interface StreamEvmInternalTransactionData {
  chain: EvmChain;
  from?: EvmAddress;
  to?: EvmAddress;
  value?: BigNumber;
  transactionHash: string;
  gas?: BigNumber;
}

export type StreamEvmInternalTransactionJSON = {
  chain: string | number;
  from?: string;
  to?: string;
  value?: string;
  transactionHash: string;
  gas?: string;
};
