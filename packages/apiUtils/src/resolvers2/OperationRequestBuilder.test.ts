import MoralisCore, { Operation, OperationRequestPropertiesBody } from '@moralisweb3/core';
import { ApiConfig } from '../config';
import { OperationRequestBuilder } from './OperationRequestBuilder';

export interface TestRequest {
  userId: number;
  traceId: number;
  password: string;
}

const operation: Operation<TestRequest, unknown, unknown, unknown> = {
  name: 'test',
  groupName: 'test',
  method: 'POST',
  urlPathParamNames: ['userId'],
  urlSearchParamNames: ['traceId'],
  urlPathPattern: '/api/{userId}',
  bodyParamNames: ['password'],
  bodyType: 'properties',
  getRequestUrlParams: (request) => {
    return {
      userId: String(request.userId),
      traceId: String(request.traceId),
    };
  },
  getRequestBody: (request) => {
    return {
      password: request.password,
      notDefinedInBodyParamNames: -1,
    };
  },
  deserializeResponse: () => {
    throw new Error('Not implemented');
  },
  serializeRequest: () => {
    throw new Error('Not implemented');
  },
  deserializeRequest: () => {
    throw new Error('Not implemented');
  },
};

describe('OperationRequestBuilder', () => {
  const API_KEY = '0000000000000000000000000000000000000000000000000000000000000123';

  let core: MoralisCore;
  let builder: OperationRequestBuilder<TestRequest>;

  beforeEach(() => {
    core = MoralisCore.create();
    core.config.registerKey(ApiConfig.apiKey);
    core.config.set(ApiConfig.apiKey, API_KEY);
    builder = new OperationRequestBuilder<TestRequest>(operation, core);
  });

  describe('prepareUrl()', () => {
    it('returns properties body', () => {
      const { urlPath, urlSearchParams } = builder.prepareUrl({
        userId: 100,
        traceId: 200,
        password: 'foo',
      });

      expect(urlPath).toBe('/api/100');
      expect(Object.keys(urlSearchParams).length).toBe(1);
      expect(urlSearchParams['traceId']).toBe('200');
    });
  });

  describe('prepareBody()', () => {
    it('returns properties body', () => {
      const body = builder.prepareBody({
        userId: 100,
        traceId: 200,
        password: 'foo',
      }) as OperationRequestPropertiesBody;

      expect(Object.keys(body).length).toBe(1);
      expect(body['password']).toBe('foo');
    });
  });

  describe('prepareHeaders()', () => {
    it('returns headers', () => {
      const headers = builder.prepareHeaders();

      expect(headers['x-api-key']).toBe(API_KEY);
      expect(headers['x-moralis-platform']).toBe('JS SDK');
      expect(headers['x-moralis-platform-version']).toBeDefined();
      expect(headers['x-moralis-build-target']).toBe('node');
    });
  });
});
