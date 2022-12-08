import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createSimpleAuthResponse } from '../response/simpleAuthResponse';

export const mockRequestSolanaChallenge = MockScenarios.create(
  {
    method: 'post',
    name: 'mockRequestSolanaChallenge',
    url: `/challenge/request/solana`,
    getParams: async ({ reqBody }) => {
      return {
        domain: reqBody?.domain,
        networkType: reqBody?.networkType,
        solNetwork: reqBody?.solNetwork,
        address: reqBody?.address,
        statement: reqBody?.statement,
        uri: reqBody?.uri,
        expirationTime: reqBody?.expirationTime,
        notBefore: reqBody?.notBefore,
        resources: reqBody?.resources,
        timeout: reqBody?.timeout,
      };
    },
  },
  [
    {
      condition: {
        domain: 'defi.finance',
        address: '26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo',
        statement: 'VALID_RESPONSE',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
      },
      response: createSimpleAuthResponse(
        'fRyt67D3eRss3RrX',
        'VALID_RESPONSE',
        '0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1',
      ),
    },
    {
      condition: {
        domain: 'defi.finance',
        address: '26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3U',
        statement: 'INVALID_ADDRESS',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
      },
      responseStatus: 400,
      response: createErrorResponse('INVALID_ADDRESS: some-address'),
    },
    {
      condition: {
        domain: 'defi.finance',
        address: '26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo',
        statement: 'MULTI_ERROR',
        uri: 'finance',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
      },
      responseStatus: 400,
      response: createErrorResponse('MULTI_ERROR'),
    },
  ],
);
