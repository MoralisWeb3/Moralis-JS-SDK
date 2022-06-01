/* eslint-disable no-console */
import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTokenAllowances: Record<string, string> = {
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': '10',
};

export const mockGetTokenAllowance = rest.get(`${EVM_API_ROOT}/erc20/:address/allowance`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetTokenAllowances[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      allowance: value,
    }),
  );
});
