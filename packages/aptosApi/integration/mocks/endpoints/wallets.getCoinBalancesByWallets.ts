import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetCoinBalancesByWallets = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetCoinBalancesByWallets',
    url: `/wallets/coins`,
    getParams: ({ req }) => ({
      limit: req.url.searchParams.get('limit'),
      ownerAddresses: req.url.searchParams.get('owner_addresses[]'),
    }),
  },
  [
    {
      condition: {
        limit: '10',
        ownerAddresses: '0xbc4bd90ad3ff96a2172307622764ee5950790ae85f2db147f4cb8ce72dd9d13f',
      },
      response: {
        hasNextPage: false,
        result: [
          {
            amount: '9080143',
            coin_type_hash: '91ceb1308a98389691e05158b07ed5f079ab78461a6bb8d5a4054b1bb5cb8bb6',
            owner_address: '0xbc4bd90ad3ff96a2172307622764ee5950790ae85f2db147f4cb8ce72dd9d13f',
            coin_type: '0x1::aptos_coin::AptosCoin',
            last_transaction_timestamp: '2023-02-06T11:41:06.000Z',
            last_transaction_version: '82945819',
          },
          {
            amount: '97914848',
            coin_type_hash: 'fa4a1de6fcaea5d87155218712be91c3c2c02cd261cb12a5aeadad05b4708edd',
            owner_address: '0xbc4bd90ad3ff96a2172307622764ee5950790ae85f2db147f4cb8ce72dd9d13f',
            coin_type:
              '0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin',
            last_transaction_timestamp: '2023-02-06T11:41:06.000Z',
            last_transaction_version: '82945819',
          },
        ],
      },
    },
  ],
);
