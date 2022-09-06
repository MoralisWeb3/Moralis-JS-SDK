import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

const transfer = {
  transaction_hash: '0x215f6d1cfe1cb78733f8a8ddff2e7b8c375ce9ce41dd7ec2e73b2404e59dd04d',
  address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
  block_timestamp: '2022-09-01T17:18:14.000Z',
  block_number: '15454126',
  block_hash: '0x0cd840fb6f116b8dd39ba8c30e3b74d741ecb638c4a8d0704801e7d18baaef05',
  from_address: '0xd73a9eadfff6a332afda7ddbb18cff84bbf6dd0d',
  to_address: '0x72fdd62fbfa2faa9a8677c58d9992068772e0f7f',
  value: '347995260860000000000',
};

export const mockGetWalletTokenTransfers = rest.get(`${EVM_API_ROOT}/:address/erc20/transfers`, (req, res, ctx) => {
  const address = req.params.address as string;
  const limit = req.url.searchParams.get('limit');
  const cursor = req.url.searchParams.get('cursor');
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (address === '0x72fdd62fbfa2faa9a8677c58d9992068772e0f7f') {
    if (!limit) {
      return res(
        ctx.status(200),
        ctx.json({
          total: 12,
          page: 0,
          page_size: 100,
          cursor: null,
          result: Array(12).fill(transfer),
        }),
      );
    }

    if (limit === '6' && !cursor) {
      return res(
        ctx.status(200),
        ctx.json({
          total: 12,
          page: 0,
          page_size: 6,
          cursor: 'limit_6_page_0',
          result: Array(6).fill(transfer),
        }),
      );
    }
    if (limit === '6' && cursor === 'limit_6_page_0') {
      return res(
        ctx.status(200),
        ctx.json({
          total: 12,
          page: 1,
          page_size: 6,
          cursor: null,
          result: Array(6).fill(transfer),
        }),
      );
    }
  }

  throw new Error('getWalletTokenTransfers: Not supported scenario');
});
