import { Auth } from '../../src/Auth';
import { cleanAuth, setupAuth } from '../setup';

describe('verifyRemoveBind', () => {
  let AuthApi: Auth;

  beforeAll(() => {
    AuthApi = setupAuth();
  });

  afterAll(() => {
    cleanAuth();
  });

  describe('Verify Remove Bind', () => {
    it('should verify remove binded address challenge', async () => {
      const result = await AuthApi.evm.verifyRemoveBind({
        message:
          'Please sign this message to unbind:\nAddress: 0x6ed338bcB610640e81465FCfb9894DDfA354Cc91\nfrom\nProfile Id:\n- 0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff\nNonce: 5pXWu7aGkY2J7II0X',
        signature:
          '0xc4f2f59d80e036ecab4eaaac5d4ee713ab94264ca584839c98b5743c4f6777322038225a4bc1e0f13b8382166816737369f26bd66f0479cfa80d4c52c02eb2cb1b',
      });
      expect(result).toBeDefined();
      expect(result.result.profileId).toBe('0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1');
    });
  });
});
