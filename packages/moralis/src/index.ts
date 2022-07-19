import { MoralisApi } from '@moralisweb3/api';
import { MoralisEvmApi } from '@moralisweb3/evm-api';
import { MoralisSolApi } from '@moralisweb3/sol-api';
import { MoralisCoreProvider } from '@moralisweb3/core';

const core = MoralisCoreProvider.getDefault();
const api = MoralisApi.create(core);
const evmApi = MoralisEvmApi.create(core);
const solApi = MoralisSolApi.create(core);

// register all Moralis modules to MoralisCore
core.registerModules([api, evmApi, solApi]);

const Moralis = {
  Core: core,
  EvmApi: evmApi,
  SolApi: solApi,
  start: core.start,
};

export default Moralis;
