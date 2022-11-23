import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getBlock', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns null when API returns HTTP 404', async () => {
    const response = await evmApi.block.getBlock({
      blockNumberOrHash: '404',
      chain: '0x5',
    });

    expect(response).toBeNull();
  });

  it('returns null when API returns false-positive not found', async () => {
    const response = await evmApi.block.getBlock({
      blockNumberOrHash: '200404',
      chain: '0x5',
    });

    expect(response).toBeNull();
  });

  it('returns a block', async () => {
    const response = await evmApi.block.getBlock({
      blockNumberOrHash: '15416422',
      chain: '0x5',
    });
    const result = response!.result.result;

    expect(result).toBeDefined();
    expect(result.number.toString()).toEqual('15416422');
    expect(result.hash).toEqual('0xea1f77d395510ac0ef2db2aed828caf92d2c7ba4ce5632ab23b5f7078a5d6a49');
    expect(result.transactionCount).toEqual(303);
    expect(result.transactions.length).toEqual(1);
  });
});
