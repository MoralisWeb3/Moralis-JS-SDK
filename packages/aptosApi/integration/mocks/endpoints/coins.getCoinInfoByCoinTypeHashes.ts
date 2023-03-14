import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetCoinInfoByCoinTypeHashes = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetCoinInfoByCoinTypeHashes',
    url: `/coins`,
    getParams: ({ req }) => ({
      coinTypeHashes: req.url.searchParams.get('coin_type_hashes[]'),
    }),
  },
  [
    {
      condition: {
        coinTypeHashes: '069476fd0e9663039084fcd721540374c2313c9f0dffe81130970774a22855c3',
      },
      response: [
        {
          coin_type:
            '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948::lp_coin::LP<0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdtCoin, 0x1::aptos_coin::AptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated>',
          coin_type_hash: '069476fd0e9663039084fcd721540374c2313c9f0dffe81130970774a22855c3',
          creator_address: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
          decimals: 6,
          name: 'LiquidLP-USDT-APT-U',
          supply_aggregator_table_handle: null,
          supply_aggregator_table_key: null,
          symbol: 'USDT-APT',
          transaction_created_timestamp: '2023-02-07T08:54:55.000Z',
          transaction_version_created: '83401661',
        },
      ],
    },
  ],
);
