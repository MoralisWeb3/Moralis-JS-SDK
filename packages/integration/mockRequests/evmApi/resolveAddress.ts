import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockResolveAddresses: Record<string, string> = {
  '0xd8da6bf26964af9d7eed9e03e53415d37aa96045': 'vitalik.eth',
};

export const mockResolveAddress = rest.get(`${EVM_API_ROOT}/resolve/:address`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockResolveAddresses[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      name: value,
    }),
  );
});
