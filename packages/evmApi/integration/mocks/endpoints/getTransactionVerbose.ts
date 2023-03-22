import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetTransactionVerbose = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetTransactionVerbose',
    url: '/transaction/:transactionHash/verbose',
    getParams: ({ req }) => ({
      transactionHash: req.params.transactionHash,
      chain: req.url.searchParams.get('chain'),
    }),
  },
  [
    {
      condition: {
        transactionHash: '0x4044044044044044044044044044044044044044044044044044044044044040',
        chain: '0x5',
      },
      response: createErrorResponse('null'),
      responseStatus: 404,
    },
    {
      condition: {
        transactionHash: '0x2000000000000000000000000000040440440440440440440440440440440440',
        chain: '0x5',
      },
      response: {},
    },
    {
      condition: {
        transactionHash: '0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d695e3f2ff',
        chain: '0x5',
      },
      response: {
        hash: '0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d695e3f2ff',
        nonce: '384698',
        transaction_index: '140',
        from_address: '0x292f04a44506c2fd49bac032e1ca148c35a478c8',
        to_address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        value: '0',
        gas: '100000',
        gas_price: '14459046318',
        input:
          '0xa9059cbb00000000000000000000000041aeb05a21f9a30fc545ad883af37df096354b7c0000000000000000000000000000000000000000000000000000000004a84476',
        receipt_cumulative_gas_used: '10861916',
        receipt_gas_used: '63209',
        receipt_contract_address: null,
        receipt_root: null,
        receipt_status: '1',
        block_timestamp: '2023-03-21T12:39:11.000Z',
        block_number: '16876068',
        block_hash: '0x4d3d1ef7df947829911570e0bc2137235d2947abf7135a79ce5bbfa3e156740c',
        transfer_index: [16876068, 140],
        logs: [
          {
            log_index: '266',
            transaction_hash: '0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d695e3f2ff',
            transaction_index: '140',
            address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            data: '0x0000000000000000000000000000000000000000000000000000000004a84476',
            topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            topic1: '0x000000000000000000000000292f04a44506c2fd49bac032e1ca148c35a478c8',
            topic2: '0x00000000000000000000000041aeb05a21f9a30fc545ad883af37df096354b7c',
            topic3: null,
            block_timestamp: '2023-03-21T12:39:11.000Z',
            block_number: '16876068',
            block_hash: '0x4d3d1ef7df947829911570e0bc2137235d2947abf7135a79ce5bbfa3e156740c',
            transfer_index: [16876068, 140, 266],
            transaction_value: '0',
            decoded_event: {
              signature: 'Transfer(address,address,uint256)',
              label: 'Transfer',
              type: 'event',
              params: [
                {
                  name: 'from',
                  value: '0x292f04a44506c2fd49Bac032E1ca148C35A478c8',
                  type: 'address',
                },
                {
                  name: 'to',
                  value: '0x41aeB05a21F9A30Fc545Ad883AF37dF096354B7c',
                  type: 'address',
                },
                {
                  name: 'value',
                  value: '78136438',
                  type: 'uint256',
                },
              ],
            },
          },
        ],
        decoded_call: {
          signature: 'transfer(address,uint256)',
          label: 'transfer',
          type: 'function',
          params: [
            {
              name: '_to',
              value: '0x41aeB05a21F9A30Fc545Ad883AF37dF096354B7c',
              type: 'address',
            },
            {
              name: '_value',
              value: '78136438',
              type: 'uint256',
            },
          ],
        },
      },
    },
  ],
);
