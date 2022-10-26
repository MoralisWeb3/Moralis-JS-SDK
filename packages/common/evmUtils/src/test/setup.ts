import { Core, CoreProvider } from '@moralisweb3/common-core';
import { CommonEvmUtils } from '../CommonEvmUtils';

export const setupEvmUtils = () => {
  const core = Core.create();
  const commonEvmUtils = CommonEvmUtils.create(core);
  core.registerModule(commonEvmUtils);

  CoreProvider.setDefault(core);
  return core;
};
