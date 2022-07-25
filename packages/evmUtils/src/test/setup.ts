import { MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisEvmUtils } from '../MoralisEvmUtils';

export const setupEvmUtils = () => {
  const core = MoralisCoreProvider.getDefault();
  const evmUtils = MoralisEvmUtils.create();

  core.registerModule(evmUtils);

  return core;
};
