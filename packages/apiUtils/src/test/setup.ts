import { MoralisCore } from '@moralisweb3/common-core';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { ApiUtils } from '../ApiUtils';

export const setupApi = () => {
  const core = MoralisCore.create();
  const apiUtils = ApiUtils.create(core);
  const evmUtils = CommonEvmUtils.create(core);

  core.registerModules([apiUtils, evmUtils]);

  return core;
};
