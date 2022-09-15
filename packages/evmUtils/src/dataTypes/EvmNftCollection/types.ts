import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmNftContractType } from '../EvmNftContractType';

/**
 * This can be any object with valid block data.
 * @example
 * ```
 * const input = {
 *   chain: '0x1',
 *   contractType: 'ERC721',
 *   name: 'Test NFT',
 *   symbol: 'TEST',
 *   tokenAddress: '0xe4c7bf3aff7ad07f9e80d57f7189f0252592fee6321c2a9bd9b09b6ce0690d27',
 *  }
 * ```
 */
export interface EvmNftCollectionInput {
  chain: EvmChainish;
  contractType: string;
  name: string;
  symbol: string;
  tokenAddress: EvmAddressish;
}

/**
 * This is the return type of the processed EVM transaction
 */
export interface EvmNftCollectionData {
  chain: EvmChain;
  contractType?: EvmNftContractType;
  name: string;
  symbol: string;
  tokenAddress: EvmAddress;
}
