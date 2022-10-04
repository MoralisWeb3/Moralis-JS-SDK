import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

export const mockGetTokenPrice = rest.get(`${EVM_API_ROOT}/erc20/:address/price`, (req, res, ctx) => {
  function createSuccessRes() {
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

  const address = req.params.address as string;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (address === '0x0000000000000000000000000000000000000001') {
    return createSuccessRes();
  }

  if (address === '0x0000000000000000000000000000000000000002') {
    const chain = req.url.searchParams.get('chain') as string;
    if (chain !== '0x13881') {
      throw new Error(`Expected chain=0x13881, got ${chain}`);
    }
    return createSuccessRes();
  }

  if (address === '0x0000000000000000000000000000000000000003') {
    const toBlock = req.url.searchParams.get('to_block') as string;
    if (toBlock !== '512') {
      throw new Error(`Expected to_block=512, got ${toBlock}`);
    }
    return createSuccessRes();
  }

  throw new Error('getTokenPrice: Not supported scenario');
});
