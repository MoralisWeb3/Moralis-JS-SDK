import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetNFTsForContracts: Record<string, number> = {
  '0x75e3e9c92162e62000425c98769965a76c2e387a': 900,
};

export const mockGetNFTsForContract = rest.get(`${EVM_API_ROOT}/:address/nft/:token_address`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetNFTsForContracts[address];

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
