import { DateInput } from '@moralisweb3/common-core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';

/**
 * Valid ERC20 token input
 *
 * @example
 * ```ts
 * const input = {
 *   chain: 1,
 *   tokenAddress: "0x7de3085b3190b3a787822ee16f23be010f5f8686",
 *   syncedAt: "2022-02-19",
 *   contractType: "ERC721",
 *   symbol: "BAMC",
 * }
 * ```
 */
export interface EvmNftMetadataInput {
  chain: EvmChainish;
  tokenAddress: EvmAddressish;
  name: string;
  symbol: string;
  contractType?: string;
  syncedAt: DateInput | null;
}

/**
 * This is the return type of the processed Evm NFT Metadata
 */
export interface EvmNftMetadataData {
  chain: EvmChain;
  tokenAddress: EvmAddress;
  name: string;
  symbol: string;
  contractType?: string;
  syncedAt?: Date;
}
