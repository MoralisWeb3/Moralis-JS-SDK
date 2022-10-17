import { EvmAddress, EvmAddressish, EvmChainish, EvmChain } from '@moralisweb3/evm-utils';

export interface StreamErc1155ApprovalInput {
  chain: EvmChainish;
  transactionHash: string;
  contract: EvmAddressish;
  logIndex: number | string;
  account: EvmAddressish;
  operator: EvmAddressish;
  approved: boolean;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
}
export interface StreamErc1155ApprovalData {
  chain: EvmChain;
  transactionHash: string;
  contract: EvmAddress;
  logIndex: number;
  account: EvmAddress;
  operator: EvmAddress;
  approved: boolean;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
}

export type StreamErc1155ApprovalJSON = {
  chain: number | string;
  transactionHash: string;
  contract: string;
  logIndex: number | string;
  account: string;
  operator: string;
  approved: boolean;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
};
