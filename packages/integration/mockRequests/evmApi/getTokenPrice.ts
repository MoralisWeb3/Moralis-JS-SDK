import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTokenPrices: Record<string, string> = {
  '0xEA47B64e1BFCCb773A0420247C0aa0a3C1D2E5C5': '162922.83762653428',
};

export const mockGetTokenPrice = rest.get(`${EVM_API_ROOT}/erc20/:address`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetTokenPrices[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      usdPrice: value,
    }),
  );
});
