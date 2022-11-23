import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetNFTTrades = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTTrades',
    url: `/nft/:address/trades`,
    getParams: (req) => ({
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      },
      response: {
        total: 2000,
        page: 2,
        page_size: 100,
        result: [
          {
            transaction_hash: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
            transaction_index: 'string',
            token_ids: ['15', '54'],
            seller_address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
            buyer_address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
            marketplace_address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
            price: '1000000000000000',
            block_timestamp: '2021-06-04T16:00:15',
            block_number: '13680123',
            block_hash: '0x4a7c916ca4a970358b9df90051008f729685ff05e9724a9dddba32630c37cb96',
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
