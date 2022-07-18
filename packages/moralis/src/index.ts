// Import all Moralis modules
import Server from '@moralisweb3/server';
import EvmApi from '@moralisweb3/evm-api';
import Evm from '@moralisweb3/evm';
import Auth from '@moralisweb3/auth';
import * as EvmConnectorUtilsLib from '@moralisweb3/evm-connector-utils';
import * as CoreLib from '@moralisweb3/core';

const Core = CoreLib.default;

// register all Moralis modules to MoralisCore
Core.registerModules([Evm, Server, EvmApi]);

const start = Core.start;

const Moralis = {
  Core,
  Server,
  Evm,
  EvmApi,
  Auth,
  start,

  // for UMD bundles
  CoreLib,
  EvmConnectorUtilsLib,
};

export default Moralis;
