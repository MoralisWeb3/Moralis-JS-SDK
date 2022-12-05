import { EvmChain } from './EvmChain';

// hex-string, ChainNameor a number
export type InputChainId = string | number;

/**
 * This can be any valid {@link EvmChain} or {@link InputChainId}.
 */
export type EvmChainish = EvmChain | InputChainId;
