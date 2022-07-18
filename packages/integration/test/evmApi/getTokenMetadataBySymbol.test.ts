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

  it('should get the metadata by symbol', async () => {
    const result = await evmApi.token.getTokenMetadataBySymbol({
      symbols: ['LINK'],
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.arrayContaining([]));
    expect(result.raw).toStrictEqual({ address: '0x514910771af9ca656af840dff83e8264ecf986ca' });
  });
});
