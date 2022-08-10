import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmNativeish, EvmNative } from '../EvmNative';

export interface EvmNftTradeInput {
  chain: EvmChainish;
  transactionHash: string;
  transactionIndex: string | number;
  tokenIds: string[];
  sellerAddress: EvmAddressish;
  buyerAddress: EvmAddressish;
  tokenAddress: EvmAddressish;
  marketplaceAddress: EvmAddressish;
  price: EvmNativeish;
  priceTokenAddress?: null | EvmAddressish;
  blockTimestamp: DateInput;
  blockNumber: BigNumberish;
  blockHash: string;
}

export interface EvmNftTradeData {
  chain: EvmChain;
  transactionHash: string;
  transactionIndex: number;
  tokenIds: string[];
  sellerAddress: EvmAddress;
  buyerAddress: EvmAddress;
  tokenAddress: EvmAddress;
  marketplaceAddress: EvmAddress;
  price: EvmNative;
  priceTokenAddress?: EvmAddress;
  blockTimestamp: DateInput;
  blockNumber: BigNumber;
  blockHash: string;
}
