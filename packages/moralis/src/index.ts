import { MoralisEvmApi } from '@moralisweb3/evm-api';
import { MoralisSolApi } from '@moralisweb3/sol-api';
import * as CoreLib from '@moralisweb3/core';

const core = CoreLib.MoralisCoreProvider.getDefault();
const evmApi = MoralisEvmApi.create(core);
const solApi = MoralisSolApi.create(core);

// register all Moralis modules to MoralisCore
core.registerModules([evmApi, solApi]);

const Moralis = {
  Core: core,
  EvmApi: evmApi,
  SolApi: solApi,
  start: core.start,
};

export default Moralis;
