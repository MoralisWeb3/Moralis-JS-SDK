import { MoralisAuth } from '../../src/MoralisAuth';
import { cleanAuth, setupAuth } from '../setup';

describe('requestEvmChallenge', () => {
  let AuthApi: MoralisAuth;

  beforeAll(() => {
    AuthApi = setupAuth();
  });

  afterAll(() => {
    cleanAuth();
  });

  describe('Request EVM Challenge', () => {
    it('should request evm succesfully', async () => {
      const result = await AuthApi.requestMessage({
        networkType: 'evm',
        statement: 'VALID_RESPONSE',
        domain: 'defi.finance',
        chain: '0x1',
        address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
      });
      expect(result).toBeDefined();
      expect(result.toJSON().id).toEqual('fRyt67D3eRss3RrXa');
      expect(result.toJSON().message).toEqual('VALID_RESPONSE');
      expect(result.result.profileId).toEqual('0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1');
    });

    it('should throw a 400 Error on invalid address', async () => {
      expect(
        AuthApi.requestMessage({
          networkType: 'evm',
          statement: 'INVALID_ADDRESS',
          domain: 'defi.finance',
          chain: '0x1',
          address: 'some-address',
          uri: 'https://defi.finance/',
          expirationTime: '2020-01-01T00:00:00.000Z',
          notBefore: '2020-01-01T00:00:00.000Z',
          resources: ['https://docs.moralis.io/'],
          timeout: 15,
        }),
      ).rejects.toThrowError('C0005] Invalid address provided');
    });
    it('should default to evm networkType', async () => {
      const result = await AuthApi.requestMessage({
        statement: 'VALID_RESPONSE',
        domain: 'defi.finance',
        chain: '0x1',
        address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
      });
      expect(result).toBeDefined();
      expect(result.toJSON().id).toEqual('fRyt67D3eRss3RrXa');
      expect(result.toJSON().message).toEqual('VALID_RESPONSE');
      expect(result.result.profileId).toEqual('0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1');
    });
    it('should throw a 400 Error on multi error', async () => {
      expect(
        AuthApi.requestMessage({
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
        }),
      ).rejects.toThrowError('C0005] Invalid address provided');
    });

    it('should return successfull for depracated network parameters', async () => {
      const result = await AuthApi.requestMessage({
        network: 'evm',
        statement: 'VALID_RESPONSE',
        domain: 'defi.finance',
        chain: '0x1',
        address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
      });
      expect(result).toBeDefined();
      expect(result.toJSON().id).toEqual('fRyt67D3eRss3RrXa');
      expect(result.toJSON().message).toEqual('VALID_RESPONSE');
      expect(result.result.profileId).toEqual('0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1');
    });
  });
});
