import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetNFTsForContracts: Record<string, string> = {
  address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
  format: 'decimal',
  chain: 'polygon',
  tokenAddress: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
};

export const mockGetNFTsForContract = rest.get(`${EVM_API_ROOT}/account/:address`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const value = mockGetNFTsForContracts[address];

  if (!value) {
    return res(ctx.status(404));
  }

  return res(
    ctx.status(200),
    ctx.json({
      address: value,
    }),
  );
});
