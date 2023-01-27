import { Auth } from '../../src/Auth';
import { cleanAuth, setupAuth } from '../setup';

describe('getAddresses', () => {
  let AuthApi: Auth;

  beforeAll(() => {
    AuthApi = setupAuth();
  });

  afterAll(() => {
    cleanAuth();
  });

  describe('Get Addresses', () => {
    it('should request profile addresses successfully', async () => {
      const result = await AuthApi.evm.getAddresses({
        profileId: '0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff',
      });
      expect(result).toBeDefined();
      expect(result.result.length).toBe(1);
      const address = result.result[0];
      expect(address).toEqual('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
    });
  });
});
