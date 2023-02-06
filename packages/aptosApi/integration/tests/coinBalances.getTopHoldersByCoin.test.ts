import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('Moralis AptosApi', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns top holders', async () => {
    const response = await aptosApi.coinBalances.getTopHoldersByCoin({
      coinTypeHash: '91ceb1308a98389691e05158b07ed5f079ab78461a6bb8d5a4054b1bb5cb8bb6',
      limit: 2,
    });

    expect(response.hasNextPage).toBe(false);
    expect(response.cursor).not.toBeDefined();
    expect(response.result.length).toBe(2);

    const item1 = response.result[0];
    expect(item1.amount.aptos).toBe('52039866.10945473');
    expect(item1.coinTypeHash).toBe('91ceb1308a98389691e05158b07ed5f079ab78461a6bb8d5a4054b1bb5cb8bb6');
    expect(item1.ownerAddress.address).toBe('0xc739507214d0e1bf9795485299d709e00024e92f7c0d055a4c2c39717882bdfd');
    expect(item1.coinType).toBe('0x1::aptos_coin::AptosCoin');
    expect(item1.lastTransactionTimestamp).toBe('2023-02-02T18:55:40.000Z');
    expect(item1.lastTransactionVersion).toBe('81068073');
  });
});
