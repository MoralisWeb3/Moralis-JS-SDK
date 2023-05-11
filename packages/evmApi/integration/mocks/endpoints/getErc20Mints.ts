import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetErc20Mints = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetErc20Mints',
    url: `/erc20/mints`,
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
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6IjE2ODY3MTQ4Iiwib2Zmc2V0IjoxLCJpYXQiOjE2NzkzMTU3MTJ9.oIYeI6hc-qMF3gAJv97W2n-0_njk5qzhJc7C2hkuB_c',
        result: [
          {
            token_name: 'Dugo',
            token_symbol: 'DUGO',
            token_logo: 'https://cdn.moralis/i.jpg',
            token_decimals: '18',
            to_wallet: '0xd27ad1e018ab6fe4a0088ee8cfd48adfbad4f968',
            contract_address: '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03',
            block_hash: '0x4acdd65e95095545fe2c7ab1a06133e4151c617ea04e4727c278180ff77334c3',
            block_number: '16867580',
            block_timestamp: '2023-03-20T08:05:11.000Z',
            transaction_hash: '0xcfc858b220d3dd4f7d85a8914ff35d85cc2e9aecc1d5459f25a5cb6fcc00cea5',
            transaction_index: '194',
            log_index: '431',
            value: '1139661035879629629627',
            value_decimal: '1139.6610358796295',
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
