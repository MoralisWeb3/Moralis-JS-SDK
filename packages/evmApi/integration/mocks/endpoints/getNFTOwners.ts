import { MockScenarios } from '@moralisweb3/test-utils';
import { createEvmApiResponse } from '../response/evmApiResponse';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetNFTOwners = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTOwners',
    url: `/nft/:address/owners`,
    getParams: (req) => ({
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      },
      response: createEvmApiResponse('VALID_RESPONSE'),
    },
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0005] Invalid address provided'),
    },
  ],
);
