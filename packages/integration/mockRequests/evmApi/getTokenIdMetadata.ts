import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTokenIdMetadatas: Record<string, string> = {
  '0x7de3085b3190b3a787822ee16f23be010f5f8686': '1',
};

export const mockGetTokenIdMetadata = rest.get(`${EVM_API_ROOT}/nft/:address/:token_id`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetTokenIdMetadatas[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      amount: value,
    }),
  );
});
