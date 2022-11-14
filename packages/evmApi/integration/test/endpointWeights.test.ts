import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('endpointWeights', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the endpoint weight ', async () => {
    const result = await evmApi.utils.endpointWeights();

    expect(result.toJSON()).toStrictEqual({ endpoint: 'getBlock' });
    expect(result).toBeDefined();
    expect(result).toEqual(expect.arrayContaining([]));
  });
});
