import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetLogsByAddresses: Record<string, number> = {
  '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974': 856189,
};

export const mockGetLogsByAddress = rest.get(`${EVM_API_ROOT}/:address/logs`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetLogsByAddresses[address];

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
