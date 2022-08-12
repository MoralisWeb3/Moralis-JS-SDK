import { ApiConfig, EndpointDescriptor } from '@moralisweb3/api-utils';
import { AxiosRetry, Config } from '@moralisweb3/core';
import { EndpointProxy } from './EndpointProxy';
import { AxiosRequestConfig } from 'axios';

describe('ApiProxy', () => {
  const API_KEY = 'test_key';
  const baseUrl = 'https://example.com';
  let config: Config;

  beforeEach(() => {
    config = new Config();
    config.registerKey(ApiConfig.apiKey);
    config.set(ApiConfig.apiKey, API_KEY);
  });

  function mockRequest(data: any, assert: (request: AxiosRequestConfig) => void): jest.SpyInstance {
    return jest.spyOn(AxiosRetry, 'request').mockImplementation(async (_, request) => {
      assert(request);
      return {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
    });
  }

  test('POST works', async () => {
    const descriptor: EndpointDescriptor = {
      name: 'getX',
      method: 'post',
      urlPattern: '/x/{alfa}/{beta}',
      urlPatternParamNames: ['alfa', 'beta'],
      bodyParamNames: ['psi', 'omega'],
    };
    const data = { x: 1 };
    const params = {
      alfa: 'red',
      beta: 'blue',
      x: '1',
      y: '2',
      psi: 'dog',
      omega: 'cat',
    };

    const requestSpy = mockRequest(data, request => {
      expect(request.method).toBe('post');
      expect(request.headers && request.headers['x-api-key']).toEqual(API_KEY);
      expect(request.url).toBe(`${baseUrl}/x/red/blue`);
      expect(Object.keys(request.params).length).toEqual(2);
      expect(request.params['x']).toEqual('1');
      expect(request.params['y']).toEqual('2');
      expect(Object.keys(request.data).length).toEqual(2);
      expect(request.data['psi']).toEqual('dog');
      expect(request.data['omega']).toEqual('cat');
    });

    const proxy = new EndpointProxy(baseUrl, config);
    const result = await proxy.handler(descriptor, params);

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);

    jest.resetAllMocks();
  });
});
