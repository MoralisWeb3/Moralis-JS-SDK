import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetStreamsOutput = 20;

export const mockGetStreams = rest.get(`${STREAM_API_ROOT}/streams`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetStreamsOutput;

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
