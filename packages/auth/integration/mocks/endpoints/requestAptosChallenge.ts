import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createSimpleAuthResponse } from '../response/simpleAuthResponse';

export const mockRequestAptosChallenge = MockScenarios.create(
  {
    method: 'post',
    name: 'mockRequestAptosChallenge',
    url: `/challenge/request/aptos`,
    getParams: ({ reqBody }) => {
      return {
        domain: reqBody?.domain,
        chainId: reqBody?.chainId,
        address: reqBody?.address,
        publicKey: reqBody?.publicKey,
        statement: reqBody?.statement,
        uri: reqBody?.uri,
        expirationTime: reqBody?.expirationTime,
        notBefore: reqBody?.notBefore,
        resources: reqBody?.resources,
        timeout: reqBody?.timeout,
        networkType: reqBody?.networkType,
      };
    },
  },
  [
    {
      condition: {
        domain: 'defi.finance',
        chainId: 'mainnet',
        address: '0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d',
        publicKey: '0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d',
        statement: 'Please confirm',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
      },
      response: createSimpleAuthResponse(
        'Mk5deGOhekYev18pJ',
        'defi.finance wants you to sign in with your Aptos account:\n0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d\n\nPlease confirm\n\nURI: https://defi.finance/\nVersion: 1\nChain ID: 1\nNonce: 3c00srSBbEfdOwn4M\nIssued At: 2023-02-06T08:38:56.456Z\nExpiration Time: 2020-01-01T00:00:00.000Z\nNot Before: 2020-01-01T00:00:00.000Z\nResources:\n- https://docs.moralis.io/',
        '0x13e04b6cd6f84deef360a444499cbaccae717624f96cfa6dfe7cb250eced74eb',
      ),
    },
    {
      condition: {
        statement: 'INVALID_ADDRESS',
        domain: 'defi.finance',
        chain: 'mainnet',
        address: 'some-address',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
        networkType: 'aptos',
      },
      responseStatus: 400,
      response: createErrorResponse('INVALID_ADDRESS: some-address'),
    },
    {
      condition: {
        statement: 'MULTI_ERROR',
        domain: 'defi.finance',
        chain: 'mainnet',
        address: 'some-address',
        uri: 'finance',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
        networkType: 'aptos',
      },
      responseStatus: 400,
      response: createErrorResponse('MULTI ERROR'),
    },
  ],
);
