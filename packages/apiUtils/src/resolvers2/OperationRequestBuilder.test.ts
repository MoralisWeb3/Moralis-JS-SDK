import Core, { Operation, OperationRequestPropertiesBody } from '@moralisweb3/common-core';
import { ApiUtilsConfig } from '../config';
import { OperationRequestBuilder } from './OperationRequestBuilder';

export interface TestRequest {
  userId: number;
  traceId: number;
  password: string;
  flag: boolean;
}

const operation: Operation<TestRequest, unknown, unknown, unknown> = {
  name: 'test',
  id: 'test',
  groupName: 'test',
  method: 'POST',
  urlPathParamNames: ['userId'],
  urlSearchParamNames: ['traceId', 'flag'],
  urlPathPattern: '/api/{userId}',
  bodyParamNames: ['password'],
  bodyType: 'properties',
  getRequestUrlParams: (request) => {
    return {
      userId: String(request.userId),
      trace_id: String(request.traceId),
      extraSearchParam: '100',
      flag: request.flag,
    };
  },
  getRequestBody: (request) => {
    return {
      password: request.password,
      extraBodyParam: 900,
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

  let core: Core;
  let builder: OperationRequestBuilder<TestRequest>;

  beforeEach(() => {
    core = Core.create();
    core.config.registerKey(ApiUtilsConfig.apiKey);
    core.config.set(ApiUtilsConfig.apiKey, API_KEY);
    builder = new OperationRequestBuilder<TestRequest>(operation, core);
  });

  describe('prepareUrl()', () => {
    it('returns correct values', () => {
      const { url, urlSearchParams } = builder.prepareUrl('https://localhost', {
        userId: 100,
        traceId: 200,
        password: 'foo',
        flag: true,
      });

      expect(url).toBe('https://localhost/api/100');
      expect(Object.keys(urlSearchParams).length).toBe(3);
      expect(urlSearchParams['trace_id']).toBe('200');
      expect(urlSearchParams['extraSearchParam']).toBe('100');
      expect(urlSearchParams['flag']).toBe(true);
    });

    it('keeps false value', () => {
      const { urlSearchParams } = builder.prepareUrl('https://localhost', {
        userId: 1,
        traceId: 1,
        password: '1',
        flag: false,
      });

      expect(urlSearchParams['flag']).toBe(false);
    });
  });

  describe('prepareBody()', () => {
    it('returns properties body', () => {
      const body = builder.prepareBody({
        userId: 100,
        traceId: 200,
        password: 'foo',
        flag: true,
      }) as OperationRequestPropertiesBody;

      expect(Object.keys(body).length).toBe(2);
      expect(body['password']).toBe('foo');
      expect(body['extraBodyParam']).toBe(900);
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
