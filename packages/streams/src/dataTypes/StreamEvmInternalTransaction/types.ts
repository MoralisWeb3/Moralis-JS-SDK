import { BigNumber, BigNumberish } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChainish, EvmChain } from '@moralisweb3/evm-utils';

export interface StreamEvmInternalTransactionData {
  chain: EvmChain;
  from?: EvmAddress;
  to?: EvmAddress;
  value?: BigNumber;
  transactionHash: string;
  gas?: BigNumber;
  streamId: string;
  tag: string;
}

export interface StreamEvmInternalTransactionInput {
  chain: EvmChainish;
  from?: null | EvmAddressish;
  to?: null | EvmAddressish;
  value?: null | BigNumberish;
  transactionHash: string;
  gas?: null | BigNumberish;
  streamId: string;
  tag: string;
}
