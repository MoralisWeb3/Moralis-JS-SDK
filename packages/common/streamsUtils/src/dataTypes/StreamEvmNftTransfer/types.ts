import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralisweb3/common-evm-utils';

export interface StreamEvmNftTransferInput {
  chain: EvmChainish;
  transactionHash: string;
  contract: EvmAddressish;
  logIndex: string | number;
  operator?: EvmAddressish | null;
  from: EvmAddressish;
  to: EvmAddressish;
  tokenId: string;
  amount: string | number;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
}

export interface StreamEvmNftTransferData {
  chain: EvmChain;
  transactionHash: string;
  contract: EvmAddress;
  logIndex: number;
  operator?: EvmAddress;
  from: EvmAddress;
  to: EvmAddress;
  tokenId: string;
  amount: number;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
}

export type StreamEvmNftTransferJSON = {
  chain: string | number;
  transactionHash: string;
  contract: string;
  logIndex: number;
  operator?: string;
  from: string;
  to: string;
  tokenId: string;
  amount: number;
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
};
