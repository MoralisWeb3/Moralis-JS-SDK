import { EvmChain } from './EvmChain';

// hex-string, ChainNameor a number
export type InputChainId = string | number;

export type EvmChainish = EvmChain | InputChainId;
