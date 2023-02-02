import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetNFTTransfersByBlock = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTTransfersByBlock',
    url: `/block/:blockNumberOrHash/nft/transfers`,
    getParams: ({ req }) => ({
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
            token_address: '0x64bD6114BB43751fBdAe282f770089a9288C0936',
            token_id: '15',
            from_address: '0xDB041068aAd7C7997AE09D4965bC7ff61619c22f',
            to_address: '0x62ccB902946C97D01f41Fb9a7DC325F311762240',
            value: '1000000000000000',
            amount: '1',
            contract_type: 'ERC721',
            block_number: '88256',
            block_timestamp: '2021-06-04T16:00:15',
            block_hash: '0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553',
            transaction_hash: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
            transaction_type: 'Single',
            transaction_index: 1,
            log_index: 2,
            operator: '0x6fF7443c557d238f3Ce5892F442D20957D8ACd7F',
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
