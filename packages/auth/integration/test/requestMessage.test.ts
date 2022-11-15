import { Auth } from '../../src/Auth';
import { cleanAuth, setupAuth } from '../setup';

describe('requestMessage', () => {
  let auth: Auth;

  beforeAll(() => {
    auth = setupAuth();
  });

  afterAll(() => {
    cleanAuth();
  });

  it('should throw a an error on in valid networkType ', async () => {
    expect(
      auth.requestMessage({
        // @ts-expect-error
        networkType: 'invalid',
        domain: 'defi.finance',
        chain: 1,
        address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        statement: 'INVALID_ADDRESS',
        uri: 'https://defi.finance/',
        expirationTime: '2023-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 50,
      }),
    ).rejects.toThrowError('[U0002] Incorrect network provided. Got "invalid", Valid values are: "evm", "solana"');
  });

  describe('evm', () => {
    it('should create an message succesfully ', async () => {
      const result = await auth.requestMessage({
        networkType: 'evm',
        domain: 'defi.finance',
        chain: 1,
        address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        statement: 'VALID_RESPONSE',
        uri: 'https://defi.finance/',
        expirationTime: '2023-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 50,
      });

      expect(result).toBeDefined();
      expect(result.toJSON().message).toBeDefined();
      expect(result.toJSON().profileId).toBeDefined();
    });

    it('should default to evm networkType ', async () => {
      const result = await auth.requestMessage({
        domain: 'defi.finance',
        chain: 1,
        address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        statement: 'VALID_RESPONSE',
        uri: 'https://defi.finance/',
        expirationTime: '2023-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 50,
      });

      expect(result).toBeDefined();
      expect(result.toJSON().message).toBeDefined();
      expect(result.toJSON().profileId).toBeDefined();
    });

    it('should accept deprecated network param ', async () => {
      const result = await auth.requestMessage({
        network: 'evm',
        domain: 'defi.finance',
        chain: 1,
        address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        statement: 'VALID_RESPONSE',
        uri: 'https://defi.finance/',
        expirationTime: '2023-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 50,
      });

      expect(result).toBeDefined();
      expect(result.toJSON().message).toBeDefined();
      expect(result.toJSON().profileId).toBeDefined();
    });

    it('should throw a 400 Error on invalid address ', async () => {
      expect(
        auth.requestMessage({
          networkType: 'evm',
          domain: 'defi.finance',
          chain: 1,
          address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
          statement: 'INVALID_ADDRESS',
          uri: 'https://defi.finance/',
          expirationTime: '2023-01-01T00:00:00.000Z',
          notBefore: '2020-01-01T00:00:00.000Z',
          resources: ['https://docs.moralis.io/'],
          timeout: 50,
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): address must be an Ethereum address');
    });

    it('should throw a 400 Error on multiple validation errors ', async () => {
      expect(
        auth.requestMessage({
          networkType: 'evm',
          domain: 'defi.finance',
          chain: 1,
          address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
          statement: 'MULTI_ERROR',
          uri: 'https://defi.finance/',
          expirationTime: '2023-01-01T00:00:00.000Z',
          notBefore: '2020-01-01T00:00:00.000Z',
          resources: ['https://docs.moralis.io/'],
          timeout: 50,
        }),
      ).rejects.toThrowError(
        '[C0006] Request failed, Bad Request(400): domain must be a valid domain name, address must be an Ethereum address',
      );
    });
  });

  describe('solana', () => {
    it('should create an message succesfully ', async () => {
      const result = await auth.requestMessage({
        networkType: 'solana',
        domain: 'defi.finance',
        solNetwork: 'mainnet',
        address: 'DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHmZEYC8RTb',
        statement: 'VALID_RESPONSE',
        uri: 'https://defi.finance/',
        expirationTime: '2023-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 50,
      });

      expect(result).toBeDefined();
      expect(result.toJSON().message).toBeDefined();
      expect(result.toJSON().profileId).toBeDefined();
    });

    it('should accept deprecated network param ', async () => {
      // @ts-expect-error
      const result = await auth.requestMessage({
        network: 'solana',
        domain: 'defi.finance',
        solNetwork: 'mainnet',
        address: 'DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHmZEYC8RTb',
        statement: 'VALID_RESPONSE',
        uri: 'https://defi.finance/',
        expirationTime: '2023-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 50,
      });

      expect(result).toBeDefined();
      expect(result.toJSON().message).toBeDefined();
      expect(result.toJSON().profileId).toBeDefined();
    });

    it('should throw a 400 Error on invalid address ', async () => {
      expect(
        auth.requestMessage({
          networkType: 'solana',
          domain: 'defi.finance',
          solNetwork: 'mainnet',
          address: 'DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHmZEYC8RTb',
          statement: 'INVALID_ADDRESS',
          uri: 'https://defi.finance/',
          expirationTime: '2023-01-01T00:00:00.000Z',
          notBefore: '2020-01-01T00:00:00.000Z',
          resources: ['https://docs.moralis.io/'],
          timeout: 50,
        }),
      ).rejects.toThrowError(
        '[C0006] Request failed, Bad Request(400): address must be longer than or equal to 44 characters',
      );
    });

    it('should throw a 400 Error on multiple validation errors ', async () => {
      expect(
        auth.requestMessage({
          networkType: 'solana',
          domain: 'defi.finance',
          solNetwork: 'mainnet',
          address: 'DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHmZEYC8RTb',
          statement: 'MULTI_ERROR',
          uri: 'https://defi.finance/',
          expirationTime: '2023-01-01T00:00:00.000Z',
          notBefore: '2020-01-01T00:00:00.000Z',
          resources: ['https://docs.moralis.io/'],
          timeout: 50,
        }),
      ).rejects.toThrowError(
        '[C0006] Request failed, Not Found(404): domain must be a valid domain name, network should not be empty',
      );
    });
  });
});
