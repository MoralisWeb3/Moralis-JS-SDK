import { EvmChain } from './EvmChain';

// Chain names, that are accepted by the evm api
export type ChainName =
  | 'eth'
  | 'ropsten'
  | 'rinkeby'
  | 'goerli'
  | 'kovan'
  | 'polygon'
  | 'mumbai'
  | 'bsc'
  | 'bsc testnet'
  | 'avalanche'
  | 'avalanche testnet'
  | 'fantom';

// hex-string, ChainNameor a number
export type InputChainId = string | ChainName | number;

export type EvmChainish = EvmChain | InputChainId;
