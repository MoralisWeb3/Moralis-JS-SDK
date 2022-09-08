import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockSetSettingsOutput: Record<string, string> = {};

export const mockSetSettings = rest.post(`${STREAM_API_ROOT}/settings`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  return res(ctx.status(200), ctx.json(mockSetSettingsOutput));
});
