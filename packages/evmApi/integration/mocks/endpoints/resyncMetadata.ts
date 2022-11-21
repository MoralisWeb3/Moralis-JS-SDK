import { MockScenarios } from '@moralisweb3/test-utils';
import { createEvmApiResponse } from '../response/evmApiResponse';
import { createErrorResponse } from '../response/errorResponse';

export const mockResyncMetadata = MockScenarios.create(
  {
    method: 'get',
    name: 'mockResyncMetadata',
    url: `/nft/:address/:tokenId/metadata/resync`,
    getParams: (req) => ({
      address: req.params.address,
      tokenId: req.params.tokenId,
    }),
  },
  [
    {
      condition: {
        address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
        tokenId: '15',
      },
      response: createEvmApiResponse('VALID_RESPONSE'),
    },
    {
      condition: {
        address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88',
        tokenId: '15',
      },
      responseStatus: 400,
      response: createErrorResponse('INVALID_ADDRESS', '[C0005] Invalid address provided'),
    },
    {
      condition: {
        address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
        tokenId: '000000215',
      },
      responseStatus: 400,
      response: createErrorResponse(
        'INVALID_TOKEN_ID',
        '[C0006] Request failed, Bad Request(400): [C0005] Invalid TokenId provided',
      ),
    },
  ],
);
