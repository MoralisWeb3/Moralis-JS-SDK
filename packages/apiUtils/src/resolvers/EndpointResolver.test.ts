import { ApiConfig } from '../config/ApiConfig';
import { ApiFormatType } from './ApiResultAdapter';
import axios from 'axios';
import { EndpointResolver } from './EndpointResolver';
import { setupApi } from '../test/setup';
import { MoralisCore } from '@moralisweb3/core';
import { createEndpoint, createEndpointFactory } from './Endpoint';

const MOCK_API_KEY = 'test-api-key';
const API_ROOT = 'https://deep-index.moralis.io/api/v2';

const endpointWeightsRawResult = {
  endpoint: 'getBlock',
  weight: '8',
};

const endpointWeightsTransformedResult = {
  endpoint: 'getBlock',
  weight: 8,
};

interface EndpointWeight {
  endpoint: string;
  weight: string;
}

describe('ApiResolver', () => {
  let core: MoralisCore;
  let resolver: EndpointResolver<
    unknown,
    unknown,
    EndpointWeight,
    { endpoint: string; weight: number },
    { endpoint: string; weight: string }
  >;
  let mockRequest: jest.SpyInstance;

  beforeAll(() => {
    core = setupApi();
    core.config.set(ApiConfig.apiKey, MOCK_API_KEY);

    mockRequest = jest.spyOn(axios, 'request');
    mockRequest.mockImplementation((options) => {
      if (options.url === `${API_ROOT}/info/endpointWeights` && options.method === 'GET') {
        return Promise.resolve({
          data: endpointWeightsRawResult,
        });
      } else {
        return Promise.reject('Invalid url');
      }
    });
  });

  beforeEach(() => {
    resolver = EndpointResolver.create(
      core,
      createEndpointFactory(() =>
        createEndpoint({
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
        }),
      ),
    );

    jest.clearAllMocks();
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

  it('should set required api headers correctly', async () => {
    const response = await resolver.fetch({});

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          'x-api-key': MOCK_API_KEY,
          'x-moralis-build-target': expect.any(String),
          'x-moralis-platform': expect.any(String),
          'x-moralis-platform-version': MoralisCore.libVersion,
        }),
      }),
    );
    expect(response).toBeDefined();
  });
});
