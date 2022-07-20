import { ApiConfig } from './config/ApiConfig';
import axios from 'axios';
import { EvmAddress, EvmAddressish, EvmChainish, MoralisCoreProvider } from '@moralisweb3/core';
import { BodyType } from './Resolver';
import { ApiPaginatedOptions, ApiPaginatedResolver, ApiPaginatedResponse } from './PaginatedResolver';
import { resolveDefaultChain } from './utils';

const MOCK_API_KEY = 'test-api-key';
const API_ROOT = 'https://deep-index.moralis.io/api/v2';

const eventRawResult = {
  total: 10,
  page: 0,
  page_size: 2,
  cursor: 'cursor_string',
  result: [
    {
      transaction_hash: '0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      block_timestamp: '2021-04-02T10:07:54.000Z',
      block_number: '12526958',
      block_hash: '0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86',
      data: {
        from: '0x54ff6974c715956a5049a123408bff91fbe29f01',
        to: '0x74de5d4fcbf63e00296fd95d33236b9794016631',
        value: '260103496340000000000',
      },
    },
  ],
};

const expectedAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const ABI = {};

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

describe('ApiResolver', () => {
  let resolver: ApiPaginatedResolver<
    Params,
    Params,
    ApiResult,
    {
      address: EvmAddress;
      transaction_hash: string;
      block_timestamp: string;
      block_number: string;
      block_hash: string;
      data: { from?: string | undefined; to?: string | undefined; value?: string | undefined };
    }[],
    unknown
  >;
  beforeAll(() => {
    const core = MoralisCoreProvider.getDefault();
    core.config.registerKey(ApiConfig.apiKey);
    core.config.set(ApiConfig.apiKey, MOCK_API_KEY);
    const mockRequest = jest.spyOn(axios, 'request');
    mockRequest.mockImplementation((options) => {
      if (
        options.url === `${API_ROOT}/0xdAC17F958D2ee523a2206206994597C13D831ec7/events` &&
        options.method === 'POST'
      ) {
        return Promise.resolve({
          data: eventRawResult,
        });
      } else {
        return Promise.reject('Invalid url');
      }
    });
  });

  beforeEach(() => {
    resolver = new ApiPaginatedResolver({
      name: 'getContractEvents',
      getUrl: (params: Params) => `${API_ROOT}/${params.address}/events`,
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
    });
  });

  it('should test api resolver functions with post request and pagination', async () => {
    const response = await resolver.fetch({
      chain: 'eth',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      limit: 2,
      abi: ABI,
    });

    expect(response.raw.total).toStrictEqual(10);
    expect(response.raw.page_size).toStrictEqual(2);
    expect(response.raw.result).toStrictEqual(eventRawResult.result);
    expect(response.result[0].address.format()).toBe(expectedAddress.toLowerCase());
  });

  it('should test next call', async () => {
    const response = await resolver.fetch({
      chain: 'eth',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      limit: 2,
      abi: ABI,
    });

    const callSpy = jest.fn(async () => await response.next());
    const result = await callSpy();
    expect(result.raw.total).toStrictEqual(10);
    expect(result.raw.result).toStrictEqual(eventRawResult.result);
    expect(callSpy).toBeCalledTimes(1);
  });
});
