import { EvmChain, EvmChainish, MoralisNetworkError, NetworkErrorCode } from '@moralisweb3/core';

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

/**
 * @param {EvmChain} providedChain The chain provided from function call.
 * @param {EvmChain} chain The evm chain.
 */
export const assertChainEquality = (providedChain: EvmChainish, chain: EvmChain): void => {
  if (!chain.equals(providedChain)) {
    throw new MoralisNetworkError({
      code: NetworkErrorCode.CHAIN_MISMATCH,
      message: `Expected chain ${chain.apiHex}, but got ${EvmChain.create(providedChain).apiHex}`,
    });
  }
};
