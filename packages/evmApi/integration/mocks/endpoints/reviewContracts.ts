import { MockScenarios } from '@moralisweb3/test-utils';

export const mockReviewContracts = MockScenarios.create(
  {
    method: 'post',
    name: 'mockReviewContracts',
    url: `/contracts-review`,
    getParams: ({ req, reqBody }) => ({
      chain: req.url.searchParams.get('chain'),
      body: reqBody,
    }),
  },
  [
    {
      condition: {
        chain: '0x1',
        body: {
          contracts: [
            {
              contract_address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
              reason: 'My reason',
              report_type: 'spam',
              contract_type: 'ERC20',
            },
          ],
        },
      },
      response: {
        message: 'Submission successful',
      },
    },
  ],
);
