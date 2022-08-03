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
    mockRequest.mockImplementationOnce((options) => {
      console.log(options.headers);

      if (!options.headers['x-moralis-platform']) {
        throw new Error('x-moralis-platform is not set');
      }

      if (options.headers['x-moralis-platform-version'] !== MoralisCore.libVersion) {
        throw new Error('x-moralis-platform-version is not set to the correct');
      }

      if (!options.headers['x-moralis-build-target']) {
        throw new Error('x-moralis-build-target is not set');
      }

      if (options.headers['x-api-key'] !== MOCK_API_KEY) {
        throw new Error('x-api-key is not set to the correct');
      }

      return {};
    });

    const response = await resolver.fetch({});

    expect(response).toBeDefined();
  });
});
