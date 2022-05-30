import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetBlocks: Record<string, string> = {
  '1000000': '0x8e38b4dbf6b11fcc3b9dee84fb7986e29ca0a02cecd8977c161ff7333329681e',
};

export const mockGetBlock = rest.get(`${EVM_API_ROOT}/block/:block_number_or_hash`, (req, res, ctx) => {
  const block_number_or_hash = req.params.block_number_or_hash as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetBlocks[block_number_or_hash];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      hash: value,
    }),
  );
});
