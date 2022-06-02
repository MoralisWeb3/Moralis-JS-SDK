import { EvmAddress, MoralisNetworkError, NetworkErrorCode } from '@moralisweb3/core';

const isValidAddress = (address: unknown): address is EvmAddress => {
  if (address instanceof EvmAddress) {
    return true;
  }

  return false;
};

export const assertAddress = (address: unknown, message?: string) => {
  if (!isValidAddress(address)) {
    throw new MoralisNetworkError({
      code: NetworkErrorCode.NO_CHAIN_SET,
      message: message ?? 'No valid address',
    });
  }

  return address;
};
