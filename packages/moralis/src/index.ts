import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisAuth } from '@moralisweb3/auth';
import { MoralisEvmUtils } from '@moralisweb3/evm-utils';
import { MoralisEvmApi } from '@moralisweb3/evm-api';
import { MoralisSolApi } from '@moralisweb3/sol-api';
import { MoralisCoreProvider } from '@moralisweb3/core';

// Core
const core = MoralisCoreProvider.getDefault();

// Utility modules
const evmUtils = MoralisEvmUtils.create();
const apiUtils = MoralisApiUtils.create(core);

// Feature modules
const auth = MoralisAuth.create(core);
const evmApi = MoralisEvmApi.create(core);
const solApi = MoralisSolApi.create(core);

// Register all Moralis modules to MoralisCore
core.registerModules([evmUtils, auth, apiUtils, evmApi, solApi]);

const Moralis = {
  Core: core,

  Auth: auth,
  EvmApi: evmApi,
  SolApi: solApi,

  start: core.start,
};

export default Moralis;
