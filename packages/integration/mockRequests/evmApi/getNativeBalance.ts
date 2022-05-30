import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetNativeBalances: Record<string, string> = {
  '0x7dE3085b3190B3a787822Ee16F23be010f5F8686': '39600000000000000',
};

export const mockGetNativeBalance = rest.get(`${EVM_API_ROOT}/:address/balance`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetNativeBalances[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      balance: value,
    }),
  );
});
