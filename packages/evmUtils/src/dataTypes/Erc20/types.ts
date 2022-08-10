import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';

export interface Erc20Input {
  decimals: number | string;
  name: string;
  symbol: string;
  contractAddress: EvmAddressish;
  chain: EvmChainish;
  logo?: string | null;
  logoHash?: string | null;
  thumbnail?: string | null;
}

export interface Erc20Data {
  decimals: number;
  name: string;
  symbol: string;
  contractAddress: EvmAddress;
  chain: EvmChain;
  logo?: string | null;
  logoHash?: string | null;
  thumbnail?: string | null;
}
