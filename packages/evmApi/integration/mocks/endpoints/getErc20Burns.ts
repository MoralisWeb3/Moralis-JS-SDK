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
            from_wallet: '0x337b8ce71620a679bcc767b9525c8bdc2573e17c',
            contract_address: '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03',
            block_hash: '0xf2be4cdf6def9f1c5395a041ca7678cbcb7e5228d93dd398f10e9659b42ac956',
            block_number: '16867006',
            block_timestamp: '2023-03-20T06:09:23.000Z',
            transaction_hash: '0x16d7bfcc59a1ef672cde3bd61ad9e49b53857de939b36014d23ab829e00c8557',
            transaction_index: '79',
            log_index: '182',
            value: '1800000000000000000000',
          },
          {
            from_wallet: '0x777a68e4f98490e2f1399011021f5edb798b8819',
            contract_address: '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03',
            block_hash: '0x3fa5a531f81b0e889909a74be1586ca3d060eb2adc97d5fa3830d8aea02864f4',
            block_number: '16866755',
            block_timestamp: '2023-03-20T05:18:35.000Z',
            transaction_hash: '0x5f0fe83d5386217f4af0a7d25113749058a930e125e36fe5ee6a6e4dd49820a7',
            transaction_index: '81',
            log_index: '201',
            value: '900000000000000000000',
          },
          {
            from_wallet: '0x7b23f68c6c71a4390a01d79e15d7ac9bc5001c0a',
            contract_address: '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03',
            block_hash: '0x411e0efcf59097ba24e1dd0a8e6b898e39706795bf6fa006b7bac3f213286c21',
            block_number: '16866540',
            block_timestamp: '2023-03-20T04:35:23.000Z',
            transaction_hash: '0x15dd39311a44773a31346bbb1e51ff7e3cab2d4304577b90e733a4241677838c',
            transaction_index: '27',
            log_index: '117',
            value: '900000000000000000000',
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
