import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEnvApi, setupEvmApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEnvApi();
  });

  it('should get the token metadata of an account', async () => {
    const result = await evmApi.token.getTokenIdMetadata({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
      format: 'decimal',
      tokenId: '1',
    });

    expect(result).toBeDefined();
    expect(result.raw.amount).toBe('1');
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the token metadata of an invalid account and throw an error ', async () => {
    const failedResult = await evmApi.token
      .getTokenIdMetadata({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        format: 'decimal',
        tokenId: '1',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.token.getTokenIdMetadata({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        format: 'decimal',
        tokenId: '1',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
