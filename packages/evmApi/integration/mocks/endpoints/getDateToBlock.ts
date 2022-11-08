/* eslint-disable no-console */
import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetDateToBlocks: Record<string, number> = {
  '2021-09-29T13:09:15+00:00': 13320838,
};

export const mockGetDateToBlock = rest.get(`${EVM_API_ROOT}/dateToBlock`, (req, res, ctx) => {
  const date = req.url.searchParams.get('date') as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetDateToBlocks[date];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      block: value,
    }),
  );
});
