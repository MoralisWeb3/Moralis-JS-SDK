import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisStreams } from '../MoralisStreams';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';

export const setupStreams = () => {
  const core = MoralisCore.create();
  const moralisStreams = MoralisStreams.create(core);
  const evmUtils = CommonEvmUtils.create(core);
  core.registerModules([moralisStreams, evmUtils]);

  MoralisCoreProvider.setDefault(core);
  return core;
};
