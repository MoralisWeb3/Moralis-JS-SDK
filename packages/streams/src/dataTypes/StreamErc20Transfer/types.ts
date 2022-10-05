import { BigNumberish } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChainish, EvmChain, Erc20Value, Erc20Token } from '@moralisweb3/evm-utils';

export interface StreamErc20TransferData {
  chain: EvmChain;
  transactionHash: string;
  logIndex: number;
  tag: string;
  from: EvmAddress;
  to: EvmAddress;
  tokenValue: Erc20Value;
  token: Erc20Token;
}

export interface StreamErc20TransferInput {
  chain: EvmChainish;
  transactionHash: string;
  logIndex: string | number;
  tag: string;
  from: EvmAddressish;
  to: EvmAddressish;
  value: BigNumberish;
  token: {
    contractAddress: string;
    name: string;
    symbol: string;
    decimals: number;
  };
}
