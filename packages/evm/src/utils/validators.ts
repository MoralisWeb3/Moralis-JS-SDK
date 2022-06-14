import { EvmChain, EvmChainish, MoralisNetworkError, NetworkErrorCode } from '@moralisweb3/core';

export const validateChain = (providedChain: EvmChainish, chain: EvmChain): void => {
  if (!chain.equals(providedChain)) {
    throw new MoralisNetworkError({
      code: NetworkErrorCode.CHAIN_MISMATCH,
      message: 'Provided chain does not match evm connected chain',
    });
  }
};
