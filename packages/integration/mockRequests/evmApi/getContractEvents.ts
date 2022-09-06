import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetContractEvents = rest.post(`${EVM_API_ROOT}/:address/events`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (address === '0x2953399124f0cbb46d2cbacd8a89cf0599974963') {
    return res(
      ctx.status(200),
      ctx.json({
        total: 12,
        page: 0,
        page_size: 100,
        cursor: null,
        // TODO: need to add some events.
        result: [],
      }),
    );
  }

  throw new Error('getContractEvents: Not supported scenario');
});
