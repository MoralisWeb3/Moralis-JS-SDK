import { MoralisAuth } from '../../src/MoralisAuth';
import { cleanAuth, setupAuth } from '../setup';

describe('verify', () => {
  let moralisAuth: MoralisAuth;

  beforeAll(() => {
    moralisAuth = setupAuth();
  });

  afterAll(() => {
    cleanAuth();
  });

  it('should throw a an error on in valid networkType ', async () => {
    expect(
      moralisAuth.verify({
        // @ts-expect-error
        networkType: 'invalid',
        message: 'VALID_RESPONSE',
        signature: '0x12345',
      }),
    ).rejects.toThrowError('[U0002] Incorrect network provided. Got "invalid", Valid values are: "evm", "solana"');
  });

  describe('evm', () => {
    it('should verify succesfully ', async () => {
      const result = await moralisAuth.verify({
        networkType: 'evm',
        message: 'VALID_RESPONSE',
        signature: '0x12345',
      });

      expect(result).toBeDefined();
      expect(result.toJSON().id).toBeDefined();
      expect(result.toJSON().profileId).toBeDefined();
    });

    it('should default to evm networkType ', async () => {
      const result = await moralisAuth.verify({
        message: 'VALID_RESPONSE',
        signature: '0x12345',
      });

      expect(result).toBeDefined();
      expect(result.toJSON().id).toBeDefined();
      expect(result.toJSON().profileId).toBeDefined();
    });

    it('should accept deprecated network param ', async () => {
      const result = await moralisAuth.verify({
        network: 'evm',
        message: 'VALID_RESPONSE',
        signature: '0x12345',
      });

      expect(result).toBeDefined();
      expect(result.toJSON().id).toBeDefined();
      expect(result);
    });

    it('should throw a 400 Error on invalid signature ', async () => {
      expect(
        moralisAuth.verify({
          networkType: 'evm',
          message: 'INVALID_SIGNATURE',
          signature: '0x12345',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): Invalid Signature');
    });

    it('should throw a 400 Error on multiple validation errors ', async () => {
      expect(
        moralisAuth.verify({
          networkType: 'evm',
          message: 'MULTI_ERROR',
          signature: '0x12345',
        }),
      ).rejects.toThrowError(
        '[C0006] Request failed, Bad Request(400): message must be present, signature must be present',
      );
    });
  });

  describe('solana', () => {
    it('should verify succesfully ', async () => {
      const result = await moralisAuth.verify({
        networkType: 'solana',
        message: 'VALID_RESPONSE',
        signature: '0x12345',
      });

      expect(result).toBeDefined();
      expect(result.toJSON().id).toBeDefined();
      expect(result.toJSON().profileId).toBeDefined();
    });

    it('should accept deprecated network param ', async () => {
      // @ts-expect-error
      const result = await moralisAuth.verify({
        network: 'solana',
        message: 'VALID_RESPONSE',
        signature: '0x12345',
      });

      expect(result).toBeDefined();
      expect(result.toJSON().id).toBeDefined();
      expect(result.toJSON().profileId).toBeDefined();
    });

    it('should throw a 400 Error on invalid signature ', async () => {
      expect(
        moralisAuth.verify({
          networkType: 'solana',
          message: 'INVALID_SIGNATURE',
          signature: '0x12345',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): Invalid Signature');
    });

    it('should throw a 400 Error on multiple validation errors ', async () => {
      expect(
        moralisAuth.verify({
          networkType: 'solana',
          message: 'MULTI_ERROR',
          signature: '0x12345',
        }),
      ).rejects.toThrowError(
        '[C0006] Request failed, Bad Request(400): message must be present, signature must be present',
      );
    });
  });
});
