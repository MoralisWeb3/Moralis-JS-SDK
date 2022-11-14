import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

const transfers: Record<string, number> = {
  '1': 118072744,
};

export const mockGetNFTTransfersFromToBlock = rest.get(`${EVM_API_ROOT}/nft/transfers`, (req, res, ctx) => {
  const fromBlock = req.url.searchParams.get('from_block') as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = transfers[fromBlock];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      total: value,
    }),
  );
});
