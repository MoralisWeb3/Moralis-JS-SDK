import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/common-core';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';

export const setupStreamsUtils = () => {
  const core = MoralisCore.create();
  const evmUtils = CommonEvmUtils.create(core);
  core.registerModules([evmUtils]);

  MoralisCoreProvider.setDefault(core);
  return core;
};
