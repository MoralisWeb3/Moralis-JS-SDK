import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('getLatestCoins', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns latest coins', async () => {
    const response = await aptosApi.coins.getCoinInfoByCoinTypeHashes({
      coinTypeHashes: ['069476fd0e9663039084fcd721540374c2313c9f0dffe81130970774a22855c3'],
    });

    const item1 = response[0];
    expect(item1.coinType).toBe(
      '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948::lp_coin::LP<0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdtCoin, 0x1::aptos_coin::AptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated>',
    );
    expect(item1.coinTypeHash).toBe('069476fd0e9663039084fcd721540374c2313c9f0dffe81130970774a22855c3');
    expect(item1.creatorAddress.address).toBe('0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948');
    expect(item1.decimals).toBe(6);
    expect(item1.name).toBe('LiquidLP-USDT-APT-U');
    expect(item1.supplyAggregatorTableHandle).toBeNull();
    expect(item1.supplyAggregatorTableKey).toBeNull();
    expect(item1.symbol).toBe('USDT-APT');
    expect(item1.transactionCreatedTimestamp).toBe('2023-02-07T08:54:55.000Z');
    expect(item1.transactionVersionCreated).toBe('83401661');
  });
});
