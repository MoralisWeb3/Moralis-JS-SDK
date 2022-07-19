import { MoralisEvmApi } from '@moralisweb3/evm-api';
import * as CoreLib from '@moralisweb3/core';

const core = CoreLib.MoralisCoreProvider.getDefault();
const evmApi = MoralisEvmApi.create(core);

// register all Moralis modules to MoralisCore
core.registerModules([evmApi]);

const Moralis = {
  Core: core,
  EvmApi: evmApi,
  start: core.start,
};

export default Moralis;
