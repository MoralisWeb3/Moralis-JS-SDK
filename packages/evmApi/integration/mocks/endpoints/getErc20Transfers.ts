import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetErc20Transfers = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetErc20Transfers',
    url: `/erc20/transfers`,
    getParams: ({ req }) => {
      return {
        limit: req.url.searchParams.get('limit'),
        from_block: req.url.searchParams.get('from_block'),
        to_block: req.url.searchParams.get('to_block'),
        contract_addresses: req.url.searchParams.getAll('contract_addresses[]'),
      };
    },
  },
  [
    {
      condition: {
        limit: '3',
        from_block: '16000000',
        to_block: '16867742',
        contract_addresses: [
          '0x9fcf8f5bd54db123470c96620441ca5c342a8bd4',
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        ],
      },
      response: {
        cursor:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6IjE2ODY3NzQyIiwib2Zmc2V0IjozLCJpYXQiOjE2NzkzMDQzODJ9.SL7SuqI5KgA-tfH8SJquvY2U0cSsLfdzbQVDK34OjGM',
        result: [
          {
            from_wallet: '0x2f64604cfda547572c7e68bd821a88c0566630d0',
            to_wallet: '0x9fcf8f5bd54db123470c96620441ca5c342a8bd4',
            contract_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            block_hash: '0x987cab4a8a33ac6d1112f44f59bdda0410059e7bb033507ed8ebcbade331459c',
            block_number: '16867742',
            block_timestamp: '2023-03-20T08:37:35.000Z',
            transaction_hash: '0xdebc1c8e0e93fc848c587d6841cd4b5fb4d309ffa58faef8fad7d1a38455e0cc',
            transaction_index: '151',
            log_index: '368',
            value: '201110013289805900',
            possible_spam: false,
          },
          {
            from_wallet: '0x9fcf8f5bd54db123470c96620441ca5c342a8bd4',
            to_wallet: '0x7e473d028b80ad6408eb9fc1a54b4584cad69231',
            contract_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            block_hash: '0x987cab4a8a33ac6d1112f44f59bdda0410059e7bb033507ed8ebcbade331459c',
            block_number: '16867742',
            block_timestamp: '2023-03-20T08:37:35.000Z',
            transaction_hash: '0xdebc1c8e0e93fc848c587d6841cd4b5fb4d309ffa58faef8fad7d1a38455e0cc',
            transaction_index: '151',
            log_index: '366',
            value: '390000000000000',
            possible_spam: false,
          },
          {
            from_wallet: '0xef1c6e67703c7bd7107eed8303fbe6ec2554bf6b',
            to_wallet: '0xa24b0a58029d6107c706f8919109e95e844ad289',
            contract_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            block_hash: '0x987cab4a8a33ac6d1112f44f59bdda0410059e7bb033507ed8ebcbade331459c',
            block_number: '16867742',
            block_timestamp: '2023-03-20T08:37:35.000Z',
            transaction_hash: '0x0fbf0324b954efa2a3ef8131ebd147f2718784874b9c4998b8be1dd6b9259e19',
            transaction_index: '149',
            log_index: '362',
            value: '120000000000000000',
            possible_spam: false,
          },
        ],
      },
    },
    {
      condition: {
        contract_addresses: ['0x0000000000000000000000000000000000000000'],
      },
      response: {
        cursor: null,
        result: [],
      },
    },
    {
      condition: {
        contract_addresses: ['oops'],
      },
      response: createErrorResponse("contract_addresses with value ''oops'' is not a valid hex address"),
    },
  ],
);
