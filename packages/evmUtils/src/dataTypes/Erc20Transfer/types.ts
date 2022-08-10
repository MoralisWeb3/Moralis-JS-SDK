import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';

// TODO: get decimal value from api
export interface Erc20TransferInput {
  chain: EvmChainish;
  transactionHash: string;
  address: EvmAddressish;
  blockTimestamp: DateInput;
  blockNumber: BigNumberish;
  blockHash: string;
  toAddress: EvmAddressish;
  fromAddress: EvmAddressish;
  value: BigNumberish;
}

export interface Erc20TransferData {
  chain: EvmChain;
  transactionHash: string;
  address: EvmAddress;
  blockTimestamp: Date;
  blockNumber: BigNumber;
  blockHash: string;
  toAddress: EvmAddress;
  fromAddress: EvmAddress;
  value: BigNumber;
}
