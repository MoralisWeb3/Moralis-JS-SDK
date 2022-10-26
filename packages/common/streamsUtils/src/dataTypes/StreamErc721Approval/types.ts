import { EvmAddress, EvmAddressish, EvmChainish, EvmChain } from '@moralisweb3/common-evm-utils';

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
};
