import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetNFTOwnersByCollection = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTOwnersByCollection',
    url: `/nfts/collections/:collectionDataIdHash/owners`,
    getParams: ({ req }) => ({
      collectionDataIdHash: req.params.collectionDataIdHash,
      limit: req.url.searchParams.get('limit'),
    }),
  },
  [
    {
      condition: {
        collectionDataIdHash: 'bd1e7fef8fd8d3ff8351eb564541f43cdaeaff93bbefd4ed402af66e9d70bedc',
        limit: '2',
      },
      response: {
        cursor: null,
        hasNextPage: false,
        result: [
          {
            amount: '100000000',
            collection_data_id_hash: 'bd1e7fef8fd8d3ff8351eb564541f43cdaeaff93bbefd4ed402af66e9d70bedc',
            collection_name: 'collName552',
            creator_address: '0xe9fa81b90a846ab2737e88592a4e207e3f503bfac7e5774a4a4bc93b439258f0',
            last_transaction_timestamp: '2022-10-20T08:51:16.000Z',
            last_transaction_version: '5563252',
            name: 'popitys',
            owner_address: '0xe9fa81b90a846ab2737e88592a4e207e3f503bfac7e5774a4a4bc93b439258f0',
            property_version: '0',
            table_type: '0x3::token::TokenStore',
            token_data_id_hash: '301304744b268b2a4ed57333cd8715a84d0f503543ba981d20e6df81d0f46a8b',
            token_properties: {},
          },
        ],
      },
    },
  ],
);
