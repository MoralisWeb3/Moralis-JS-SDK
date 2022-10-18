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

export {
  AdaptedApiResult,
  ApiFormatType,
  ApiPaginatedResultAdapter,
  ApiResultAdapter,
  EndpointBodyType,
  Endpoint,
  EndpointDescriptor,
  EndpointFactory,
  EndpointMethod,
  EndpointResolver,
  Endpoints,
  InputApiResult,
  JSONApiResult,
  MoralisApiUtils,
  PaginatedEndpoint,
  PaginatedEndpointFactory,
  PaginatedEndpointResolver,
  PaginatedParams,
  PaginatedResult,
  createEndpoint,
  createEndpointFactory,
  createPaginatedEndpoint,
  createPaginatedEndpointFactory,
  tryGetNextPageParams,
  ApiConfig,
} from '@moralisweb3/api-utils';

export {
  Erc20Data,
  Erc20Input,
  Erc20Token,
  Erc20Options,
  Erc20Tokenish,
  Erc20Transfer,
  Erc20TransferData,
  Erc20TransferInput,
  Erc20Transferish,
  Erc20Value,
  Erc20ValueData,
  Erc20ValueInputAmount,
  Erc20ValueInputDecimals,
  Erc20Valueish,
  EvmAddress,
  EvmAddressInput,
  EvmAddressish,
  EvmBlock,
  EvmBlockData,
  EvmBlockInput,
  EvmBlockish,
  EvmChain,
  EvmChainParser,
  EvmChainish,
  EvmEvent,
  EvmEventData,
  EvmEventInput,
  EvmEventish,
  EvmNative,
  EvmNativeUnit,
  EvmNativeish,
  EvmNft,
  EvmNftCollection,
  EvmNftCollectionData,
  EvmNftCollectionInput,
  EvmNftCollectionish,
  EvmNftData,
  EvmNftInput,
  EvmNftMetadata,
  EvmNftMetadataData,
  EvmNftMetadataInput,
  EvmNftMetadataish,
  EvmNftTrade,
  EvmNftTradeData,
  EvmNftTradeInput,
  EvmNftTradeish,
  EvmNftTransfer,
  EvmNftTransferData,
  EvmNftTransferInput,
  EvmNftTransferish,
  EvmNftish,
  EvmTransacionInput,
  EvmTransaction,
  EvmTransactionData,
  EvmTransactionLog,
  EvmTransactionLogData,
  EvmTransactionLogInput,
  EvmTransactionLogish,
  EvmTransactionish,
  InputChainId,
  InputEvmNative,
  MoralisEvmUtils,
} from '@moralisweb3/evm-utils';

export {
  MoralisSolUtils,
  SolAddress,
  SolAddressish,
  SolNative,
  SolNativeUnit,
  SolNativeish,
  SolNetwork,
  SolNetworkName,
  SolNetworkNameish,
  SolNetworkish,
} from '@moralisweb3/sol-utils';

export {
  AnyBaseClass,
  ApiErrorCode,
  ApiModule,
  AuthErrorCode,
  AxiosRetry,
  AxiosRetryConfig,
  BigNumber,
  BigNumberPrimitive,
  BigNumberish,
  BuildEnvironment,
  Camelize,
  Config,
  ConfigKey,
  ConfigKeyValidator,
  ConfigValues,
  CoreConfig,
  CoreErrorCode,
  DateInput,
  EvmAddressFormat,
  EvmChainIdFormat,
  EvmChainable,
  EvmConnector,
  LogLevel,
  LoggerController,
  Module,
  ModuleFactory,
  ModuleType,
  Modules,
  MoralisApiError,
  MoralisAuthError,
  MoralisConfigValues,
  MoralisCore,
  MoralisCoreError,
  MoralisCoreProvider,
  MoralisData,
  MoralisDataFormatted,
  MoralisDataObject,
  MoralisDataObjectValue,
  MoralisError,
  MoralisErrorCode,
  MoralisErrorDetails,
  MoralisErrorOptions,
  MoralisStreamError,
  Network,
  RequestController,
  RequestOptions,
  SolNetworkable,
  StreamErrorCode,
  UnreachableError,
  assertUnreachable,
  dateInputToDate,
  isApiModule,
  isMoralisError,
  maybe,
  solNetworkNames,
  toCamelCase,
} from '@moralisweb3/core';

export default Moralis;
