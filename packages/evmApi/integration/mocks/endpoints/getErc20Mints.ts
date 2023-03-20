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
            to_wallet: '0xd27ad1e018ab6fe4a0088ee8cfd48adfbad4f968',
            contract_address: '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03',
            block_hash: '0x4acdd65e95095545fe2c7ab1a06133e4151c617ea04e4727c278180ff77334c3',
            block_number: '16867580',
            block_timestamp: '2023-03-20T08:05:11.000Z',
            transaction_hash: '0xcfc858b220d3dd4f7d85a8914ff35d85cc2e9aecc1d5459f25a5cb6fcc00cea5',
            transaction_index: '194',
            log_index: '431',
            value: '1139661035879629629627',
          },
          {
            to_wallet: '0x21216ba7d4300dec06ca52392fe625080795d1c2',
            contract_address: '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03',
            block_hash: '0xf5d10ec3fcd45f7620cf964aefc47160fdbba840ab4c940ea878428555480cb4',
            block_number: '16867218',
            block_timestamp: '2023-03-20T06:52:11.000Z',
            transaction_hash: '0x0a444c62c0529b91d199fd077afc8472e8bd4950ee78c85f9d6c77fb4725c646',
            transaction_index: '88',
            log_index: '112',
            value: '833697013888888888887',
          },
          {
            to_wallet: '0xdcc6cd6d81cd4cb770185bfa73bb844df75353e7',
            contract_address: '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03',
            block_hash: '0xf555930823451b2f4864d5f234c443cae89a817d569418a5176870c710ad1914',
            block_number: '16867148',
            block_timestamp: '2023-03-20T06:37:47.000Z',
            transaction_hash: '0x320e23a2041327759dc93b8f50a77e80b47adebc73cfe8a95f96fbe957c35f73',
            transaction_index: '108',
            log_index: '133',
            value: '439622297453703703702',
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
