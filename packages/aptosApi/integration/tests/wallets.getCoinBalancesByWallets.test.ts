import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('getCoinBalancesByWallets', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns balances', async () => {
    const response = await aptosApi.wallets.getCoinBalancesByWallets({
      ownerAddresses: ['0xbc4bd90ad3ff96a2172307622764ee5950790ae85f2db147f4cb8ce72dd9d13f'],
      limit: 10,
    });

    expect(response.hasNextPage).toBe(false);
    expect(response.cursor).not.toBeDefined();
    expect(response.result.length).toBe(2);

    const item1 = response.result[0];
    expect(item1.amount.aptos).toBe('0.09080143');
    expect(item1.coinTypeHash).toBe('91ceb1308a98389691e05158b07ed5f079ab78461a6bb8d5a4054b1bb5cb8bb6');
    expect(item1.ownerAddress.address).toBe('0xbc4bd90ad3ff96a2172307622764ee5950790ae85f2db147f4cb8ce72dd9d13f');
    expect(item1.coinType).toBe('0x1::aptos_coin::AptosCoin');
    expect(item1.lastTransactionTimestamp).toBe('2023-02-06T11:41:06.000Z');
    expect(item1.lastTransactionVersion).toBe('82945819');
  });
});
