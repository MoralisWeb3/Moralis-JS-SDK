/* eslint-disable no-console */
import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetNFTTransfersFromToBlocks: Record<string, number> = {
  '0x7de3085b3190b3a787822ee16f23be010f5f8686': 118072744,
};

export const mockGetNFTTransfersFromToBlock = rest.get(`${EVM_API_ROOT}/nft/transfers`, (req, res, ctx) => {
  const address = req.url.searchParams.get('address') as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetNFTTransfersFromToBlocks[address];

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
