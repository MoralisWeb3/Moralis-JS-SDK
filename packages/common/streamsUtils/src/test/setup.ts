import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisEvmUtils } from '@moralisweb3/evm-utils';

export const setupStreamsUtils = () => {
  const core = MoralisCore.create();
  const evmUtils = MoralisEvmUtils.create(core);
  core.registerModules([evmUtils]);

  MoralisCoreProvider.setDefault(core);
  return core;
};
