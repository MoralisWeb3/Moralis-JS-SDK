import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTransactions: Record<string, string> = {
  '0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5': '247689',
};

export const mockGetTransaction = rest.get(`${EVM_API_ROOT}/transaction/:transaction_hash`, (req, res, ctx) => {
  const transaction_hash = req.params.transaction_hash as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetTransactions[transaction_hash];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      gas: value,
    }),
  );
});
