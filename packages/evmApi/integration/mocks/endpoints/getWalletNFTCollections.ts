import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetWalletNFTCollections = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetWalletNFTCollections',
    url: `/:address/nft/collections`,
    getParams: (req) => ({
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      },
      response: {
        status: 'SYNCING',
        total: 2000,
        page: 2,
        page_size: 100,
        cursor: 'string',
        result: [
          {
            token_address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
            contract_type: 'ERC721',
            name: 'CryptoKitties',
            symbol: 'RARI',
          },
        ],
      },
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
