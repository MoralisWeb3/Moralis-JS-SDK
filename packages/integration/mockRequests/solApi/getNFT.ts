import { rest } from 'msw';
import { SOL_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetNFTs: Record<string, string> = {
  '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp': '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp',
};

export const mockGetNFT = rest.get(`${SOL_API_ROOT}/account/:network/:address/nft`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetNFTs[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      associatedTokenAddress: value,
    }),
  );
});
