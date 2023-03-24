import { Auth } from '../../src/Auth';
import { cleanAuth, setupAuth } from '../setup';

describe('requestSolanaChallenge', () => {
  let AuthApi: Auth;

  beforeAll(() => {
    AuthApi = setupAuth();
  });

  afterAll(() => {
    cleanAuth();
  });

  describe('Request Solana Challenge', () => {
    it('should request solana challenge successfully', async () => {
      const result = await AuthApi.requestMessage({
        domain: 'defi.finance',
        networkType: 'solana',
        network: 'mainnet',
        address: '26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo',
        statement: 'VALID_RESPONSE',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
      });
      expect(result).toBeDefined();
      expect(result.result.id).toEqual('fRyt67D3eRss3RrX');
      expect(result.result.message).toEqual('VALID_RESPONSE');
      expect(result.result.profileId).toEqual('0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1');
    });

    it('should fallback to "network" when "solnetwork" is provided', async () => {
      const result = await AuthApi.requestMessage({
        domain: 'defi.finance',
        networkType: 'solana',
        solNetwork: 'mainnet',
        // @ts-ignore
        network: undefined,
        address: '26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo',
        statement: 'VALID_RESPONSE',
        uri: 'https://defi.finance/',
        expirationTime: '2020-01-01T00:00:00.000Z',
        notBefore: '2020-01-01T00:00:00.000Z',
        resources: ['https://docs.moralis.io/'],
        timeout: 15,
      });
      expect(result).toBeDefined();
      expect(result.result.id).toEqual('fRyt67D3eRss3RrX');
      expect(result.result.message).toEqual('VALID_RESPONSE');
      expect(result.result.profileId).toEqual('0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1');
    });

    it('should throw a 400 Error on invalid address', async () => {
      expect(
        AuthApi.requestMessage({
          domain: 'defi.finance',
          networkType: 'solana',
          network: 'mainnet',
          address: '26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3U',
          statement: 'INVALID_ADDRESS',
          uri: 'https://defi.finance/',
          expirationTime: '2020-01-01T00:00:00.000Z',
          notBefore: '2020-01-01T00:00:00.000Z',
          resources: ['https://docs.moralis.io/'],
          timeout: 15,
        }),
      ).rejects.toThrowError('[C0005] Invalid Solana address provided');
    });

    it('should throw a 400 Error on multi error', async () => {
      expect(
        AuthApi.requestMessage({
          domain: 'defi.finance',
          networkType: 'solana',
          network: 'mainnet',
          address: '26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo',
          statement: 'MULTI_ERROR',
          uri: 'finance',
          expirationTime: '2020-01-01T00:00:00.000Z',
          notBefore: '2020-01-01T00:00:00.000Z',
          resources: ['https://docs.moralis.io/'],
          timeout: 15,
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): MULTI_ERROR');
    });
  });
});
