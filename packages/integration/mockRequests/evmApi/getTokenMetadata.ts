import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTokenMetadatas: Record<string, string> = {
  '0xdac17f958d2ee523a2206206994597c13d831ec7': 'Tether USD',
};

export const mockGetTokenMetadata = rest.get(`${EVM_API_ROOT}/erc20/metadata`, (req, res, ctx) => {
  const addresses = req.url.searchParams.get('addresses[]') as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetTokenMetadatas[addresses];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      name: value,
    }),
  );
});
