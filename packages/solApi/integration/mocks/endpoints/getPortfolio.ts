import { rest } from 'msw';
import { SOL_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetPortfolios: Record<string, string> = {
  '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp': '16136665083',
};

export const mockGetPortfolio = rest.get(`${SOL_API_ROOT}/account/:network/:address/portfolio`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetPortfolios[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      nativeBalance: value,
    }),
  );
});
