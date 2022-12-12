import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetNFTTrades = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTTrades',
    url: `/nft/:address/trades`,
    getParams: ({ req }) => ({
      address: req.params.address,
      limit: req.url.searchParams.get('limit'),
    }),
  },
  [
    {
      condition: {
        address: '0x9c57d0278199c931cf149cc769f37bb7847091e7',
        limit: '1',
      },
      response: {
        total: 2000,
        page: 0,
        page_size: 1,
        cursor: '0x12345',
        result: [
          {
            transaction_hash: '0xb30df59495a8a432b8e3d38f406aaeaad363592dbd02cf2ef4ada7643fc3861c',
            transaction_index: '254',
            token_ids: ['7781'],
            seller_address: '0xc970bd05d27466f10e0d1c8653d6bca217ef04f2',
            buyer_address: '0x9f7509cdc8b846c65482f5d2829ab47360095d82',
            token_address: '0x9c57d0278199c931cf149cc769f37bb7847091e7',
            marketplace_address: '0x00000000006c3852cbef3e08e8df289169ede581',
            price: '69990000000000000',
            price_token_address: null,
            block_timestamp: '2022-12-06T00:32:11.000Z',
            block_number: '16122185',
            block_hash: '0xd01990eb290c77fe3e7db77a83c0ff465cc3dd5f74b9eb53d9b2c2ea178c7009',
          },
        ],
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
