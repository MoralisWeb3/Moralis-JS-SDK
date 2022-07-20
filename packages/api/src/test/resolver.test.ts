import { ApiConfig } from './../config/ApiConfig';
import { ApiFormatType } from '../ApiResultAdapter';
import axios from 'axios';
import { API_ROOT } from './config';
import { MoralisCoreProvider } from '@moralisweb3/core';
import { ApiResolver } from '../Resolver';

const endpointWeightsRawResult = {
  endpoint: 'getBlock',
  weight: '8',
};

const endpointWeightsTransformedResult = {
  endpoint: 'getBlock',
  weight: 8,
};

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

interface EndpointWeight {
  endpoint: string;
  weight: string;
}

describe('ApiResolver', () => {
  let resolver: ApiResolver<
    unknown,
    unknown,
    EndpointWeight,
    { endpoint: string; weight: number },
    { endpoint: string; weight: string }
  >;

  beforeAll(() => {
    const core = MoralisCoreProvider.getDefault();
    core.config.registerKey(ApiConfig.apiKey);
    core.config.set(ApiConfig.apiKey, 'X-api-key');
    const mockRequest = jest.spyOn(axios, 'request');
    mockRequest.mockImplementation((options) => {
      if (options.url === `${API_ROOT}/info/endpointWeights` && options.method === 'GET') {
        return Promise.resolve({
          data: endpointWeightsRawResult,
        });
      } else if (
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
    resolver = new ApiResolver({
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
    });
  });

  it('should test api resolver functions with get request', async () => {
    const response = await resolver.fetch({});

    expect(response.raw).toStrictEqual(endpointWeightsRawResult);
    expect(response.toJSON()).toStrictEqual(endpointWeightsRawResult);
    expect(response.result).toStrictEqual(endpointWeightsTransformedResult);
    expect(response.format(ApiFormatType.NORMAL)).toStrictEqual(endpointWeightsTransformedResult);
    expect(response.format(ApiFormatType.RAW)).toStrictEqual(endpointWeightsRawResult);
    expect(() => response.format('legacy' as any)).toThrowErrorMatchingInlineSnapshot(
      `"[A0001] provided formatType not supported"`,
    );
  });
});
