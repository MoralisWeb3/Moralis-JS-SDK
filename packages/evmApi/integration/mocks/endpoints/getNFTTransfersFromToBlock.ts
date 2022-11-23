import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetNFTTransfersFromToBlock = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTTransfersFromToBlock',
    url: `/nft/transfers`,
    getParams: (req) => ({
      fromBlock: req.url.searchParams.get('from_block'),
      toBlock: req.url.searchParams.get('to_block'),
    }),
  },
  [
    {
      condition: {
        fromBlock: '1',
        toBlock: '2',
      },
      response: {
        total: 2000,
        page: 2,
        page_size: 100,
        cursor: 'string',
        result: [
          {
            token_address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
            token_id: '15',
            from_address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
            to_address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
            value: '1000000000000000',
            amount: '1',
            contract_type: 'ERC721',
            block_number: '88256',
            block_timestamp: '2021-06-04T16:00:15',
            block_hash: 'string',
            transaction_hash: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
            transaction_type: 'string',
            transaction_index: 0,
            log_index: 0,
            operator: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
          },
        ],
        block_exists: true,
        index_complete: true,
      },
    },
    {
      condition: {
        fromBlock: '7',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0005] Invalid block number provided'),
    },
  ],
);
