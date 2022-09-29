import { EvmAddress, EvmAddressish, EvmChainish, EvmChain, EvmNftContractType } from '@moralisweb3/evm-utils';

export interface StreamEvmNftApprovalData {
  chain: EvmChain;
  transactionHash: string;
  logIndex: number;
  tag: string;
  owner?: EvmAddress;
  approved?: boolean;
  tokenId?: string;
  tokenAddress: EvmAddress;
  tokenContractType: EvmNftContractType;
  tokenName: string;
  tokenSymbol: string;
}

export interface StreamEvmNftApprovalInput {
  chain: EvmChainish;
  transactionHash: string;
  logIndex: string;
  tag: string;
  owner?: EvmAddressish;
  approved?: boolean;
  tokenId?: string;
  tokenAddress: EvmAddressish;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
}
