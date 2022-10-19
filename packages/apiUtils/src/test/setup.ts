import { MoralisCore } from '@moralisweb3/core';
import { MoralisEvmUtils } from '@moralisweb3/evm-utils';
import { MoralisApiUtils } from '../MoralisApiUtils';

export const setupApi = () => {
  const core = MoralisCore.create();
  const apiUtils = MoralisApiUtils.create(core);
  const evmUtils = MoralisEvmUtils.create(core);

  core.registerModules([apiUtils, evmUtils]);

  return core;
};
