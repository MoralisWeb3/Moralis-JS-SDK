import { Core, CoreProvider } from '@moralisweb3/common-core';
import { MoralisStreams } from '../MoralisStreams';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';

export const setupStreams = () => {
  const core = Core.create();
  const moralisStreams = MoralisStreams.create(core);
  const evmUtils = CommonEvmUtils.create(core);
  core.registerModules([moralisStreams, evmUtils]);

  CoreProvider.setDefault(core);
  return core;
};
