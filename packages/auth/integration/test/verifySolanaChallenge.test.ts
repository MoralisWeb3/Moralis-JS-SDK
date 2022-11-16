import { Auth } from '../../src/Auth';
import { cleanAuth, setupAuth } from '../setup';

describe('verifySolanaChallenge', () => {
  let AuthApi: Auth;

  beforeAll(() => {
    AuthApi = setupAuth();
  });

  afterAll(() => {
    cleanAuth();
  });

  describe('Verify Solana Challenge', () => {
    it('should verify solana challenge successfully', async () => {
      const result = await AuthApi.verify({
        networkType: 'solana',
        message: 'VALID_RESPONSE',
        signature: '2pH9DqD5rve2qV4yBDshcAjWd2y8TqMx8BPb7f3KoNnuLEhE5JwjruYi4jaFaD4HN6wriLz2Vdr32kRBAJmHcyny',
      });
      expect(result).toBeDefined();
      expect(result.result.id).toBeDefined();
      expect(result.result.profileId).toBeDefined();
    });

    it('should throw a 400 Error on invalid signature', async () => {
      expect(
        AuthApi.verify({
          networkType: 'solana',
          message: 'INVALID_SIGNATURE',
          signature: 'some-signature',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): INVALID_SIGNATURE: some-signature');
    });

    it('should throw a 400 Error on multi error', async () => {
      expect(
        AuthApi.verify({
          networkType: 'solana',
          message: '',
          signature: 'some-signature',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): MULTI_ERROR');
    });
  });
});
