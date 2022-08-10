import { DateInput } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralisweb3/evm-utils';
import { EvmNftContractType } from '../EvmNftContractType';

export interface EvmNftMetadataInput {
  chain: EvmChainish;
  tokenAddress: EvmAddressish;
  name: string;
  symbol: string;
  contractType: EvmNftContractType;
  syncedAt?: null | DateInput;
}

export interface EvmNftMetadataData {
  chain: EvmChain;
  tokenAddress: EvmAddress;
  name: string;
  symbol: string;
  contractType: EvmNftContractType;
  syncedAt?: DateInput;
}
