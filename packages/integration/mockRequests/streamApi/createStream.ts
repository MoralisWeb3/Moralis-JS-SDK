import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockCreateStreamOutput: Record<string, string> = {
  address: '0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7',
  chainId: '0x3',
};

export const mockCreateStream = rest.put(`${STREAM_API_ROOT}/streams`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockCreateStreamOutput;

  if (!value) {
    return res(ctx.status(404));
  }

  return res(ctx.status(200), ctx.json(value));
});
