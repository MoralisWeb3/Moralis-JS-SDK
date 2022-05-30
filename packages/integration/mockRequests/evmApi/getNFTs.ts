import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetNFTss: Record<string, number> = {
  '0x75e3e9c92162e62000425c98769965a76c2e387a': 112,
};

export const mockGetNFTs = rest.get(`${EVM_API_ROOT}/:address/nft`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetNFTss[address];

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
