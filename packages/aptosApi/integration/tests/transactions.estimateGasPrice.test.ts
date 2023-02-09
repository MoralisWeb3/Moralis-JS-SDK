import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('estimateGasPrice', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns gas price', async () => {
    const response = await aptosApi.transactions.estimateGasPrice({});

    expect(response.deprioritizedGasEstimate).toBe(100);
    expect(response.gasEstimate).toBe(133);
    expect(response.prioritizedGasEstimate).toBe(150);
  });
});
