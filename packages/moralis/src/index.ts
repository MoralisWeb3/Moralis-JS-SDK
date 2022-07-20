import { MoralisEvmApi } from '@moralisweb3/evm-api';
import { MoralisAuth } from '@moralisweb3/auth';
import * as CoreLib from '@moralisweb3/core';

const core = CoreLib.MoralisCoreProvider.getDefault();

const auth = MoralisAuth.create(core);
const evmApi = MoralisEvmApi.create(core);

// register all Moralis modules to MoralisCore
core.registerModules([auth, evmApi]);

const Moralis = {
  Core: core,
  Auth: auth,
  EvmApi: evmApi,

  start: core.start,
};

export default Moralis;
