import { EvmChain, EvmChainish } from '@moralisweb3/common-evm-utils';
import { EvmAbi } from '../EvmAbi';

export type EvmStreamAdvancedOptions = {
  topic0: string;
  filter?: Record<string, any>;
  includeNativeTxs?: boolean;
};
export interface EvmStreamInput {
  webhookUrl: string;
  description: string;
  tag: string;
  topic0?: string[] | null;
  allAddresses?: boolean;
  includeNativeTxs?: boolean;
  includeContractLogs?: boolean;
  includeInternalTxs?: boolean;
  abi?: EvmAbi | null;
  advancedOptions?: EvmStreamAdvancedOptions[] | null;
  chainIds: EvmChainish[];
  id: string;
  status: string;
  statusMessage: string;
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
  abi?: EvmAbi;
  advancedOptions?: EvmStreamAdvancedOptions[];
  chains: EvmChain[];
  id: string;
  status: string;
  statusMessage: string;
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
  abi?: EvmAbi;
  advancedOptions?: EvmStreamAdvancedOptions[];
  chainIds: (string | number)[];
  id: string;
  status: string;
  statusMessage: string;
};
