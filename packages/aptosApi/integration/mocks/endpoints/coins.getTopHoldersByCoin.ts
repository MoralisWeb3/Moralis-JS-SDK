import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetTopHoldersByCoin = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetTopHoldersByCoin',
    url: `/coins/owners/:coin_type_hash/top-holders`,
    getParams: ({ req }) => ({
      coinTypeHash: req.params.coin_type_hash,
      limit: req.url.searchParams.get('limit'),
    }),
  },
  [
    {
      condition: {
        coinTypeHash: '91ceb1308a98389691e05158b07ed5f079ab78461a6bb8d5a4054b1bb5cb8bb6',
        limit: '2',
      },
      response: {
        hasNextPage: false,
        result: [
          {
            amount: '5203986610945473',
            coin_type_hash: '91ceb1308a98389691e05158b07ed5f079ab78461a6bb8d5a4054b1bb5cb8bb6',
            owner_address: '0xc739507214d0e1bf9795485299d709e00024e92f7c0d055a4c2c39717882bdfd',
            coin_type: '0x1::aptos_coin::AptosCoin',
            last_transaction_timestamp: '2023-02-02T18:55:40.000Z',
            last_transaction_version: '81068073',
          },
          {
            amount: '1679493633445700',
            coin_type_hash: '91ceb1308a98389691e05158b07ed5f079ab78461a6bb8d5a4054b1bb5cb8bb6',
            owner_address: '0xaaa9c5fb3b4855e1569321041febcc1146b44af3f08893d4ce41846cc7e25645',
            coin_type: '0x1::aptos_coin::AptosCoin',
            last_transaction_timestamp: '2023-02-02T22:26:31.000Z',
            last_transaction_version: '81147167',
          },
        ],
      },
    },
  ],
);
