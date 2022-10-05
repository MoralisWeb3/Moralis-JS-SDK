import { EvmAddress, EvmAddressish, EvmChainish, EvmChain, EvmNftContractType } from '@moralisweb3/evm-utils';

export interface StreamErc1155ApprovalData {
  chain: EvmChain;
  transactionHash: string;
  contract: EvmAddress;
  logIndex: number;
  tag: string;
  account: EvmAddress;
  operator: EvmAddress;
  approved: boolean;
  tokenContractType: EvmNftContractType;
  tokenName: string;
  tokenSymbol: string;
}

export interface StreamErc1155ApprovalInput {
  chain: EvmChainish;
  transactionHash: string;
  contract: EvmAddressish;
  logIndex: number | string;
  tag: string;
  account: EvmAddressish;
  operator: EvmAddressish;
  approved: boolean;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
}
