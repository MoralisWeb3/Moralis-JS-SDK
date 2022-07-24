import { MoralisApi } from '@moralisweb3/api';
import { MoralisAuth } from '@moralisweb3/auth';
import { MoralisEvmApi } from '@moralisweb3/evm-api';
import { MoralisSolUtils } from '@moralisweb3/sol-utils';
import { MoralisSolApi } from '@moralisweb3/sol-api';
import { MoralisCoreProvider } from '@moralisweb3/core';

const core = MoralisCoreProvider.getDefault();
const auth = MoralisAuth.create(core);
const api = MoralisApi.create(core);
const evmApi = MoralisEvmApi.create(core);
const solUtils = MoralisSolUtils.create(core);
const solApi = MoralisSolApi.create(core);

// register all Moralis modules to MoralisCore
core.registerModules([solUtils, auth, api, evmApi, solApi]);

const Moralis = {
  Core: core,
  Auth: auth,
  EvmApi: evmApi,
  SolApi: solApi,
  start: core.start,
};

export default Moralis;
