import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetInternalTransaction = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetInternalTransaction',
    url: '/transaction/:transactionHash/internal-transactions',
    getParams: ({ req }) => ({
      transactionHash: req.params.transactionHash,
      chain: req.url.searchParams.get('chain'),
    }),
  },
  [
    {
      condition: {
        transactionHash: '0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d695e3f2ff',
        chain: '0x1',
      },
      response: [],
    },
    {
      condition: {
        transactionHash: '0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7f1c74e2d',
        chain: '0x1',
      },
      response: [
        {
          transaction_hash: '0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7f1c74e2d',
          block_number: 16876143,
          block_hash: '0xc8d7592122307a771c5172af09699b5a2d36fa540d0fbc656f3d52c619c7536e',
          type: 'STATICCALL',
          from: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
          to: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
          value: '0',
          gas: '263200',
          gas_used: '2569',
          input: '0x96e494e8d40a37cd10c71cb3896d1b05b6c707e29cb5aeff0278c6fc7e5e5b31623a1baa',
          output: '0x0000000000000000000000000000000000000000000000000000000000000001',
        },
        {
          transaction_hash: '0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7f1c74e2d',
          block_number: 16876143,
          block_hash: '0xc8d7592122307a771c5172af09699b5a2d36fa540d0fbc656f3d52c619c7536e',
          type: 'STATICCALL',
          from: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
          to: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
          value: '0',
          gas: '254917',
          gas_used: '523',
          input: '0xd6e4fa86d40a37cd10c71cb3896d1b05b6c707e29cb5aeff0278c6fc7e5e5b31623a1baa',
          output: '0x0000000000000000000000000000000000000000000000000000000000000000',
        },
      ],
    },
  ],
);
