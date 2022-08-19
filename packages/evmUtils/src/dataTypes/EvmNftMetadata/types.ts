import { DateInput } from '@moralisweb3/core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmNftContractType } from '../EvmNftContractType';

export interface EvmNftMetadataInput {
  chain: EvmChainish;
  tokenAddress: EvmAddressish;
  name: string;
  symbol: string;
  contractType: EvmNftContractType | null;
  syncedAt: DateInput | null;
}

export interface EvmNftMetadataData {
  chain: EvmChain;
  tokenAddress: EvmAddress;
  name: string;
  symbol: string;
  contractType: EvmNftContractType | null;
  syncedAt?: DateInput;
}
