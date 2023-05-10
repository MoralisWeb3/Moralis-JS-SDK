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
            token_name: 'SmarDex LP-Token',
            token_symbol: 'SDEX-LP',
            token_logo: null,
            token_decimals: 18,
            from_wallet: '0x0000000000000000000000000000000000000000',
            to_wallet: '0x2f64604cfda547572c7e68bd821a88c0566630d0',
            contract_address: '0x9fcf8f5bd54db123470c96620441ca5c342a8bd4',
            block_hash: '0x987cab4a8a33ac6d1112f44f59bdda0410059e7bb033507ed8ebcbade331459c',
            block_number: '16867742',
            block_timestamp: '2023-03-20T08:37:35.000Z',
            transaction_hash: '0xdebc1c8e0e93fc848c587d6841cd4b5fb4d309ffa58faef8fad7d1a38455e0cc',
            transaction_index: '151',
            log_index: '370',
            value: '8078781185194',
            possible_spam: true,
            value_decimal: '0.000008078781185194',
          },
          {
            token_name: 'Wrapped Ether',
            token_symbol: 'WETH',
            token_logo: 'https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
            token_decimals: '18',
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
            value_decimal: '0.20111001328980588',
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
      responseStatus: 400,
      response: createErrorResponse("contract_addresses with value ''oops'' is not a valid hex address"),
    },
  ],
);
