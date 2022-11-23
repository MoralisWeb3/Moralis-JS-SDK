import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetNFTTransfersByBlock = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTTransfersByBlock',
    url: `/block/:blockNumberOrHash/nft/transfers`,
    getParams: (req) => ({
      blockNumberOrHash: req.params.blockNumberOrHash,
    }),
  },
  [
    {
      condition: {
        blockNumberOrHash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171',
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
        blockNumberOrHash: '0x75e3e9c92162e62000425c98769965a76c2e387',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0005] Invalid block number or block hash provided'),
    },
  ],
);
