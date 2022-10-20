import { MoralisStreams } from '@moralisweb3/streams';
import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisAuth } from '@moralisweb3/auth';
import { MoralisEvmUtils } from '@moralisweb3/evm-utils';
import { MoralisEvmApi } from '@moralisweb3/evm-api';
import { MoralisSolUtils } from '@moralisweb3/sol-utils';
import { MoralisSolApi } from '@moralisweb3/sol-api';
import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';

// Core
const core = MoralisCore.create();

// Utility modules
const evmUtils = MoralisEvmUtils.create(core);
const solUtils = MoralisSolUtils.create(core);
const apiUtils = MoralisApiUtils.create(core);

// Feature modules
const auth = MoralisAuth.create(core);
const streams = MoralisStreams.create(core);
const evmApi = MoralisEvmApi.create(core);
const solApi = MoralisSolApi.create(core);

// Register all Moralis modules to MoralisCore
core.registerModules([evmUtils, solUtils, auth, apiUtils, evmApi, solApi, streams]);

MoralisCoreProvider.setDefault(core);

const Moralis = {
  Core: core,

  Auth: auth,
  Streams: streams,
  EvmApi: evmApi,
  SolApi: solApi,

  start: core.start,
};

export * from '@moralisweb3/evm-utils';
export * from '@moralisweb3/sol-utils';
export { Types as StreamTypes } from '@moralisweb3/streams';
export {
  ApiErrorCode,
  AuthErrorCode,
  BigNumber,
  BigNumberPrimitive,
  BigNumberish,
  CoreErrorCode,
  EvmAddressFormat,
  EvmChainIdFormat,
  LogLevel,
  MoralisApiError,
  MoralisAuthError,
  MoralisCoreError,
  MoralisCoreProvider,
  MoralisError,
  MoralisErrorCode,
  MoralisErrorDetails,
  MoralisErrorOptions,
  MoralisStreamError,
  StreamErrorCode,
  isMoralisError,
  maybe,
  solNetworkNames,
  toCamelCase,
} from '@moralisweb3/core';

export default Moralis;
