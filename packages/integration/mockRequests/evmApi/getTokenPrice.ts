import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTokenPrice = rest.get(`${EVM_API_ROOT}/erc20/:address/price`, (req, res, ctx) => {
  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (address === '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce') {
    return res(
      ctx.status(200),
      ctx.json({
        nativePrice: { value: '8244913831', decimals: 18, name: 'Ether', symbol: 'ETH' },
        usdPrice: 0.000011961341215674,
        exchangeAddress: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        exchangeName: 'Uniswap v3',
      }),
    );
  }

  throw new Error('getTokenPrice: Not supported scenario');
});
