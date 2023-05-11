import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetErc20Burns = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetErc20Burns',
    url: `/erc20/burns`,
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
          '0xa0e8fed3426391fdb446516799c4d6248e2b2860',
          '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03',
        ],
      },
      response: {
        cursor:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6IjE2ODY2NTQwIiwib2Zmc2V0IjoxLCJpYXQiOjE2NzkzOTMwNjR9.HK9IzFQOi0EgSL_1CpiMifj6umHxFXiFbNA4v3rAFSo',
        result: [
          {
            token_name: 'Dugo',
            token_symbol: 'DUGO',
            token_logo: 'https://cdn.moralis/i.jpg',
            token_decimals: '18',
            from_wallet: '0x337b8ce71620a679bcc767b9525c8bdc2573e17c',
            contract_address: '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03',
            block_hash: '0xf2be4cdf6def9f1c5395a041ca7678cbcb7e5228d93dd398f10e9659b42ac956',
            block_number: '16867006',
            block_timestamp: '2023-03-20T06:09:23.000Z',
            transaction_hash: '0x16d7bfcc59a1ef672cde3bd61ad9e49b53857de939b36014d23ab829e00c8557',
            transaction_index: '79',
            log_index: '182',
            value: '1800000000000000000000',
            value_decimal: '1800',
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
