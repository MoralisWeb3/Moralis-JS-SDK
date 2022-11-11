import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createSimpleAuthResponse } from '../response/simpleAuthResponse';

export const mockRequestEvmChallenge = MockScenarios.create(
  {
    method: 'post',
    name: 'mockRequestEvmChallenge',
    url: `/challenge/request/evm`,
    getParams: (req) => ({
      domain: req.body.domain,
      chain: req.body.chainId,
      address: req.body.address,
      statement: req.body.statement,
      uri: req.body.uri,
      expirationTime: req.body.expirationTime,
      notBefore: req.body.notBefore,
      resources: req.body.resources,
      timeout: req.body.timeout,
      networkType: req.body.networkType,
    }),
  },
  [
    {
      condition: {
        statement: 'VALID_RESPONSE',
        domain: 'defi.finance',
        address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        chain: '0x1',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
      },
      response: createSimpleAuthResponse(
        'fRyt67D3eRss3RrXa',
        'VALID_RESPONSE',
        '0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1',
      ),
    },
    {
      condition: {
        statement: 'INVALID_ADDRESS',
        domain: 'defi.finance',
        chain: '0x1',
        address: 'some-address',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
        networkType: 'evm',
      },
      responseStatus: 400,
      response: createErrorResponse('INVALID_ADDRESS: some-address'),
    },
    {
      condition: {
        statement: 'MULTI_ERROR',
        domain: 'defi.finance',
        chain: '1',
        address: 'some-address',
        uri: 'finance',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
        networkType: 'evm',
      },
      responseStatus: 400,
      response: createErrorResponse('MULTI ERROR'),
    },
  ],
);
