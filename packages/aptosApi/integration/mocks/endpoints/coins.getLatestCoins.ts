import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetLatestCoins = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetLatestCoins',
    url: `/coins/latest`,
    getParams: ({ req }) => ({
      limit: req.url.searchParams.get('limit'),
    }),
  },
  [
    {
      condition: {
        limit: '2',
      },
      response: {
        cursor: 'cursor!',
        hasNextPage: true,
        result: [
          {
            coin_type:
              '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948::lp_coin::LP<0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdtCoin, 0x1::aptos_coin::AptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated>',
            coin_type_hash: '069476fd0e9663039084fcd721540374c2313c9f0dffe81130970774a22855c3',
            name: 'LiquidLP-USDT-APT-U',
            creator_address: '0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948',
            decimals: 6,
            supply_aggregator_table_handle: null,
            supply_aggregator_table_key: null,
            symbol: 'USDT-APT',
            transaction_created_timestamp: '2023-02-07T08:54:55.000Z',
            transaction_version_created: '83401661',
          },
          {
            coin_type:
              '0xd1c6deb6d98cd356a160c901909a282f1478c547d5ae3154a5f54ff0c25f49c3::vault::IbToken<0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT>',
            coin_type_hash: 'ed9bd9c81d49a0ed7f5c6b5ecf597bb23cd54c7dd0b67c3ccba2b3f0804b8bb0',
            name: 'IblzUSDT',
            creator_address: '0xd1c6deb6d98cd356a160c901909a282f1478c547d5ae3154a5f54ff0c25f49c3',
            decimals: 6,
            supply_aggregator_table_handle: null,
            supply_aggregator_table_key: null,
            symbol: 'IblzUSDT',
            transaction_created_timestamp: '2023-02-07T08:12:00.000Z',
            transaction_version_created: '83386839',
          },
        ],
      },
    },
  ],
);
