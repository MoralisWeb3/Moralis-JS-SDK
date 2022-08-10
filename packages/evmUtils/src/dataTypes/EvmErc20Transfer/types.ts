import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralisweb3/evm-utils';

// TODO: get decimal value from api
export interface EvmErc20TransferInput {
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

export interface EvmErc20TransferData {
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
