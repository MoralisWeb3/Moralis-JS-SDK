import { MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisEvmUtils } from '../MoralisEvmUtils';

export const setupEvm = () => {
  const core = MoralisCoreProvider.getDefault();
  const evmUtils = MoralisEvmUtils.create();

  core.registerModule(evmUtils);

  return core;
};
