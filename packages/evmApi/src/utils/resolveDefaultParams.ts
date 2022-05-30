import core, {
  ApiErrorCode,
  EvmAddress,
  EvmAddressish,
  EvmChain,
  EvmChainish,
  MoralisApiError,
} from '@moralisweb3/core';

export const resolveDefaultAddress = (address?: EvmAddressish) => {
  if (address) {
    return EvmAddress.create(address);
  }
  try {
    const evm = core.modules.getNetwork('evm');
    if (!evm || !evm.account) {
      throw new Error();
    }
    return evm.account;
  } catch (error) {
    throw new MoralisApiError({
      code: ApiErrorCode.GENERIC_API_ERROR,
      message: 'EvmApi failed: address is required',
    });
  }
};

export const resolveDefaultChain = (chain?: EvmChainish) => {
  if (chain) {
    return EvmChain.create(chain);
  }
  try {
    const evm = core.modules.getNetwork('evm');
    if (!evm || !evm.chain) {
      throw new Error();
    }
    return evm.chain;
  } catch (error) {
    return EvmChain.create('eth');
  }
};
