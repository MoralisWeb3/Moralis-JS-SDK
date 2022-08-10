import { BigNumber, BigNumberish, DateInput, MoralisDataObjectValue } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmChain, EvmAddress } from '@moralisweb3/evm-utils';
import { EvmNftContractType } from '../EvmNftContractType';

export interface EvmNftInput {
  tokenId: number | string;
  contractType: string;
  chain: EvmChainish;
  tokenUri?: null | string;
  tokenAddress: EvmAddressish;
  tokenHash?: null | string;
  metadata?: null | string;
  name?: null | string;
  symbol?: null | string;

  ownerOf?: null | EvmAddressish;
  blockNumberMinted?: null | BigNumberish;
  blockNumber?: null | BigNumberish;
  lastMetadataSync?: null | DateInput;
  lastTokenUriSync?: null | DateInput;

  amount?: null | number | string;
}

export interface EvmNftData {
  tokenId: number | string;
  contractType: EvmNftContractType;
  chain: EvmChain;
  tokenUri?: string;
  tokenAddress: EvmAddress;
  tokenHash?: string;
  metadata: MoralisDataObjectValue;
  name?: string;
  symbol?: string;

  ownerOf?: EvmAddress;
  blockNumberMinted?: BigNumber;
  blockNumber?: BigNumber;
  lastMetadataSync?: Date;
  lastTokenUriSync?: Date;

  amount?: number;
}
