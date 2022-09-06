import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockResolveDomain = rest.get(`${EVM_API_ROOT}/resolve/:domain`, (req, res, ctx) => {
  const domain = req.params.domain as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (domain === 'brad.crypto') {
    return res(
      ctx.status(200),
      ctx.json({
        address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
      }),
    );
  }

  if (domain === 'notfound.crypto') {
    return res(ctx.status(404));
  }

  throw new Error('resolveDomain: Not supported scenario');
});
