import { Auth } from '../../src/Auth';
import { cleanAuth, setupAuth } from '../setup';

describe('verifyEvmChallenge', () => {
  let AuthApi: Auth;

  beforeAll(() => {
    AuthApi = setupAuth();
  });

  afterAll(() => {
    cleanAuth();
  });

  describe('Verify EVM Challenge', () => {
    it('should verify evm challenge successfully', async () => {
      const result = await AuthApi.verify({
        message: 'VALID_RESPONSE',
        signature: '0x1234567890abcdef0123456789abcdef1234567890abcdef',
      });
      expect(result).toBeDefined();
      expect(result.result.id).toBeDefined();
      expect(result.result.profileId).toBeDefined();
    });

    it('should throw a 400 Error on invalid signature', async () => {
      expect(
        AuthApi.verify({
          message: 'INVALID_SIGNATURE',
          signature: '0x1234567890abcdef0123456789abcdef1234567890abcde0',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): INVALID_SIGNATURE: some-signature');
    });

    it('should throw a 400 Error on multi error', async () => {
      expect(
        AuthApi.verify({
          message: '',
          signature: 'some-signature',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): MULTI_ERROR');
    });
  });
});
