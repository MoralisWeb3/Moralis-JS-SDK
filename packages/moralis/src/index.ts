import { Streams } from '@moralisweb3/streams';
import { ApiUtils } from '@moralisweb3/api-utils';
import { Auth } from '@moralisweb3/auth';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { EvmApi } from '@moralisweb3/evm-api';
import { CommonSolUtils } from '@moralisweb3/common-sol-utils';
import { SolApi } from '@moralisweb3/sol-api';
import { Core, CoreProvider } from '@moralisweb3/common-core';

import { MoralisConfigValues } from './config/MoralisConfig';
export * from './config/MoralisConfig';

// Core
const core = Core.create();

// Utility modules
const commonEvmUtils = CommonEvmUtils.create(core);
const commonSolUtils = CommonSolUtils.create(core);
const apiUtils = ApiUtils.create(core);

// Feature modules
const auth = Auth.create(core);
const streams = Streams.create(core);
const evmApi = EvmApi.create(core);
const solApi = SolApi.create(core);

// Register all Moralis modules to Core
core.registerModules([commonEvmUtils, commonSolUtils, auth, apiUtils, evmApi, solApi, streams]);

CoreProvider.setDefault(core);

const Moralis = {
  Core: core,

  Auth: auth,
  Streams: streams,
  EvmApi: evmApi,
  SolApi: solApi,

  EvmUtils: commonEvmUtils,
  SolUtils: commonSolUtils,

  start: (config?: Partial<MoralisConfigValues>) => {
    return core.start(config);
  },
};

export default Moralis;
