import { MoralisServer } from '@moralisweb3/server';
import { MoralisEvmApi } from '@moralisweb3/evm-api';
import { MoralisEvm } from '@moralisweb3/evm';
import * as EvmConnectorUtilsLib from '@moralisweb3/evm-connector-utils';
import * as CoreLib from '@moralisweb3/core';

const core = CoreLib.MoralisCoreProvider.getDefault();
const evm = MoralisEvm.create(core);
const serve = MoralisServer.create(core);
const evmApi = MoralisEvmApi.create(core);

// register all Moralis modules to MoralisCore
core.registerModules([evm, serve, evmApi]);

const Moralis = {
  Core: core,
  Server: serve,
  Evm: evm,
  EvmApi: evmApi,
  start: core.start,

  // for UMD bundles
  CoreLib,
  EvmConnectorUtilsLib,
};

export default Moralis;
