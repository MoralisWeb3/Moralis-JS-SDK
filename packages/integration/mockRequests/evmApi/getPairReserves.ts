import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetPairReservess: Record<string, string> = {
  '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974': '232416936901978959300412',
};

export const mockGetPairReserves = rest.get(`${EVM_API_ROOT}/:pair_address/reserves`, (req, res, ctx) => {
  const pair_address = req.params.pair_address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetPairReservess[pair_address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      reserve0: value,
    }),
  );
});
