import { MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisEvmUtils } from '@moralisweb3/evm-utils';
import { MoralisApi } from '@moralisweb3/api';

export const setupApi = () => {
  const core = MoralisCoreProvider.getDefault();
  const api = MoralisApi.create();
  const evmUtils = MoralisEvmUtils.create();

  core.registerModules([api, evmUtils]);

  return core;
};
