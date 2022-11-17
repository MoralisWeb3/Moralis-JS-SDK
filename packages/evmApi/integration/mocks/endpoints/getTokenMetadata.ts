import { MockScenarios } from '@moralisweb3/test-utils';
import { createTokenMetadataResponse } from '../response/tokenMetadataResponse';

export const mockGetTokenMetadata = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetTokenMetadata',
    url: '/erc20/metadata',
    getParams: (req) => ({
      addresses: req.url.searchParams.get('addresses[]'),
    }),
  },
  [
    {
      condition: {
        addresses: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
      },
      response: [
        createTokenMetadataResponse(
          '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
          'SHIBA INU',
          'SHIB',
          '18',
          'https://cdn.moralis.io/eth/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.png',
          '0dba9c0d492b42b3a73c5ceee62b205568a8b5c1932cac048ccd71cbbe051690',
          'https://cdn.moralis.io/eth/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce_thumb.png',
          null,
          null,
          '2022-01-20T10:39:55.818Z',
        ),
      ],
    },
  ],
);
