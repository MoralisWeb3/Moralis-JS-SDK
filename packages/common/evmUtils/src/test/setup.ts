import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/common-core';
import { CommonEvmUtils } from '../CommonEvmUtils';

export const setupEvmUtils = () => {
  const core = MoralisCore.create();
  const commonEvmUtils = CommonEvmUtils.create(core);
  core.registerModule(commonEvmUtils);

  MoralisCoreProvider.setDefault(core);
  return core;
};
