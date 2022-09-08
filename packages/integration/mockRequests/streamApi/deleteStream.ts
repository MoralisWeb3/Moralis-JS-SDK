import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockDeleteStreamOutput: Record<string, string> = {
  '3fa85f64-5717-4562-b3fc-2c963f66afa6': '0x3',
};

export const mockDeleteStream = rest.delete(`${STREAM_API_ROOT}/streams/:id`, (req, res, ctx) => {
  const id = req.params.id as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockDeleteStreamOutput[id];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      chainId: value,
    }),
  );
});
