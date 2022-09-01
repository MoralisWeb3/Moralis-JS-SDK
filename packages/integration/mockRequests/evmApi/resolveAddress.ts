import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockResolveAddress = rest.get(`${EVM_API_ROOT}/resolve/:address/reverse`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (address === '0x4044044044044044044044044044044044044040') {
    return res(ctx.status(404));
  }

  if (address === '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045') {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'vitalik.eth',
      }),
    );
  }

  throw new Error('Not supported scenario');
});
