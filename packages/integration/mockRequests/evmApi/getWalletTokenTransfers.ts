import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

const transfers: Record<string, number> = {
  '0x3d6c0e79a1239df0039ec16Cc80f7A343b6C530e': 44,
};

export const mockGetWalletTokenTransfers = rest.get(`${EVM_API_ROOT}/:address/erc20/transfers`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = transfers[address];

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
