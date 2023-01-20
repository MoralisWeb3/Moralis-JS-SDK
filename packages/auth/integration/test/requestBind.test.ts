import { Auth } from '../../src/Auth';
import { cleanAuth, setupAuth } from '../setup';

describe('requestBind', () => {
  let AuthApi: Auth;

  beforeAll(() => {
    AuthApi = setupAuth();
  });

  afterAll(() => {
    cleanAuth();
  });

  describe('Request Bind', () => {
    it('should request a challenge to bind addresses', async () => {
      const result = await AuthApi.evm.requestBind({
        addresses: [
          {
            blockchainType: 'evm',
            address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
          },
          {
            blockchainType: 'evm',
            address: '0x57af6B90c2237d2F888bf4CAe56f25FE1b14e531',
          },
        ],
      });
      expect(result).toBeDefined();
      expect(result.result.messages.length).toBe(2);
      const [firstMessage, secondMessage] = result.result.messages;
      expect(firstMessage).toEqual(
        'Please sign this message to bind:\nProfile Ids:\n- 0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff\n\nwith\n\nAddress: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045\nNonce: 5pXWu7aGkY2J7II0X',
      );
      expect(secondMessage).toEqual(
        'Please sign this message to bind:\nProfile Ids:\n- 0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff\n\nwith\n\nAddress: 0x57af6B90c2237d2F888bf4CAe56f25FE1b14e531\nNonce: 5pXWu7aGkY2J7II0X',
      );
    });

    it('should fail when requesting to bind just one address', async () => {
      expect(
        AuthApi.evm.requestBind({
          addresses: [
            {
              blockchainType: 'evm',
              address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
            },
          ],
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): addresses must contain at least 2 elements');
    });
  });
});
