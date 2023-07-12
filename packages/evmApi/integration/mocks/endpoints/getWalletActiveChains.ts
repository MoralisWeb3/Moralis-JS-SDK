import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetWalletActiveChains = MockScenarios.create(
  {
    name: 'mockGetWalletActiveChains',
    getParams: ({ req }) => ({
      address: req.params.address,
      chains: req.url.searchParams.get('chains[]'),
    }),
    url: '/wallets/:address/chains',
    method: 'get',
  },
  [
    {
      condition: {
        address: '0x78605df79524164911c144801f41e9811b7db73d',
        chains: '0x1',
      },
      response: {
        address: '0x78605df79524164911c144801f41e9811b7db73d',
        active_chains: [
          {
            chain: 'eth',
            chain_id: '0x1',
            first_transaction: {
              block_timestamp: '2021-06-21T07:57:29.000Z',
              block_number: '12676437',
              transaction_hash: '0xbf9bbdc096c8930de737c7e34fdd6d801419c1cd06579283336454a74e438333',
            },
            last_transaction: {
              block_timestamp: '2023-07-09T09:38:59.000Z',
              block_number: '17655315',
              transaction_hash: '0x827ee351ef48bab07f9330d3653d73355f82e5c9535d5887ff7e55e609079fca',
            },
          },
        ],
      },
    },
  ],
);
