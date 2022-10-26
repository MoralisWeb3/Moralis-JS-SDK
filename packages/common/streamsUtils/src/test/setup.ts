import { Core, CoreProvider } from '@moralisweb3/common-core';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';

export const setupStreamsUtils = () => {
  const core = Core.create();
  const evmUtils = CommonEvmUtils.create(core);
  core.registerModules([evmUtils]);

  CoreProvider.setDefault(core);
  return core;
};
