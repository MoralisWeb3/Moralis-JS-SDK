import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi2, setupEvmApi2 } from '../setup';

describe('endpointWeights', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi2();
  });

  afterAll(() => {
    cleanEvmApi2();
  });

  it('should get the endpoint weight ', async () => {
    const result = await evmApi.utils.endpointWeights();

    const getBlock = result.result.find((item) => item.endpoint === 'getBlock');
    expect(getBlock?.path).toBe('/block/{block_number_or_hash}');
    expect(getBlock?.price).toBe(5);
    expect((getBlock as any).rateLimitCost).toBe(5); // TODO: we need to update the model.

    const getContractEvents = result.result.find((item) => item.endpoint === 'getContractEvents');
    expect(getContractEvents?.path).toBe('/{address}/events');
    expect(getContractEvents?.price).toBe(2);
    expect((getContractEvents as any).rateLimitCost).toBe(2); // TODO: we need to update the model.

    const getTransactions = result.result.find((item) => item.endpoint === 'getTransactions');
    expect(getTransactions?.path).toBe('/transaction/{transaction_hash}');
    expect(getTransactions?.price).toBe(1);
    expect((getTransactions as any).rateLimitCost).toBe(1); // TODO: we need to update the model.
  });
});
