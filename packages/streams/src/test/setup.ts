import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisStreams } from '../MoralisStreams';
import { MoralisEvmUtils } from '@moralisweb3/common-evm-utils';

export const setupStreams = () => {
  const core = MoralisCore.create();
  const moralisStreams = MoralisStreams.create(core);
  const evmUtils = MoralisEvmUtils.create(core);
  core.registerModules([moralisStreams, evmUtils]);

  MoralisCoreProvider.setDefault(core);
  return core;
};
