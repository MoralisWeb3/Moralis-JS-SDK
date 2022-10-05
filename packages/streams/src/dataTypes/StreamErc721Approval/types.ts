import { EvmAddress, EvmAddressish, EvmChainish, EvmChain, EvmNftContractType } from '@moralisweb3/evm-utils';

export interface StreamErc721ApprovalData {
  chain: EvmChain;
  owner: EvmAddress;
  transactionHash: string;
  contract: EvmAddress;
  logIndex: number;
  tag: string;
  approved: EvmAddress;
  tokenId: string;
  tokenContractType: EvmNftContractType;
  tokenName: string;
  tokenSymbol: string;
}

export interface StreamErc721ApprovalInput {
  chain: EvmChainish;
  owner: EvmAddressish;
  transactionHash: string;
  contract: EvmAddressish;
  logIndex: number | string;
  tag: string;
  approved: EvmAddressish;
  tokenId: string;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
}
