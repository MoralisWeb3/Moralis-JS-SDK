import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('getTransaction', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns null when API returns HTTP 404', async () => {
    const response = await evmApi.transaction.getTransaction({
      transactionHash: '0x4044044044044044044044044044044044044044044044044044044044044040',
    });

    expect(response).toBeNull();
  });

  it('returns null when API returns false-positive not found', async () => {
    const response = await evmApi.transaction.getTransaction({
      transactionHash: '0x2000000000000000000000000000040440440440440440440440440440440440',
    });

    expect(response).toBeNull();
  });

  it('returns properly transaction', async () => {
    const response = await evmApi.transaction.getTransaction({
      transactionHash: '0x2c1150c5c8403d10714f840eb032a75f91f906c539601a4fc45835a1b830400e',
    });
    const result = response!.result;

    expect(result).toBeDefined();
    expect(result.hash).toEqual('0x2c1150c5c8403d10714f840eb032a75f91f906c539601a4fc45835a1b830400e');
    expect(result.nonce?.toString()).toEqual('4074269');
    expect(result.gas?.toString()).toEqual('1000000');
    expect(result.gasPrice?.toString()).toEqual('16772103359');
  });
});
