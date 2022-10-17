import { rest } from 'msw';
import { SOL_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetSPLs: Record<string, string> = {
  '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp': 'A8rFZ2Y3Kcr2A84A23f3z3rw47BTNp5haxYCUwUE8bCU',
};

export const mockGetSPL = rest.get(`${SOL_API_ROOT}/account/:network/:address/tokens`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetSPLs[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      associatedTokenAddress: value,
    }),
  );
});
