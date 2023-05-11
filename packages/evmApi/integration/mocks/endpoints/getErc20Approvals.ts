import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetErc20Approvals = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetErc20Approvals',
    url: `/erc20/approvals`,
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
          '0x5e8422345238f34275888049021821e8e08caa1f',
          '0x6fadf4aea85e1cd1d2b4b57d65954b424ddaa6ae',
        ],
      },
      response: {
        cursor:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6IjE2ODY3NzQyIiwib2Zmc2V0IjozLCJpYXQiOjE2NzkzOTQ4Mjl9.CJ5i7l-auXpDp7jAqVpqL5O8MIRaXPiHMHVK5uYdtWo',
        result: [
          {
            token_name: 'Frax Ether',
            token_symbol: 'frxETH',
            token_logo: 'https://cdn.moralis/i.jpg',
            token_decimals: '18',
            from_wallet: '0xbafa44efe7901e04e39dad13167d089c559c1138',
            to_wallet: '0xac3e018457b222d93114458476f3e3416abbe38f',
            contract_address: '0x5e8422345238f34275888049021821e8e08caa1f',
            block_hash: '0x987cab4a8a33ac6d1112f44f59bdda0410059e7bb033507ed8ebcbade331459c',
            block_number: '16867742',
            block_timestamp: '2023-03-20T08:37:35.000Z',
            transaction_hash: '0x61b87b32196fda49b93998236fa0d51e0a0598ab0a052fa706053391d1950be2',
            transaction_index: '148',
            log_index: '356',
            value: '0',
            possible_spam: false,
            value_decimal: '0',
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
