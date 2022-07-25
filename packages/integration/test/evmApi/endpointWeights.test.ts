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

  it('should get the endpoint weight ', async () => {
    const result = await evmApi.info.endpointWeights();

    expect(result.toJSON()).toStrictEqual({ endpoint: 'getBlock' });
    expect(result).toBeDefined();
    expect(result).toEqual(expect.arrayContaining([]));
  });
});
