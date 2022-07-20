import { MoralisApi } from './../MoralisApi';
import { ApiModule, EvmAddress, EvmAddressish, EvmChainish, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { ApiResolver, BodyType } from '../Resolver';
import { API_ROOT, MOCK_API_KEY } from './config';
import { BASE_URL } from '@moralisweb3/evm-api';
import { resolveDefaultChain } from '../utils';
import { ApiPaginatedOptions, ApiPaginatedResolver, ApiPaginatedResponse } from '../PaginatedResolver';

interface EndpointWeight {
  endpoint: string;
  weight: string;
}

interface Params extends ApiPaginatedOptions {
  chain?: EvmChainish;
  address: EvmAddressish;
  abi: unknown;
}

type ApiResult = {
  transaction_hash: string;
  address: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  data: {
    from?: string | undefined;
    to?: string | undefined;
    value?: string | undefined;
  };
}[];

export class MockApi extends ApiModule {
  public static readonly moduleName = 'mockApi';

  public static create(core?: MoralisCore): MockApi {
    return new MockApi(core ?? MoralisCoreProvider.getDefault());
  }

  public constructor(core: MoralisCore) {
    super(MockApi.moduleName, core, API_ROOT);
  }

  get endpoints() {
    return {
      endpointWeights: () =>
        new ApiResolver({
          name: 'endpointWeights',
          getUrl: () => `${API_ROOT}/info/endpointWeights`,
          apiToResult: (data: EndpointWeight) => ({
            endpoint: data.endpoint,
            weight: parseInt(data.weight),
          }),
          resultToJson: (data) => ({
            endpoint: data.endpoint,
            weight: data.weight.toString(),
          }),
          parseParams: (params) => params,
        }).fetch({}),

      getContractEvents: new ApiPaginatedResolver({
        name: 'getContractEvents',
        getUrl: (params: Params) => `${BASE_URL}/${params.address}/events`,
        //   TODO: remove PaginatedResponse when api squad make swagger update
        apiToResult: (data: ApiPaginatedResponse<ApiResult>) =>
          data.result.map((event) => ({
            ...event,
            address: EvmAddress.create(event.address),
          })),
        resultToJson: (data) => data,
        parseParams: (params: Params) => ({
          chain: resolveDefaultChain(params.chain).apiHex,
          from_block: params.fromBlock,
          to_block: params.toBlock,
          from_date: params.toDate,
          to_date: params.toDate,
          providerUrl: params.providerUrl,
          topic: params.topic,
          limit: params.limit,
          offset: params.offset,
          subdomain: params.subdomain,
          address: EvmAddress.create(params.address).lowercase,
          abi: params.abi,
        }),
        method: 'post',
        bodyParams: ['abi'],
        bodyType: BodyType.BODY,
      }).fetch,
    };
  }

  public setup() {
    //
  }

  public start(): void | Promise<void> {
    // Nothing...
  }
}

export function setupApi() {
  const core = MoralisCoreProvider.getDefault();
  const api = MoralisApi.create(core);
  const mockApi = MockApi.create(core);
  core.registerModules([api, mockApi]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  return mockApi;
}
