import { MoralisNetworkError, NetworkErrorCode } from '@moralis/core';
import { ethers } from 'ethers';

const isValidProvider = (provider: unknown): provider is ethers.providers.JsonRpcSigner => {
  if (provider instanceof ethers.providers.JsonRpcSigner) {
    return true;
  }

  return false;
};

export const assertProvider = (provider: unknown, message?: string) => {
  if (!isValidProvider(provider)) {
    throw new MoralisNetworkError({
      code: NetworkErrorCode.NO_CHAIN_SET,
      message:
        message ?? 'Provider is not set. Make sure to have called Moralis.connect() or MoralisEvm.connect() first',
    });
  }

  return provider;
};
