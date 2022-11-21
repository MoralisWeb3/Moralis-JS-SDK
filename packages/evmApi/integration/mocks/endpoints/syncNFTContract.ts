import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockSyncNFTContract = MockScenarios.create(
  {
    method: 'put',
    name: 'mockSyncNFTContract',
    url: `/nft/:address/sync`,
    getParams: (req) => ({
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
      },
      responseStatus: 200,
      response: { success: true },
    },
    {
      condition: {
        address: '0x7de308',
      },
      responseStatus: 400,
      response: createErrorResponse('[C0005] Invalid address provided'),
    },
  ],
);
