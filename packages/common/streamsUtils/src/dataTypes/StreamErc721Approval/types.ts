import { EvmAddress, EvmAddressish, EvmChainish, EvmChain } from '@moralisweb3/common-evm-utils';
import { StreamTriggerOutput, StreamTriggerOutputish, StreamTriggerOutputJSON } from '../StreamTriggerOutput';

export interface StreamErc721ApprovalInput {
  chain: EvmChainish;
  owner: EvmAddressish;
  transactionHash: string;
  contract: EvmAddressish;
  logIndex: number | string;
  approved: EvmAddressish;
  tokenId: string;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
  triggers?: StreamTriggerOutputish[];
}

export interface StreamErc721ApprovalData {
  chain: EvmChain;
  owner: EvmAddress;
  transactionHash: string;
  contract: EvmAddress;
  logIndex: number;
  approved: EvmAddress;
  tokenId: string;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
  triggers?: StreamTriggerOutput[];
}

export type StreamErc721ApprovalJSON = {
  chain: number | string;
  owner: string;
  transactionHash: string;
  contract: string;
  logIndex: number;
  approved: string;
  tokenId: string;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
  triggers?: StreamTriggerOutputJSON[];
};
