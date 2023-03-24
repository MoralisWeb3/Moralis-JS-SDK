import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetWalletNFTTransfers = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetWalletNFTTransfers',
    url: `/:address/nft/transfers`,
    getParams: ({ req }) => ({
      address: req.params.address,
      limit: req.url.searchParams.get('limit'),
    }),
  },
  [
    {
      condition: {
        address: '0xce5035d51237b4d72f6910d4ecb625e4fd6460ec',
        limit: '1',
      },
      response: {
        total: 2000,
        page: 2,
        page_size: 1,
        cursor: 'CURSOR',
        result: [
          {
            block_number: '15410857',
            block_timestamp: '2022-08-25T19:19:24.000Z',
            block_hash: '0x2102747a6aa307f9bb6075598f054ee6c555755ae0ecd7cee88588bb9971663c',
            transaction_hash: '0xd986f6983b34e6dbc0561c42f72f0dabe9802bb53b0c46c22b23652bf4dd2a04',
            transaction_index: 131,
            log_index: 175,
            value: '1000000000000000000',
            contract_type: 'ERC721',
            transaction_type: 'Single',
            token_address: '0xbc6f8c94979207b5206a3e82a3d84dc82f987829',
            token_id: '1519',
            from_address: '0x0000000000000000000000000000000000000000',
            to_address: '0xce5035d51237b4d72f6910d4ecb625e4fd6460ec',
            amount: '1',
            verified: 1,
            operator: null,
            possible_spam: false,
          },
        ],
        block_exists: true,
      },
    },
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0005] Invalid address provided'),
    },
  ],
);
