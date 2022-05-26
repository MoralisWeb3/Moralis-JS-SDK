import core, {
  ApiErrorCode,
  EvmAddress,
  EvmAddressish,
  EvmChain,
  EvmChainish,
  MoralisApiError,
} from '@moralisweb3/core';

export const resolveDefaultAddress = (address?: EvmAddressish) => {
  const evm = core.modules.getNetwork('evm');
  if (address) {
    return EvmAddress.create(address).lowercase;
  } else if (!evm || !evm.account) {
    throw new MoralisApiError({
      code: ApiErrorCode.GENERIC_API_ERROR,
      message: 'EvmApi failed: address is required',
    });
  } else {
    return EvmAddress.create(evm.account).lowercase;
  }
};

export const resolveDefaultChain = (chain?: EvmChainish) => {
  const evm = core.modules.getNetwork('evm');
  if (evm && evm.chain && !chain) {
    return EvmChain.create(evm.chain).apiHex;
  }
  return chain ? EvmChain.create(chain).apiHex : undefined;
};
