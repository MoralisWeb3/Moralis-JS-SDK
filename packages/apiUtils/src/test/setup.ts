import { MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisEvmUtils } from '@moralisweb3/evm-utils';
import { MoralisApiUtils } from '@moralisweb3/api-utils';

export const setupApi = () => {
  const core = MoralisCoreProvider.getDefault();
  const apiUtils = MoralisApiUtils.create();
  const evmUtils = MoralisEvmUtils.create();

  core.registerModules([apiUtils, evmUtils]);

  return core;
};
