import { EvmChain, EvmChainish } from '@moralisweb3/common-evm-utils';
import { StreamTrigger, StreamTriggerish, StreamTriggerJSON } from '../StreamTrigger';
import { EvmAbi } from '../EvmAbi';

export type EvmStreamAdvancedOptions = {
  topic0: string;
  // TODO: add better typings to help devs create a filter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: Record<string, any>;
  includeNativeTxs?: boolean;
};

export type GetNativeBalanceType = 'tx' | 'log' | 'erc20transfer' | 'erc20approval' | 'nfttransfer' | 'internalTx';

export interface EvmStreamInput {
  webhookUrl: string;
  description: string;
  tag: string;
  topic0?: string[] | null;
  allAddresses?: boolean;
  includeNativeTxs?: boolean;
  includeContractLogs?: boolean;
  includeInternalTxs?: boolean;
  includeAllTxLogs?: boolean;
  abi?: EvmAbi | null;
  advancedOptions?: EvmStreamAdvancedOptions[] | null;
  chainIds: EvmChainish[];
  id: string;
  status: string;
  statusMessage: string;
  triggers?: StreamTriggerish[] | null;
  getNativeBalances?:
    | {
        selectors: string[];
        type: GetNativeBalanceType;
      }[];
}

export interface EvmStreamData {
  webhookUrl: string;
  description: string;
  tag: string;
  topic0?: string[];
  allAddresses: boolean;
  includeNativeTxs: boolean;
  includeContractLogs: boolean;
  includeInternalTxs: boolean;
  includeAllTxLogs: boolean;
  abi?: EvmAbi;
  advancedOptions?: EvmStreamAdvancedOptions[];
  chains: EvmChain[];
  id: string;
  status: string;
  statusMessage: string;
  triggers?: StreamTrigger[];
  getNativeBalances?: {
    selectors: string[];
    type: GetNativeBalanceType;
  }[];
}

export type EvmStreamJSON = {
  webhookUrl: string;
  description: string;
  tag: string;
  topic0?: string[];
  allAddresses: boolean;
  includeNativeTxs: boolean;
  includeContractLogs: boolean;
  includeInternalTxs: boolean;
  includeAllTxLogs: boolean;
  abi?: EvmAbi;
  advancedOptions?: EvmStreamAdvancedOptions[];
  chainIds: (string | number)[];
  id: string;
  status: string;
  statusMessage: string;
  triggers?: StreamTriggerJSON[];
  getNativeBalances?: {
    selectors: string[];
    type: GetNativeBalanceType;
  }[];
};
