import { BigNumber, BigNumberish } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish, EvmChainish, EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTriggerResult, StreamTriggerResultish, StreamTriggerResultJSON } from '@moralisweb3/common-streams-utils';

export interface StreamEvmInternalTransactionInput {
  chain: EvmChainish;
  from?: null | EvmAddressish;
  to?: null | EvmAddressish;
  value?: null | BigNumberish;
  transactionHash: string;
  gas?: null | BigNumberish;
  triggers?: StreamTriggerResultish[];
}

export interface StreamEvmInternalTransactionData {
  chain: EvmChain;
  from?: EvmAddress;
  to?: EvmAddress;
  value?: BigNumber;
  transactionHash: string;
  gas?: BigNumber;
  triggers?: StreamTriggerResult[];
}

export type StreamEvmInternalTransactionJSON = {
  chain: string | number;
  from?: string;
  to?: string;
  value?: string;
  transactionHash: string;
  gas?: string;
  triggers?: StreamTriggerResultJSON[];
};
