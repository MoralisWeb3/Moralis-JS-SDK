import { Auth } from '../../src/Auth';
import { cleanAuth, setupAuth } from '../setup';

describe('requestEvmChallenge', () => {
  let AuthApi: Auth;

  beforeAll(() => {
    AuthApi = setupAuth();
  });

  afterAll(() => {
    cleanAuth();
  });

  describe('Request Aptos Challenge', () => {
    it('should request aptos challenge successfully', async () => {
      const result = await AuthApi.requestMessage({
        networkType: 'aptos',
        domain: 'defi.finance',
        statement: 'Please confirm',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
        network: 'mainnet',
        address: '0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d',
        publicKey: '0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d',
      });
      expect(result).toBeDefined();
      expect(result.result.id).toEqual('Mk5deGOhekYev18pJ');
      expect(result.result.message).toEqual(
        'defi.finance wants you to sign in with your Aptos account:\n0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d\n\nPlease confirm\n\nURI: https://defi.finance/\nVersion: 1\nChain ID: 1\nNonce: 3c00srSBbEfdOwn4M\nIssued At: 2023-02-06T08:38:56.456Z\nExpiration Time: 2020-01-01T00:00:00.000Z\nNot Before: 2020-01-01T00:00:00.000Z\nResources:\n- https://docs.moralis.io/',
      );
      expect(result.result.profileId).toEqual('0x13e04b6cd6f84deef360a444499cbaccae717624f96cfa6dfe7cb250eced74eb');
    });

    it('should throw a 400 Error on invalid address', async () => {
      expect(
        AuthApi.requestMessage({
          networkType: 'aptos',
          publicKey: '0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d',
          statement: 'INVALID_ADDRESS',
          domain: 'defi.finance',
          network: 'mainnet',
          address: 'some-address',
          uri: 'https://defi.finance/',
          expirationTime: '2020-01-01T00:00:00.000Z',
          notBefore: '2020-01-01T00:00:00.000Z',
          resources: ['https://docs.moralis.io/'],
          timeout: 15,
        }),
      ).rejects.toThrowError('C0005] Invalid address provided');
    });

    it('should throw a 400 Error on multi error', async () => {
      expect(
        AuthApi.requestMessage({
          networkType: 'aptos',
          statement: 'MULTI_ERROR',
          domain: 'defi.finance',
          network: 'mainnet',
          address: 'some-address',
          publicKey: '0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d',
          uri: 'finance',
          expirationTime: '2020-01-01T00:00:00.000Z',
          notBefore: '2020-01-01T00:00:00.000Z',
          resources: ['https://docs.moralis.io/'],
          timeout: 15,
        }),
      ).rejects.toThrowError('C0005] Invalid address provided');
    });
  });
});
