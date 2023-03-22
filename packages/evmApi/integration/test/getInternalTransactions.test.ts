import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getInternalTransactions', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('handles empty response', async () => {
    const { result } = await evmApi.transaction.getInternalTransactions({
      transactionHash: '0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d695e3f2ff',
    });

    expect(result).toStrictEqual([]);
  });

  it('returns properly internal transaction', async () => {
    const { result } = await evmApi.transaction.getInternalTransactions({
      transactionHash: '0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7f1c74e2d',
    });

    expect(result).toBeDefined();
    const [transaction] = result;

    expect(transaction).toBeDefined();
    expect(transaction.transactionHash).toEqual('0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7f1c74e2d');
    expect(transaction.type).toEqual('STATICCALL');
    expect(transaction.gas?.toString()).toEqual('263200');
    expect(transaction.gasUsed?.toString()).toEqual('2569');
  });
});
