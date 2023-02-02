import { EvmAddress, EvmAddressish } from '@moralisweb3/common-evm-utils';
import { StreamSelector, StreamSelectorish } from '../StreamSelector';

export interface StreamTriggerInput {
  type: 'tx' | 'log' | 'erc20transfer' | 'erc20approval' | 'nfttransfer';
  contractAddress: StreamSelectorish | EvmAddressish;
  functionAbi: unknown;
  inputs?: (string | string[])[];
  topic0?: string;
  callFrom?: StreamSelectorish | EvmAddressish;
}

export interface StreamTriggerData {
  type: 'tx' | 'log' | 'erc20transfer' | 'erc20approval' | 'nfttransfer';
  contractAddress: StreamSelector | EvmAddress;
  functionAbi: unknown;
  inputs?: (string | string[])[];
  topic0?: string;
  callFrom?: StreamSelector | EvmAddress;
}

export type StreamTriggerJSON = {
  type: 'tx' | 'log' | 'erc20transfer' | 'erc20approval' | 'nfttransfer';
  contractAddress: string;
  functionAbi: any;
  inputs?: (string | string[])[];
  topic0?: string;
  callFrom?: string;
};
