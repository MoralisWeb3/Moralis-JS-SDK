import { EvmChain, MoralisNetworkError, NetworkErrorCode } from '@moralisweb3/core';

const isValidChain = (chain: unknown): chain is EvmChain => {
  if (chain instanceof EvmChain) {
    return true;
  }

  return false;
};

export const assertChain = (chain: unknown, message?: string) => {
  if (!isValidChain(chain)) {
    throw new MoralisNetworkError({
      code: NetworkErrorCode.NO_CHAIN_SET,
      message: message ?? 'No valid chain',
    });
  }

  return chain;
};
