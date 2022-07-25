import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisAuth } from '@moralisweb3/auth';
import { MoralisEvmApi } from '@moralisweb3/evm-api';
import { MoralisSolApi } from '@moralisweb3/sol-api';
import { MoralisCoreProvider } from '@moralisweb3/core';

const core = MoralisCoreProvider.getDefault();
const auth = MoralisAuth.create(core);
const apiUtils = MoralisApiUtils.create(core);
const evmApi = MoralisEvmApi.create(core);
const solApi = MoralisSolApi.create(core);

// register all Moralis modules to MoralisCore
core.registerModules([auth, apiUtils, evmApi, solApi]);

const Moralis = {
  Core: core,
  Auth: auth,
  EvmApi: evmApi,
  SolApi: solApi,
  start: core.start,
};

export default Moralis;
