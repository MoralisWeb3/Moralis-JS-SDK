/* eslint-disable no-console */
import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetPairAddresss: Record<string, string> = {
  '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c': '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
};

export const mockGetPairAddress = rest.get(
  `${EVM_API_ROOT}/:token0_address/:token1_address/pairAddress`,
  (req, res, ctx) => {
    const token0_address = req.params.token0_address as string;
    const apiKey = req.headers.get('x-api-key');

    if (apiKey !== MOCK_API_KEY) {
      return res(ctx.status(401));
    }

    const value = mockGetPairAddresss[token0_address];

    if (!value) {
      return res(ctx.status(404));
    }

    return res(
      ctx.status(200),
      ctx.json({
        token0: value,
      }),
    );
  },
);
