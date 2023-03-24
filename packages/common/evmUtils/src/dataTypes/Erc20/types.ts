import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';

/**
 * Valid ERC20 token input
 *
 * @example
 * ```ts
 * const input = {
 * contractAddress: "0x0a385f86059e0b2a048171d78afd1f38558121f3",
 * name: "USD Coin on BSC",
 * symbol: "USDC",
 * logo: null,
 * logoHash: null,
 * thumbnail: null,
 * decimals: "6",
 * chain: 1,
 * possibleSpam: false,
 * }
 * ```
 */
export interface Erc20Input {
  decimals: number | string;
  name: string;
  symbol: string;
  contractAddress: EvmAddressish;
  chain: EvmChainish;
  logo?: string | null;
  logoHash?: string | null;
  thumbnail?: string | null;
  possibleSpam?: boolean;
}

/**
 * This is the return type of the processed ERC20 token
 */
export interface Erc20Data {
  decimals: number;
  name: string;
  symbol: string;
  contractAddress: EvmAddress;
  chain: EvmChain;
  logo?: string | null;
  logoHash?: string | null;
  thumbnail?: string | null;
  possibleSpam?: boolean;
}
