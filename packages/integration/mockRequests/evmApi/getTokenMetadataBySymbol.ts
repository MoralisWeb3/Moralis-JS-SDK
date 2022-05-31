/* eslint-disable no-console */
import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTokenMetadataBySymbols: Record<string, string> = {
  LINK: '0x514910771af9ca656af840dff83e8264ecf986ca',
};

export const mockGetTokenMetadataBySymbol = rest.get(`${EVM_API_ROOT}/erc20/metadata/symbols`, (req, res, ctx) => {
  const symbols = req.url.searchParams.get('symbols') as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetTokenMetadataBySymbols[symbols];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      symbol: value,
    }),
  );
});
