import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetNFTCollections = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTCollections',
    url: `/collections`,
    getParams: ({ req }) => ({
      limit: req.url.searchParams.get('limit'),
    }),
  },
  [
    {
      condition: {
        limit: '1',
      },
      response: {
        cursor: 'c.u.r.s.o.r',
        result: [
          {
            collection_data_id_hash: 'f5220e2d492bfce726c26086e7ba6948a4604fa22af736df1705d49937fe0114',
            collection_name: 'Lorem ipsum',
            creator_address: '0xe9fa81b90a846ab2737e88592a4e207e3f503bfac7e5774a4a4bc93b439258f0',
            description: 'Sit dolor',
            description_mutable: false,
            last_transaction_timestamp: '2022-10-20T19:54:07.000Z',
            last_transaction_version: '6369344',
            maximum: '9007199254740991',
            maximum_mutable: false,
            metadata_uri: '',
            supply: '0',
            table_handle: '0x691434926a0e9c9b0265bc86de879316f794f705e35786622b9ef73aee4258c0',
            uri_mutable: false,
          },
        ],
        hasNextPage: true,
      },
    },
  ],
);
