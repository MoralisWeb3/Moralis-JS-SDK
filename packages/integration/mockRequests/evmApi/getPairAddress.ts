import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetPairAddresses: Record<string, string> = {
  '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974': '233668669478185909225031',
};

export const mockGetPairAddress = rest.get(`${EVM_API_ROOT}/:pair_address`, (req, res, ctx) => {
  const pair_address = req.params.pair_address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value1 = mockGetPairAddresses[pair_address];

  //console.log('reserves ==>', value1);

  if (!value1) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      reserve0: value1,
      reserve1: value1,
    }),
  );
});
