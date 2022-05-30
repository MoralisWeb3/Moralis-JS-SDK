import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockSearchNFTss: Record<string, number> = {
  Pancake: 5671,
};

export const mockSearchNFTs = rest.get(`${EVM_API_ROOT}/nft/search`, (req, res, ctx) => {
  const q = req.url.searchParams.get('q') as string;

  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockSearchNFTss[q];

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
