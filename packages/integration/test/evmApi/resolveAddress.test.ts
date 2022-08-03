import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should resolve an address and return a name', async () => {
    const result = await evmApi.resolve.resolveAddress({
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    });

    expect(result.toJSON().name).toBe('vitalik.eth');
    expect(result).toBeDefined();
    expect(result.toJSON().name).toBe('vitalik.eth'.toLowerCase());
    expect(result.raw.name).toBe('vitalik.eth');
    expect(result.result.name).toBe('vitalik.eth');
  });

  it('should not resolve an address and return an error code', async () => {
    const failedResult = await evmApi.resolve
      .resolveAddress({
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.resolve.resolveAddress({
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA9604',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
