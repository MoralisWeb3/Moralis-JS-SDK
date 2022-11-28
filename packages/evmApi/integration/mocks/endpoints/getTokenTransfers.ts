import { MockScenarios } from '@moralisweb3/test-utils';
import { createPaginatedResponse } from '../response/paginatedResponse';
import { createTransferResponse } from '../response/transferResponse';

export const mockGetTokenTransfers = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetTokenAddressTransfers',
    url: '/erc20/:address/transfers',
    getParams: (req) => ({
      address: req.params.address,
      limit: req.url.searchParams.get('limit'),
    }),
  },
  [
    {
      condition: {
        address: '0x72fdd62fbfa2faa9a8677c58d9992068772e0f7f',
      },
      response: createPaginatedResponse(
        Array(12).fill(
          createTransferResponse(
            '0x215f6d1cfe1cb78733f8a8ddff2e7b8c375ce9ce41dd7ec2e73b2404e59dd04d',
            '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
            '2022-09-01T17:18:14.000Z',
            '15454126',
            '0x0cd840fb6f116b8dd39ba8c30e3b74d741ecb638c4a8d0704801e7d18baaef05',
            '0xd73a9EAdFff6A332aFDa7dDBB18CFf84bBf6dd0D',
            '0x72FDD62FbFa2fAa9A8677C58d9992068772e0f7F',
            '347995260860000000000',
          ),
        ),
        12,
        0,
        100,
        null,
      ),
    },
    {
      condition: {
        address: '0x72fdd62fbfa2faa9a8677c58d9992068772e0f7f',
        limit: '6',
      },
      response: createPaginatedResponse(
        Array(6).fill(
          createTransferResponse(
            '0x215f6d1cfe1cb78733f8a8ddff2e7b8c375ce9ce41dd7ec2e73b2404e59dd04d',
            '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
            '2022-09-01T17:18:14.000Z',
            '15454126',
            '0x0cd840fb6f116b8dd39ba8c30e3b74d741ecb638c4a8d0704801e7d18baaef05',
            '0xd73a9EAdFff6A332aFDa7dDBB18CFf84bBf6dd0D',
            '0x72FDD62FbFa2fAa9A8677C58d9992068772e0f7F',
            '347995260860000000000',
          ),
        ),
        12,
        0,
        6,
        'limit_6_page_0',
      ),
    },
    {
      condition: {
        address: '0x72fdd62fbfa2faa9a8677c58d9992068772e0f7f',
        limit: '6',
      },
      response: createPaginatedResponse(
        Array(6).fill(
          createTransferResponse(
            '0x215f6d1cfe1cb78733f8a8ddff2e7b8c375ce9ce41dd7ec2e73b2404e59dd04d',
            '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
            '2022-09-01T17:18:14.000Z',
            '15454126',
            '0x0cd840fb6f116b8dd39ba8c30e3b74d741ecb638c4a8d0704801e7d18baaef05',
            '0xd73a9EAdFff6A332aFDa7dDBB18CFf84bBf6dd0D',
            '0x72FDD62FbFa2fAa9A8677C58d9992068772e0f7F',
            '347995260860000000000',
          ),
        ),
        12,
        1,
        6,
        null,
      ),
    },
  ],
);
