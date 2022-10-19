import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisEvmUtils } from '../MoralisEvmUtils';

export const setupEvmUtils = () => {
  const core = MoralisCore.create();
  const evmUtils = MoralisEvmUtils.create(core);
  core.registerModule(evmUtils);

  MoralisCoreProvider.setDefault(core);
  return core;
};
